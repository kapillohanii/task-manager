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
  Avatar,
  Typography
} from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import KeyboardDoubleArrowUpSharpIcon from '@mui/icons-material/KeyboardDoubleArrowUpSharp';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import { getColorByStatus } from '../constants';

const getPriorityIcon = (priority) => {
  switch(priority.toLowerCase()) {
    case 'high':
      return <PriorityHighIcon color="error" />;
    case 'medium':
      return <KeyboardDoubleArrowUpSharpIcon color="warning" />;
    case 'low':
      return <KeyboardArrowUpSharpIcon color="warning" />;
    default:
      return null;
  }
};


const mockData = [
  { id: 1, title: 'Implement login functionality', createdBy: 'John Doe', priority: 'High', assignedTo: 'Alice Smith', status: 'Ongoing' },
  { id: 2, title: 'Design new landing page', createdBy: 'Jane Smith', priority: 'Medium', assignedTo: 'Bob Johnson', status: 'To-Do' },
  { id: 3, title: 'Fix navigation bug', createdBy: 'Alice Smith', priority: 'Low', assignedTo: 'Charlie Brown', status: 'Completed' },
  { id: 4, title: 'Update user documentation', createdBy: 'Bob Johnson', priority: 'Medium', assignedTo: 'David Wilson', status: 'Ongoing' },
  { id: 5, title: 'Optimize database queries', createdBy: 'Charlie Brown', priority: 'High', assignedTo: 'Eve Taylor', status: 'To-Do' },
];

const RecentTasksTable = () => {
  return (
    <TableContainer component={Paper} style={{marginLeft: '20px'}}>
        <Typography variant="h6" component="div" margin={1}>
          Recent Tasks
        </Typography>
      <Table sx={{ minWidth: 500  }} aria-label="recent tasks table">
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
              <TableCell>
                <Chip
                  avatar={<Avatar>{row.createdBy.charAt(0)}</Avatar>}
                  label={row.createdBy}
                  variant="outlined"
                />
              </TableCell>
              <TableCell> 
                {getPriorityIcon(row.priority)}
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
                  style={{backgroundColor: getColorByStatus(row.status)}}
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