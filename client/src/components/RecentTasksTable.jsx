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
  Tooltip
} from '@mui/material';
import { getColorByStatus, getPriorityIcon } from '../constants';

const RecentTasksTable = ({ tasks }) => {
  const [filters, setFilters] = useState(['added']);

  const toggleFilter = (filter) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (filters.includes('added')) {
      filteredTasks = filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (filters.includes('updated')) {
      filteredTasks = filteredTasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    if (filters.includes('overdue')) {
      filteredTasks = filteredTasks.filter((task) => new Date(task.deadline) < new Date());
    }

    return filteredTasks.slice(0, 5);
  };

  const recentTasks = getFilteredTasks();

  return (
    <TableContainer component={Paper} style={{ marginLeft: '20px', padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="div">
          Recent Tasks
        </Typography>
        <ButtonGroup aria-label="custom primary button group">
          <Button
            onClick={() => toggleFilter('added')}
            variant={filters.includes('added') ? 'contained' : 'outlined'}
            sx={{ backgroundColor: filters.includes('added') ? '#3f51b5' : 'transparent', color: filters.includes('added') ? '#fff' : '#3f51b5' }}
          >
            Added
          </Button>
          <Button
            onClick={() => toggleFilter('updated')}
            variant={filters.includes('updated') ? 'contained' : 'outlined'}
            sx={{ backgroundColor: filters.includes('updated') ? '#3f51b5' : 'transparent', color: filters.includes('updated') ? '#fff' : '#3f51b5' }}
          >
            Updated
          </Button>
          <Button
            onClick={() => toggleFilter('overdue')}
            variant={filters.includes('overdue') ? 'contained' : 'outlined'}
            sx={{ backgroundColor: filters.includes('overdue') ? '#3f51b5' : 'transparent', color: filters.includes('overdue') ? '#fff' : '#3f51b5' }}
          >
            Overdue
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
