import TasksOverview from "../components/TasksOverview";
import TasksPieChart from "../components/TasksPieChart";
import RecentTasksTable from "../components/RecentTasksTable";

const Dashboard = () => {
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


export default Dashboard