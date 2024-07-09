import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { getColorByStatus, getUserDetails } from '../constants';
import { useDrop } from 'react-dnd';
import DraggableTaskCard from './DraggableTaskCard';
import axios from 'axios';
import { serverEndpoint } from '../constants';
import { useUser } from '@clerk/clerk-react';
import {
  Snackbar,
  IconButton,
  LinearProgress
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const TaskGrid = ({ tasks, users }) => {
  const { user } = useUser()
  const statuses = ['to-do', 'ongoing', 'completed'];
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [progress, setProgress] = useState(100);
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
    setProgress(100);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          clearInterval(timer);
          return 0;
        }
        const diff = oldProgress - 5;
        return Math.max(diff, 0);
      });
    }, 100);

    setTimeout(() => {
      setSnackbar(prev => ({ ...prev, open: false }));
      setProgress(100);
    }, 2000);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
    setProgress(100);
  };

  const updateTaskStatus = async (task, status) => {
    try {
      const currentUser = await getUserDetails(user.id)
      if (task && (currentUser._id !== task.createdById && currentUser._id !== task.assignedToId)) {
        showSnackbar('Action not permitted!', 'error')
        return
      }
      await axios.put(`${serverEndpoint}/task/update/${task._id}`, { status, updatedBy: currentUser.fullName, updatedById: currentUser._id });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const DropZone = ({ status, children }) => {
    const [, dropRef] = useDrop({
      accept: 'TASK',
      drop: (item) => {
        if (item.status !== status) {
          updateTaskStatus(item, status);
        }
      },
    });

    return (
      <div ref={dropRef} style={{ minHeight: '80vh', padding: '16px', border: '1px dashed #ccc' }}>
        {children}
      </div>
    );
  };

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
          <DropZone status={status}>
            {tasks
              .filter((task) => task.status.toLowerCase() === status)
              .map((task) => (
                <DraggableTaskCard key={task._id} task={task} users={users} />
              ))}
          </DropZone>
        </Grid>
      ))}
      {createPortal(
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {snackbar.message}
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                marginTop: 1,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'rgba(255,255,255,0.7)'
                }
              }}
            />
          </Alert>
        </Snackbar>,
        document.body
      )}
    </Grid>
  );
};

export default TaskGrid;
