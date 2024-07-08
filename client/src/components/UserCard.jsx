import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

const UserCard = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.imageUrl} />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.emailAddresses[0].emailAddress}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
