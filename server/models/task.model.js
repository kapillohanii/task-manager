const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  assignee: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  },
  assigneeId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  assignedToId: {
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
  },
  deadline: {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;