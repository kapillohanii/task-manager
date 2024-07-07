import React, { useState, useRef, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Navigation from './components/Navigation'; 
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import LoadingBar from 'react-top-loading-bar';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
  },
});

const App = () => {
  useEffect(() => {
    socket.on('taskCreated', (newTask) => {
      console.log("XXXXXXXX", newTask)
    });
  
  
    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Tasks', icon: <AssignmentIcon /> },
    { text: 'Teams', icon: <PeopleIcon /> },
  ];
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const [loading, setLoading] = useState(false);
  const loadingBarRef = useRef(null);

  const handleNavigation = (item) => {
    setActiveItem(item);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current.complete();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Navigation menuItems={menuItems} activeItem={activeItem} handleNavigation={handleNavigation}/>
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8, backgroundColor: 'white' }}>
          <LoadingBar color="#f11946" ref={loadingBarRef} />
          {activeItem?.text === 'Dashboard' && <Dashboard handleLoading={handleLoading} />}
          {activeItem?.text === 'Tasks' && <Tasks handleLoading={handleLoading} />}
          {activeItem?.text === 'Teams' && <></>}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
