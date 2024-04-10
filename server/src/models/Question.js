const mongoose = require('mongoose');

const quesSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('Question', quesSchema);

module.exports = Question;