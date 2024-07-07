import React from 'react';
import { Container, Box, Alert } from '@mui/material';
import AddNewTask from '../components/AddNewTask';
import TaskGrid from '../components/TaskGrid';

const Tasks = ({ tasks }) => {

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <AddNewTask />
      </Box>
      <TaskGrid tasks={tasks} />
    </Container>
  );
};

export default Tasks;
