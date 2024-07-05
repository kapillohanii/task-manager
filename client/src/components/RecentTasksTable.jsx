import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  Avatar
} from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const getPriorityIcon = (priority) => {
  switch(priority.toLowerCase()) {
    case 'high':
      return <PriorityHighIcon color="error" />;
    case 'medium':
      return <ArrowUpwardIcon color="warning" />;
    case 'low':
      return <ArrowDownwardIcon color="success" />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch(status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'in progress':
      return 'warning';
    case 'not started':
      return 'error';
    default:
      return 'default';
  }
};

const mockData = [
  { id: 1, title: 'Implement login functionality', createdBy: 'John Doe', priority: 'High', assignedTo: 'Alice Smith', status: 'In Progress' },
  { id: 2, title: 'Design new landing page', createdBy: 'Jane Smith', priority: 'Medium', assignedTo: 'Bob Johnson', status: 'Not Started' },
  { id: 3, title: 'Fix navigation bug', createdBy: 'Alice Smith', priority: 'Low', assignedTo: 'Charlie Brown', status: 'Completed' },
  { id: 4, title: 'Update user documentation', createdBy: 'Bob Johnson', priority: 'Medium', assignedTo: 'David Wilson', status: 'In Progress' },
  { id: 5, title: 'Optimize database queries', createdBy: 'Charlie Brown', priority: 'High', assignedTo: 'Eve Taylor', status: 'Not Started' },
];

const RecentTasksTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="recent tasks table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map((row, index) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>
                {getPriorityIcon(row.priority)} {row.priority}
              </TableCell>
              <TableCell>
                <Chip
                  avatar={<Avatar>{row.assignedTo.charAt(0)}</Avatar>}
                  label={row.assignedTo}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={row.status} 
                  color={getStatusColor(row.status)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentTasksTable;