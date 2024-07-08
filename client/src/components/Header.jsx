import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import { UserButton } from "@clerk/clerk-react"
import AlgoliaSearch from './AlgoliaSearch';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: (theme) => theme.shadows[4] }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="div" sx={{ flexShrink: 0 }}>
          Task Manager
        </Typography>
        <Box sx={{display:'flex', justifyContent:'space-between', width:'max-width'}}>
          <Box sx={{ flexGrow: 1, mx: 2, maxWidth: '600px' }}>
            <AlgoliaSearch />
          </Box>
          <UserButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;