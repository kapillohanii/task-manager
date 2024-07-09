import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { getColorByStatus, getUserDetails } from '../constants';
import { useDrop } from 'react-dnd';
import DraggableTaskCard from './DraggableTaskCard';
import axios from 'axios';
import { serverEndpoint } from '../constants';
import { useUser } from '@clerk/clerk-react';

const TaskGrid = ({ tasks, users }) => {
  const {user} = useUser()
  const statuses = ['to-do', 'ongoing', 'completed'];

  const updateTaskStatus = async (id, status) => {
    try {
      const currentUser = await getUserDetails(user.id)
      await axios.put(`${serverEndpoint}/task/update/${id}`, { status, updatedBy: currentUser.fullName, updatedById: currentUser._id });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const DropZone = ({ status, children }) => {
    const [, dropRef] = useDrop({
      accept: 'TASK',
      drop: (item) => {
        if (item.status !== status) {
          updateTaskStatus(item.id, status);
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
    </Grid>
  );
};

export default TaskGrid;
