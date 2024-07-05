import React from 'react';
import { Box } from '@mui/material';
import TasksCountCard from './TasksCountCard';

const TasksOverview = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left' }}>
      <TasksCountCard type="Total" count={18} />    
      <TasksCountCard type="To-Do" count={5} />
      <TasksCountCard type="Ongoing" count={3} />
      <TasksCountCard type="Completed" count={10} />
    </Box>
  );
};

export default TasksOverview;