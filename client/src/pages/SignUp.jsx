import React from 'react';
import { SignUp } from "@clerk/clerk-react";
import { Box } from '@mui/material';

const TaskManagerSignUp = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <SignUp redirectUrl={'/dashboard'} routing="path" path="/sign-up" />
  </Box>
);

export default TaskManagerSignUp;