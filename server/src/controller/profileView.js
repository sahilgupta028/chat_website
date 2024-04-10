const Profile = require('../models/ProfileViewer');

exports.profileViewer = async(req, res) => {
    const { username, e } = req.body;
    const timestamp = new Date();

    try{
        const profile = new Profile({
            username : e,
            e : username,
            timestamp
          });

          await profile.save();
  
          res.status(201).json({ message: 'Profile sent successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
      }
}

exports.allProfile = async(req, res) => {
    const { username } = req.params;
    try {
        const profile = await Profile.find({ username });
        res.json(profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
