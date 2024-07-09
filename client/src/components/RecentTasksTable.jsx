import React, { useState } from 'react';
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
  Typography,
  Button,
  ButtonGroup,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { getColorByStatus, getPriorityIcon } from '../constants';

const RecentTasksTable = ({ tasks }) => {
  const [sortBy, setSortBy] = useState('added');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSort = (option) => {
    setSortBy(option);
  };

  const getSortedTasks = () => {
    let sortedTasks = [...tasks];

    if (sortBy === 'added') {
      sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'updated') {
      sortedTasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return sortedTasks.slice(0, 5);
  };

  const recentTasks = getSortedTasks();

  return (
    <TableContainer component={Paper} sx={{ marginLeft: isSmallScreen ? '0' : '20px', padding: '20px' }}>
      <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="div">
          Recent Tasks
        </Typography>
        <ButtonGroup aria-label="sort by button group" sx={{ marginTop: isSmallScreen ? 2 : 0 }}>
          <Button
            onClick={() => handleSort('added')}
            variant={sortBy === 'added' ? 'contained' : 'outlined'}
            sx={{ backgroundColor: sortBy === 'added' ? '#3f51b5' : 'transparent', color: sortBy === 'added' ? '#fff' : '#3f51b5' }}
          >
            Added
          </Button>
          <Button
            onClick={() => handleSort('updated')}
            variant={sortBy === 'updated' ? 'contained' : 'outlined'}
            sx={{ backgroundColor: sortBy === 'updated' ? '#3f51b5' : 'transparent', color: sortBy === 'updated' ? '#fff' : '#3f51b5' }}
          >
            Updated
          </Button>
        </ButtonGroup>
      </Box>
      <Table sx={{ minWidth: 500, marginTop: 2 }} aria-label="recent tasks table">
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
          {recentTasks.map((row, index) => (
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
                <Tooltip title={`Priority: ${row.priority}`} arrow>
                  <Box>{getPriorityIcon(row.priority)}</Box>
                </Tooltip>
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
                  style={{ backgroundColor: getColorByStatus(row.status) }}
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