import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {getColorByStatus} from '../constants'

const TasksCountCard = ({ status, count }) => {

  const color = getColorByStatus(status);

  return (
    <Card sx={{ minWidth: 250, m: 2 }}>
      <CardContent>
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {count}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 15,  
              height: 15,
              borderRadius: '50%',
              backgroundColor: color,
              mr: 1,
            }}
          />
          <Typography variant="body1" color="text.secondary">
            {status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TasksCountCard;