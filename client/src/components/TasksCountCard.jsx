import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const TasksCountCard = ({ type, count }) => {
  const getColorByType = () => {
    switch (type.toLowerCase()) {
      case 'to-do':
        return '#2196F3'; // Blue
      case 'ongoing':
        return '#FFC107'; // Yellow
      case 'completed':
        return '#4CAF50'; // Green
      default:
        return '#757575'; // Grey as fallback
    }
  };

  const color = getColorByType();

  return (
    <Card sx={{ minWidth: 200, m: 2 }}>
      <CardContent>
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {count}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: color,
              mr: 1,
            }}
          />
          <Typography variant="body1" color="text.secondary">
            {type}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TasksCountCard;