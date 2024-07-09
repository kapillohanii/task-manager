import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { serverEndpoint } from '../constants';
import TasksOverview from "../components/TasksOverview";
import TasksPieChart from "../components/TasksPieChart";
import RecentTasksTable from "../components/RecentTasksTable";
import { Grid } from '@mui/material';

const Overview = ({ tasks, handleLoading }) => {
  const { user } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      handleLoading(true);
      if (user) {
        try {
          const response = await fetch(`${serverEndpoint}/user/profile/${user.id}`);
          if (response.ok) {
            // User exists, do nothing
          } else if (response.status === 404) {
            const createResponse = await fetch(`${serverEndpoint}/user/create`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                clerkId: user.id,
                email: user.primaryEmailAddress.emailAddress,
                fullName: `${user.firstName} ${user.lastName}`,
              }),
            });

            if (createResponse.ok) {
              console.log('User created');
            } else {
              console.error('Failed to create user');
            }
          } else {
            console.error('Error checking user');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
      handleLoading(false);
    };

    checkUser();
  }, [user]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TasksOverview tasks={tasks} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TasksPieChart tasks={tasks} />
      </Grid>
      <Grid item xs={12} md={8}>
        <RecentTasksTable tasks={tasks} />
      </Grid>
    </Grid>
  );
};

export default Overview;
