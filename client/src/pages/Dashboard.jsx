import TasksOverview from "../components/TasksOverview";
import TasksPieChart from "../components/TasksPieChart";
import RecentTasksTable from "../components/RecentTasksTable";
import { Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
    const { user } = useUser();
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const checkUser = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://localhost:5000/user/profile/${user.id}`);
                    if (response.ok) {
                    } else if (response.status === 404) {
                        const createResponse = await fetch('http://localhost:5000/user/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                clerkId: user.id,
                                email: user.primaryEmailAddress.emailAddress,
                                fullName: `${user.firstName} ${user.lastName}`
                            }),
                        });

                        if (createResponse.ok) {
                            console.log('User created')
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
        };

        checkUser();
    }, [user]);


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
      }, []);

    return (
        isLoading 
        ? 
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress sx={{color:'#cfcfcf'}}/>
            </Box>
        :
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TasksOverview tasks={tasks} />
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                <TasksPieChart tasks={tasks} />
                <RecentTasksTable tasks={tasks} />
            </div>
        </div>
        
    );
}

export default Dashboard;