const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  reciever: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  showHeart: {
    type: Boolean,
    required: true,
  },
  pin : {
    type: Boolean,
    required: true, 
  }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;