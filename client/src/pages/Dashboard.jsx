import TasksOverview from "../components/TasksOverview";
import TasksPieChart from "../components/TasksPieChart";
import RecentTasksTable from "../components/RecentTasksTable";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
    const { user } = useUser();

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TasksOverview />
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                <TasksPieChart tasks={{ todo: 5, ongoing: 3, completed: 10 }} />
                <RecentTasksTable />
            </div>
        </div>
    );
}

export default Dashboard;