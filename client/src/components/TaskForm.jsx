import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Box, 
  Typography,
  Snackbar,
  IconButton,
  LinearProgress,
  Avatar,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { getUserDetails } from '../constants';
import { createPortal } from 'react-dom';
import { serverEndpoint } from '../constants';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TaskForm = ({ task, users }) => {
  const { user } = useUser();
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    status: '',
    assignedTo: '',
    assignedToId: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '',
        assignedTo: task.assignedTo || '',
        assignedToId: task.assignedToId || '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsChanged(true);
    if (name === 'assignedTo') {
      setFormData(prevData => ({
        ...prevData,
        assignedTo: value.name,
        assignedToId: value.id,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const currentUser = await getUserDetails(user.id);
      const assignedUser = await getUserDetails(formData.assignedToId);

      if (task && (currentUser._id !== task.createdById && currentUser._id !== task.assignedToId)){
        showSnackbar('Action not permitted!', 'error')
        return
      }

      const taskData = {
        ...formData,
        assignedToId: assignedUser._id,
        assignedTo: assignedUser.fullName,
        assignee: currentUser.fullName,
        createdBy: currentUser.fullName,
        createdById: currentUser._id,
        updatedBy: currentUser.fullName,  
        updatedById: currentUser._id,
        assigneeId: currentUser._id,
      };

      const url = task 
        ? `${serverEndpoint}/task/update/${task._id}` 
        : `${serverEndpoint}/task/create`;
      const method = task ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(task ? 'Failed to update task' : 'Failed to create task');
      }

      const result = await response.json();
      console.log(task ? 'Task updated:' : 'Task created:', result);
      
      showSnackbar(task ? 'Task updated successfully' : 'Task created successfully', 'success');

      if (!task) {
        setFormData({
          title: '',
          description: '',
          deadline: '',
          priority: '',
          status: '',
          assignedTo: '',
          assignedToId: '', 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar(error.message, 'error');
    }
  };

  const handleDelete = async () => {
    if (!task || !task._id) return;

    try {
      const currentUser = await getUserDetails(user.id);
      if (currentUser._id !== task.createdById){
        showSnackbar('Action not permitted!', 'error')
        return
      }
      const taskData = {
        ...task,
        updatedBy: currentUser.fullName,
        updatedById: currentUser._id
      };
      const response = await fetch(`${serverEndpoint}/task/delete/${task._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      console.log('Task deleted:', task._id);
      showSnackbar('Task deleted successfully', 'success');

    } catch (error) {
      console.error('Error deleting task:', error);
      showSnackbar('Error deleting task', 'error');
    }
  };

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

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        maxHeight: '70vh', 
        overflowY: 'auto', 
        p: 2,
        borderRadius: 1,
        bgcolor: 'background.paper',
        border: 'none'
      }}
    >
      <Typography variant="h6" gutterBottom>
        {task ? 'Edit Task' : 'Create New Task'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Deadline"
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          label="Priority"
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="to-do">To-Do</MenuItem>
          <MenuItem value="ongoing">Ongoing</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Assigned To</InputLabel>
        <Select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          label="Assigned To"
          renderValue={(selected) => selected}
        >
          <MenuItem value="">
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={{name: `${user.firstName} ${user.lastName}`, id: user.id}}>
              <ListItemAvatar>
                <Avatar src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
              </ListItemAvatar>
              <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        {task && (
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Task
        </Button>
        )}
        <Button type="submit" variant="contained" color="primary" disabled={!isChanged}>
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </Box>

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
    </Box>
  );
};

export default TaskForm;