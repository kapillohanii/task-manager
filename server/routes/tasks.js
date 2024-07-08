const router = require('express').Router();
let Task = require('../models/task.model');
const mongoose = require('mongoose');
const socket = require('../socket');
const indexDataToAlgolia = require('../algolia');


router.route('/all').get(async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/detail/:id').get((req, res) => {
  const id = req.params.id;
  Task.findOne({ _id: id })
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({error: 'Task not found'});
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/create').post(async (req, res) => {
  const { 
    title, status, priority, description, assignee, assignedTo, 
    assigneeId, assignedToId, createdBy, updatedBy, createdById, updatedById, deadline
  } = req.body;

  try {
    const newTask = new Task({
      title,
      status,
      priority,
      description,
      assignee,
      assignedTo,
      assigneeId,
      assignedToId,
      createdBy,
      updatedBy,
      createdById,  
      updatedById,
      deadline,
    });

    socket.getIO().emit('taskCreated', newTask);
    const savedTask = await newTask.save();
    await indexDataToAlgolia(); // Index after creating a task
    res.json(`Task with id: ${savedTask._id} added`);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json('Validation Error: ' + err.message);
    } else if (err instanceof mongoose.Error.CastError) {
      res.status(400).json('Invalid ID format: ' + err.message);
    } else {
      res.status(500).json('Error: ' + err.message);
    }
  }
});

router.route('/update/:id').put(async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(404).json('Task not found');
    }

    Object.keys(req.body).forEach(key => {
      if (key in task) {
        task[key] = req.body[key];
      }
    });

    task.updatedAt = new Date();

    const updatedTask = await task.save();
    socket.getIO().emit('taskUpdated', updatedTask);
    await indexDataToAlgolia(); // Index after updating a task
    res.json(`Task with id: ${updatedTask._id} updated`);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/delete/:id').delete(async (req, res) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id });
    const taskData = req.body
    if (result.deletedCount === 0) {
      return res.status(404).json('Task not found');
    }
    socket.getIO().emit('taskDeleted', taskData);
    await indexDataToAlgolia(); // Index after deleting a task
    res.json(`Task with id: ${req.params.id} deleted`);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;