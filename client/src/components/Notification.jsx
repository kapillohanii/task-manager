import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

const Notification = ({ message, onClose, id }) => {

  return (
    <Box
      sx={{
        minWidth: 300,
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
        marginBottom: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, borderRadius: '10%'}}>
        <NotificationsIcon sx={{ mr: 1 }} />
        <Typography variant="body1" sx={{ flex: 1 }}>{message}</Typography>
        <IconButton size="small" onClick={() => onClose(id)}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Notification;