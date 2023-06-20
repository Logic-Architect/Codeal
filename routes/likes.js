const express = require('express');
const router = express.Router();
const passport = require('passport');
const likeController = require('../controllers/likes_controller');

router.post('/toggleLike',passport.checkAuthentication,likeController.toggleLike);

module.exports = router;