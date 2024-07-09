import TasksOverview from "../components/TasksOverview";
import TasksPieChart from "../components/TasksPieChart";
import RecentTasksTable from "../components/RecentTasksTable";
import {useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { serverEndpoint } from '../constants';

const Overview = ({tasks, handleLoading}) => {
    const { user } = useUser();
    useEffect(() => {
        const checkUser = async () => {
            handleLoading(true)
            if (user) {
                try {
                    const response = await fetch(`${serverEndpoint}/user/profile/${user.id}`);
                    if (response.ok) {
                    } else if (response.status === 404) {
                        const createResponse = await fetch(`${serverEndpoint}/user/create`, {
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
            handleLoading(false);
        };

        checkUser();
    }, [user]);



    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TasksOverview tasks={tasks} />
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                <TasksPieChart tasks={tasks} />
                <RecentTasksTable tasks={tasks} />
            </div>
        </div>
        
    );
}

export default Overview;