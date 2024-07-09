import React from 'react';
import { Grid } from '@mui/material';
import TasksCountCard from './TasksCountCard';

const TasksOverview = ({ tasks }) => {
  const totalCount = tasks.length;
  const todoCount = tasks.filter(task => task.status === 'to-do').length;
  const ongoingCount = tasks.filter(task => task.status === 'ongoing').length;
  const completedCount = tasks.filter(task => task.status === 'completed').length;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <TasksCountCard status="Total" count={totalCount} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TasksCountCard status="To-Do" count={todoCount} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TasksCountCard status="Ongoing" count={ongoingCount} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TasksCountCard status="Completed" count={completedCount} />
      </Grid>
    </Grid>
  );
};

export default TasksOverview;
