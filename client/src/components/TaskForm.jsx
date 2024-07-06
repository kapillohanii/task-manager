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
  Typography 
} from '@mui/material';
import { getUserDetails } from '../constants';  

const TaskForm = ({ task, onSubmit }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    status: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const currentUser = await getUserDetails(user.id)
    const taskData = {
      ...formData,
      assignee: currentUser.fullName,
      assignedTo: currentUser.fullName,
      createdBy: currentUser.fullName,
      createdById: currentUser._id,
      updatedBy: currentUser.fullName,  
      updatedById: currentUser._id,
      assigneeId: currentUser._id,
      assignedToId: currentUser._id, 
    };

    try {
      const response = await fetch('http://localhost:5000/task/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const result = await response.json();
      console.log('Task created:', result);
          
      // onSubmit(result);

      setFormData({
        title: '',
        description: '',
        deadline: '',
        priority: '',
        status: '',
        assignedTo: '',
        assignee: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {task ? 'Edit Task' : 'Create New Task'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Task Title"
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
          <MenuItem value="not started">TO-DO</MenuItem>
          <MenuItem value="in progress">On Going</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {task ? 'Update Task' : 'Create Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;