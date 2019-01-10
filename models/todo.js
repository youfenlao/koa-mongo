const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  txt: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('todo', todoSchema)
