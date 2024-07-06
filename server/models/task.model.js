const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  status: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  priority: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true
  },
  Assignee: {
    type: String,
    required: true
  },
  AssignedTo: {
    type: String,
    required: true
  },
  AssigneeId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  AssignedToId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  },
  createdById: {
    type: Schema.Types.ObjectId,
    required: true
  },
  updatedById: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;