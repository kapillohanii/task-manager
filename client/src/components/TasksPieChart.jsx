import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import { getColorByStatus, getHoverColorByStatus } from '../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const TasksPieChart = () => {
  const tasks = [
    {
      label: 'To-Do',
      count: 5
    },
    {
      label: 'Ongoing',
      count: 3
    },
    {
      label: 'Completed',
      count: 10
    }
  ]
  const data = {
    labels: tasks.map(task => task.label),
    datasets: [
      {
        data: tasks.map(task => task.count),
        backgroundColor: tasks.map(task => getColorByStatus(task.label)),
        hoverBackgroundColor: tasks.map(task => getHoverColorByStatus(task.label)),
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