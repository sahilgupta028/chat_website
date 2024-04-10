const express = require('express');
const router = express.Router();

const authUser = require('../controller/authUser');
const chatUser = require('../controller/chatUser');
const help = require('../controller/help')
const profileView = require('../controller/profileView');
const upload = require('../controller/upload');

router.post('/register', upload.single('image'), authUser.registerUser);
router.post('/login', authUser.loginUser);
router.post('/verify', authUser.verifyUser);
router.get('/profile/:username',  authUser.profileUser);
router.get('/profile', authUser.allUser);
router.post('/sendMessage', chatUser.sendMessage);
router.get('/allChat', chatUser.allChat);
router.delete('/deleteMessages', chatUser.deleteChat);
router.delete('/deleteProfile', authUser.deleteUser);
router.post('/profile/:username', upload.single('image'), authUser.editUser);
router.put('/allChat', chatUser.editChat);
router.post('/help', help.registerQuestion);
router.put('/profile/change', authUser.changePass);
router.put('/forgetPass', authUser.forgetPass);
router.post('/profileViewer/:username', profileView.profileViewer);
router.get('/profileViewer/:username', profileView.allProfile);
router.post('/likes', chatUser.editLikes);
router.post('/pin', chatUser.pin);

module.exports = router;