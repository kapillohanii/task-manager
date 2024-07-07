import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Avatar,
  Divider,
  Modal,
  IconButton 
} from '@mui/material';
import { getColorByStatus, getPriorityIcon } from '../constants';
import { Close as CloseIcon } from '@mui/icons-material';
import TaskForm from './TaskForm';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '80vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TaskCard = ({ task, onDelete, onSubmit }) => {
  const { title, createdBy, assignedTo, deadline, status, priority } = task;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card 
        onClick={handleOpen}
        sx={{
          marginBottom: 2,
          borderRadius: 2,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            boxShadow: 6,
            transform: 'scale(1.02)',
            cursor: 'pointer',
          }
        }}
      >
        <CardContent>
          <div style={{display:'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {getPriorityIcon(priority)}
          </Typography>
          </div>

          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Created by:
              </Typography>
              <Chip
                avatar={<Avatar>{createdBy.charAt(0)}</Avatar>}
                label={`${createdBy}`}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Assigned to:
              </Typography>
              <Chip
                avatar={<Avatar>{assignedTo.charAt(0)}</Avatar>}
                label={`${assignedTo}`}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Deadline: {new Date(deadline).toLocaleDateString()}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              sx={{
                display: 'inline-block',
                width: 15,
                height: 15,
                borderRadius: '50%',
                backgroundColor: getColorByStatus(status),
                marginRight: 1,
              }}
            />
            <Typography variant="body2">
              Status: {status}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="task-form-modal"
        aria-describedby="task-form-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TaskForm task={task} onSubmit={onSubmit} onDelete={onDelete}/>
        </Box>
      </Modal>
    </>
  );
};

export default TaskCard;