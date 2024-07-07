import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Alert } from '@mui/material';
import AddNewTask from '../components/AddNewTask';
import TaskGrid from '../components/TaskGrid';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [deleted, setDeleted] = useState(null);
  const [submited, setSubmited] = useState(null);


  const handleDeleted = (taskId) => {
    setTimeout(() => {
      setDeleted(taskId)
    }, 2000);
  };


  const handleSubmited = (task) => {
    setTimeout(() => {
      setSubmited(task)
    }, 2000);
  };


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/task/all');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [deleted, submited]);



  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <AddNewTask onSubmit={handleSubmited} onDelete={handleDeleted} />
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TaskGrid 
          tasks={tasks} 
          onDelete={handleDeleted}
          onSubmit={handleSubmited}
        />
      )}
    </Container>
  );
};

export default Tasks;