const User = require('../models/User');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');

exports.registerUser = async (req, res) => {
  const { username, name, contact, password } = req.body;
  let profilePictureUrl;

  console.log(req.body);

  console.log(req.file);

  try {
      const imagePath = await cloudinary.uploader.upload(req.file.path);
      profilePictureUrl = imagePath.secure_url; 
      

      console.log(profilePictureUrl);

      let user = await User.findOne({ username });
      if (user) {
          return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      // Create a new user instance
      user = new User({
          username,
          name,
          contact,
          verificationCode,
          profilePicture: profilePictureUrl,
          password: hashedPassword
      });

      // Save the user to the database
      await user.save();

      // Send success response
      res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
  }
};


  exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      res.status(200).json({ message : "login Done" });
      console.log("login done");
  
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.verifyUser = async (req, res) => {
    const { verificationCode } = req.body;
  
    try {
      const user = await User.findOne({ verificationCode });
  
      if (!user) {
        return res.status(404).json({ error: 'Verification failed' });
      }

      res.status(200).json({ message: 'Verification successful' });
    } catch (error) {
      console.error('Error verifying code:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.profileUser = async (req, res) => {
    try {
      const profile = await User.findOne({ username: req.params.username });
      console.log(profile);
      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.allUser = async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  exports.deleteUser = async (req, res) => {
    const { username , password } = req.body;
    try {
      const user = await User.findOne({username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      await User.findOneAndDelete({ username });

      res.status(200).json({ message : "Account Deleted" });

    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }

  exports.editUser = async (req, res) => {
    const { name, contact, bio} = req.body;
    let profilePicture;

    try {

        const updatedProfile = await User.findOneAndUpdate(
            { username: req.params.username }, 
            { name, contact, bio, profilePicture }, 
            { new: true } 
        );
    
        if (!updatedProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(updatedProfile);
    
        res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
    
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


  exports.changePass = async (req, res) => {
    const { username, password, newPassword } = req.body;
    console.log(username);
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await User.findOneAndUpdate(
        { username },
        { password: hashedPassword },
        { new: true }
      );
  
      if (updatedUser) {
        await updatedUser.save();
        console.log("Password Changed");
        return res.status(200).json({ message: "Password Changed" });
      } else {
        return res.status(500).json({ error: 'Server error' });
      }
    } catch (error) {
      console.error('Error during password change:', error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  exports.forgetPass = async(req, res) => {
    const { username, verificationCode, newPassword } = req.body;

    try {
      const user = await User.findOne({ username , verificationCode });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await User.findOneAndUpdate(
        { username },
        { password: hashedPassword },
        { new: true }
      );
  
      if (updatedUser) {
        await updatedUser.save();
        console.log("Password Changed");
        return res.status(200).json({ message: "Password Changed" });
      } else {
        return res.status(500).json({ error: 'Server error' });
      }
    } catch (error) {
      console.error('Error during password change:', error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }