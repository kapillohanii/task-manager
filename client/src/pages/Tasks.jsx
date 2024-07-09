import React from 'react';
import { Container, Box, Alert } from '@mui/material';
import AddNewTask from '../components/AddNewTask';
import TaskGrid from '../components/TaskGrid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Tasks = ({ tasks, users }) => {

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <AddNewTask users={users} />
      </Box>
      <DndProvider backend={HTML5Backend}>
        <TaskGrid tasks={tasks} users={users}/>
      </DndProvider>
      
    </Container>
  );
};

export default Tasks;
