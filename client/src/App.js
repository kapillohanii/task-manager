import React, {useState} from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Navigation from './components/Navigation'; 
import Dashboard from './pages/Dashboard';
import TaskForm from './components/TaskForm';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import TaskList from './components/TaskList';
import TaskGrid from './components/TaskGrid';
import AddNewTask from './components/AddNewTask';
import Tasks from './pages/Tasks';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
  },
});

const App = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Tasks', icon: <AssignmentIcon /> },
    { text: 'Teams', icon: <PeopleIcon /> },
  ];
  const [activeItem, setActiveItem] = useState(menuItems[0])

  const handleNavigation = (item) => {
    setActiveItem(item);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Navigation menuItems={menuItems} activeItem={activeItem} handleNavigation={handleNavigation}/>
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8, backgroundColor:'white'}}>
          <br />
          {activeItem?.text==='Dashboard' && <Dashboard />}
          {activeItem?.text==='Tasks' && <Tasks />}
          {activeItem?.text==='Teams' && <></>}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;