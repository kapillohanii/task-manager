import React from 'react';
import { Grid, Box, Typography, Card, CardContent, Chip, Avatar, Divider } from '@mui/material';
import { getColorByStatus } from '../constants';
import TaskCard from './TaskCard';



const TaskGrid = ({ tasks, onDelete, onSubmit }) => {
  const statuses = ['to-do', 'ongoing','completed'];

  return (
    <Grid container spacing={2}>
      {statuses.map((status) => (
        <Grid item xs={12} md={4} key={status}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                backgroundColor: getColorByStatus(status),
                mr: 1,
              }}
            />
            <Typography variant="body1" color="text.secondary">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Typography>
          </Box>
          {tasks
            .filter((task) => task.status.toLowerCase() === status)
            .map((task) => (
              <TaskCard key={task.id} task={task} onDelete={onDelete} onSubmit={onSubmit} />
            ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskGrid;
