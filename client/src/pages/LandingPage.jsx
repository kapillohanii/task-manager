import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';

const LandingPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ mb: 4, fontSize: '6rem' }}>
          Task Manager
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: 'rgba(0, 0, 0, 0.6)' }}>
            Take control of your day with our task manager.
        </Typography>
        <Box>
          <Link href="/sign-in" underline="none">
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'black',
                color: 'white',
                fontSize: '1.25rem',
                px: 4,
                py: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
              size="large"
            >
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
