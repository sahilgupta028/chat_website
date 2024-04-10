const Chat = require('../models/Chat');

exports.sendMessage = async(req, res) => {
    const { sender, reciever, message, showHeart, pin } = req.body;
    const timestamp = new Date();

    try{
        const chat = new Chat({
            sender,
            reciever,
            message,
            timestamp,
            showHeart,
            pin
          });

          await chat.save();
  
          res.status(201).json({ message: 'Chat sent successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
      }
}

exports.allChat = async(req, res) => {
    try {
        const chat = await Chat.find();
        res.json(chat);
      } catch (error) {
        console.error('Error fetching chat:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

exports.deleteChat = async (req, res) => {
    const { id } = req.body;
    try {
      await Chat.findByIdAndDelete(id);
      res.status(200).json({ message: 'Messages deleted successfully' });
    } catch (error) {
      console.error('Error deleting messages:', error);
      res.status(500).json({ message: 'Failed to delete messages' });
    }
}

exports.editChat = async (req, res) => {
  const { id, message } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(id, { message }, { new: true });
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat message not found' });
    }
    res.status(200).json({ message: 'Message updated successfully' });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Failed to update the chat Message' });
  }
}

exports.editLikes = async (req, res) => {
  const { id, showHeart } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(id, { showHeart }, { new: true });
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat message not found' });
    }
    res.status(200).json({ message: 'Message updated successfully' });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Failed to update the chat Message' });
  }
}

exports.pin = async (req, res) => {
  const { id, pin } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(id, { pin }, { new: true });
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat message not found' });
    }
    res.status(200).json({ message: 'Message updated successfully' });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Failed to update the chat Message' });
  }
}