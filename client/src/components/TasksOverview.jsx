import React from 'react';
import { Box } from '@mui/material';
import TasksCountCard from './TasksCountCard';

const TasksOverview = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <TasksCountCard status="Total" count={18} />    
      <TasksCountCard status="To-Do" count={5} />
      <TasksCountCard status="Ongoing" count={3} />
      <TasksCountCard status="Completed" count={10} />
    </Box>
  );
};

export default TasksOverview;