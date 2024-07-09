import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

const Notification = ({ message, onClose, id }) => {
  return (
    <Box
      sx={{
        minWidth: 300,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <NotificationsIcon sx={{ mr: 2, color: 'gray' }} />
      <Typography variant="body2" sx={{ flex: 1 }}>
        {message}
      </Typography>
      <IconButton size="small" onClick={() => onClose(id)} sx={{ color: 'grey.600' }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Notification;
