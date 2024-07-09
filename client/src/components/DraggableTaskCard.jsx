import React from 'react';
import { useDrag } from 'react-dnd';
import TaskCard from './TaskCard';

const DraggableTaskCard = ({ task, users }) => {
  const [, dragRef] = useDrag({
    type: 'TASK',
    item: task,
  });

  return (
    <div ref={dragRef}>
      <TaskCard task={task} users={users} />
    </div>
  );
};

export default DraggableTaskCard;
