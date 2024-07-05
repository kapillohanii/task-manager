import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TasksOverview from './components/TasksOverview';
import TasksPieChart from './components/TasksPieChart';
import RecentTasksTable from './components/RecentTasksTable';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

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
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8 }}>
          <TasksOverview />
          <TasksPieChart tasks={{todo:5,ongoing:3,completed:10}} />
          <RecentTasksTable />
          <TaskForm />
          <TaskList />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;