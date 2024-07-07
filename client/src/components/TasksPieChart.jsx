import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import { getColorByStatus, getHoverColorByStatus } from '../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const TasksPieChart = ({tasks}) => {
  const todoCount = tasks.filter(task => task.status==='to-do').length;
  const ongoingCount = tasks.filter(task => task.status==='ongoing').length;
  const completedCount = tasks.filter(task => task.status==='completed').length;
  const taskTypes = [
    {
      label: 'To-Do',
      count: todoCount
    },
    {
      label: 'Ongoing',
      count: ongoingCount
    },
    {
      label: 'Completed',
      count: completedCount
    }
  ]
  const data = {
    labels: taskTypes.map(type => type.label),
    datasets: [
      {
        data: taskTypes.map(type => type.count),
        backgroundColor: taskTypes.map(type => getColorByStatus(type.label)),
        hoverBackgroundColor: taskTypes.map(type => getHoverColorByStatus(type.label)),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <Box sx={{ 
      width: 500, 
      height: 400, 
      p: 2,
    }}>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default TasksPieChart;