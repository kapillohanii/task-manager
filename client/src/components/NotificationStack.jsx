import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import Notification from './Notification';

const NotificationStack = ({ messages }) => {
  const [notifications, setNotifications] = useState([]);

  const handleClose = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const newNotification = {
        id: Date.now(),
        message: messages[messages.length - 1]
      };
      setNotifications(prev => [newNotification, ...prev]);

      // Set a timeout to automatically close the notification after 6 seconds
      const timeoutId = setTimeout(() => {
        handleClose(newNotification.id);
      }, 6000);

      // Clean up the timeout if the component unmounts or the notification is closed manually
      return () => clearTimeout(timeoutId);
    }
  }, [messages, handleClose]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          onClose={handleClose}
        />
      ))}
    </Box>
  );
};

export default NotificationStack;