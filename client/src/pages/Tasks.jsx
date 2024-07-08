import React from 'react';
import { Container, Box, Alert } from '@mui/material';
import AddNewTask from '../components/AddNewTask';
import TaskGrid from '../components/TaskGrid';

const Tasks = ({ tasks, users }) => {

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <AddNewTask users={users} />
      </Box>
      <TaskGrid tasks={tasks} users={users}/>
    </Container>
  );
};

export default Tasks;
