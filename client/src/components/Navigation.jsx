import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DrawerIcon from '@mui/icons-material/Menu';

const Navigation = ({ menuItems, activeItem, handleNavigation }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            sx={{
              backgroundColor: activeItem?.text === item?.text ? '#cfcfcf' : 'none',
              color: theme.palette.primary.contrastText,
            }} 
            onClick={() => {
              handleNavigation(item);
              if (isMobile) setIsOpen(false);
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <Fab
          color="primary"
          aria-label="toggle drawer"
          onClick={toggleDrawer}
          sx={{ 
            position: 'fixed',
            left: 20,
            bottom: 20,
            zIndex: theme.zIndex.drawer + 2,
          }}
        >
          {isOpen ? <ChevronLeftIcon /> : <DrawerIcon />}
        </Fab>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: 240, 
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: theme.shadows[4]
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navigation;
