import React, { useState, useRef, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, GlobalStyles } from '@mui/material';
import Header from './components/Header';
import Navigation from './components/Navigation'; 
import Overview from './pages/Overview';
import Tasks from './pages/Tasks';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import LoadingBar from 'react-top-loading-bar';
import io from 'socket.io-client';
import { fetchTasks, fetchUsers, getUserDetails, serverEndpoint } from './constants';
import NotificationStack from './components/NotificationStack';
import Team from './pages/Team';
import { useUser } from '@clerk/clerk-react';


const socket = io(`${serverEndpoint}`);

const scrollbarStyles = {
  '*::-webkit-scrollbar': {
    width: '8px',
  },
  '*::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: '#a0a0a0',
    borderRadius: '3px',
  },
  '*::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
  },
});

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const {user} = useUser();
  let currentUser;

  const addNotification = (message) => {
    setMessages(prev => [...prev, message]);
  };
  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon /> },
    { text: 'Tasks', icon: <AssignmentIcon /> },
    { text: 'Team', icon: <PeopleIcon /> },
  ];
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const loadingBarRef = useRef(null);

  const handleNavigation = (item) => {
    setActiveItem(item);
  };

  const handleLoading = (isLoading) => {
    if (isLoading) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current.complete();
    }
  };

  async function refreshTasks() {
    try {
      const fetchedTasks = await fetchTasks(handleLoading);
      setTasks(fetchedTasks);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async function refreshUsers() {
    try {
      currentUser = await getUserDetails(user.id);
      const fetchedUsers = await fetchUsers(handleLoading);
      setUsers(fetchedUsers);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    refreshTasks();
    refreshUsers();
  }, []);

  useEffect(() => {
    socket.on('taskCreated', (task) => {
      const truncatedTitle = task.title.length > 10 
      ? task.title.substr(0, 10) + '...' 
      : task.title;

      const who = task.createdById === currentUser._id ? 'You' : task.createdBy;
      addNotification(`${who} created task [${truncatedTitle}]`);
      refreshTasks();
    });
    socket.on('taskUpdated', (task) => {
      const truncatedTitle = task.title.length > 10 
      ? task.title.substr(0, 10) + '...' 
      : task.title;
      const who = task.updatedById === currentUser._id ? 'You' : task.updatedBy;
      addNotification(`${who} updated task [${truncatedTitle}]`);
      refreshTasks();
    });
    socket.on('taskDeleted', (task) => {
      const truncatedTitle = task.title.length > 10 
      ? task.title.substr(0, 10) + '...' 
      : task.title;
      const who = task.createdById === currentUser._id ? 'You' : task.createdBy;
      addNotification(`${task.updatedBy} deleted task [${truncatedTitle}]`);
      refreshTasks();
    });
    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={scrollbarStyles} />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header users={users} />
        <Navigation menuItems={menuItems} activeItem={activeItem} handleNavigation={handleNavigation} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8, backgroundColor: 'white' }}>
          <LoadingBar color="#f11946" ref={loadingBarRef} />
          {activeItem?.text === 'Overview' && <Overview tasks={tasks} handleLoading={handleLoading} />}
          {activeItem?.text === 'Tasks' && <Tasks tasks={tasks} users={users} />}
          {activeItem?.text === 'Team' && <Team users={users}/>}
        </Box>
        <NotificationStack messages={messages} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
