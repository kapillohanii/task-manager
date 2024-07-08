import React from 'react';
import { SignIn } from "@clerk/clerk-react";
import { Box } from '@mui/material';

const TaskManagerSignIn = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <SignIn redirectUrl={'/dashboard'} routing="path" path="/sign-in" />
  </Box>
);


export default TaskManagerSignIn;