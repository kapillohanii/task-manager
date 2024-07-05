import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const ColorDot = styled('span')(({ color }) => ({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: 8,
}));

const getPriorityColor = (priority) => {
  switch(priority.toLowerCase()) {
    case 'high':
      return '#f44336';
    case 'medium':
      return '#ffa726';
    case 'low':
      return '#4caf50';
    default:
      return '#757575'; 
  }
};

const getStatusColor = (status) => {
  switch(status.toLowerCase()) {
    case 'completed':
      return '#4caf50';
    case 'in progress':
      return '#2196f3';
    case 'not started':
      return '#f44336'; 
    default:
      return '#757575';
  }
};

const TaskCard = ({ task }) => {
  const { title, createdBy, assignedTo, dueDate, priority, status } = task;

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Created by: {createdBy}
          </Typography>
          <Chip
            avatar={<Avatar>{assignedTo.charAt(0)}</Avatar>}
            label={`Assigned to: ${assignedTo}`}
            variant="outlined"
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Due Date: {new Date(dueDate).toLocaleDateString()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <ColorDot color={getPriorityColor(priority)} />
          <Typography variant="body2">
            Priority: {priority}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ColorDot color={getStatusColor(status)} />
          <Typography variant="body2">
            Status: {status}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TaskCard;