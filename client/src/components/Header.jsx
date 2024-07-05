import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { UserButton } from "@clerk/clerk-react"

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: (theme) => theme.shadows[4] }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <UserButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;