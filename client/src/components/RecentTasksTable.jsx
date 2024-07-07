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


const RecentTasksTable = ({tasks}) => {
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
          {tasks.map((row, index) => (
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