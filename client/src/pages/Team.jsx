import React from 'react';
import { Grid, Typography, Box} from '@mui/material';
import UserCard from '../components/UserCard';

const Team = ({ users }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography variant="h4" gutterBottom >
                    My Team
                </Typography>

            </Box>

            <Grid container spacing={3}>
                {users.map((user) => (
                    <Grid item xs={12} sm={4} key={user.id}>
                        <UserCard user={user} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Team;
