import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const TasksPieChart = ({ tasks }) => {
  const data = {
    labels: ['To-Do', 'Ongoing', 'Completed'],
    datasets: [
      {
        data: [tasks.todo, tasks.ongoing, tasks.completed],
        backgroundColor: ['#2196F3', '#FFC107', '#4CAF50'],
        hoverBackgroundColor: ['#1976D2', '#FFA000', '#388E3C'],
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
      width: 300, 
      height: 300, 
      p: 2,
    }}>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default TasksPieChart;