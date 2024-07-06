import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Navigation from './components/Navigation'; 
import Dashboard from './pages/Dashboard';
import TaskForm from './components/TaskForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8, backgroundColor:'white'}}>
          <Dashboard />
          <TaskForm /> 
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;