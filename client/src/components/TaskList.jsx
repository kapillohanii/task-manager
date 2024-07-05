import React from 'react';
import TaskCard from './TaskCard';

const TaskList = () => {
  const task = {
    title: "Implement user authentication",
    createdBy: "John Doe",
    assignedTo: "Alice Smith",
    dueDate: "2023-07-15",
    priority: "high",
    status: "in progress"
  };

  return (
    <div>
      <TaskCard task={task} />
    </div>
  );
};

export default TaskList;