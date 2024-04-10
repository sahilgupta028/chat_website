const Question = require('../models/Question')

exports.registerQuestion = async (req, res) => {
    const { username, question } = req.body;
  
    console.log(username);
  
    try {

      const ques = new Question({
        username,
        question
      });
  
      await ques.save();
  
      res.status(201).json({ message: 'Question registered successfully' });
  
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };