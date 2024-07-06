const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  clerkId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  lastSignInAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;