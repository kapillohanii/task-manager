import TasksOverview from "../components/TasksOverview";
import TasksPieChart from "../components/TasksPieChart";
import RecentTasksTable from "../components/RecentTasksTable";
import { Grid } from '@mui/material';

const Overview = ({ tasks }) => {

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
