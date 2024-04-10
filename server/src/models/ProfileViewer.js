const mongoose = require('mongoose');

const profileViewerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  e: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const ProfileViewer = mongoose.model('profileViewer', profileViewerSchema);

module.exports = ProfileViewer;