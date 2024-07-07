import React from 'react';
import { Box } from '@mui/material';
import TasksCountCard from './TasksCountCard';

const TasksOverview = ({tasks}) => {
  const totalCount = tasks.length;
  const todoCount = tasks.filter(task => task.status==='to-do').length;
  const ongoingCount = tasks.filter(task => task.status==='ongoing').length;
  const completedCount = tasks.filter(task => task.status==='completed').length;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <TasksCountCard status="Total" count={totalCount} />    
      <TasksCountCard status="To-Do" count={todoCount} />
      <TasksCountCard status="Ongoing" count={ongoingCount} />
      <TasksCountCard status="Completed" count={completedCount} />
    </Box>
  );
};

export default TasksOverview;