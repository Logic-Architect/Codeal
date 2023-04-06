const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);
// router.get('/post', userController.post)
router.get('/sign-up',userController.sigup);
router.get('/sign-in',userController.sigin);

router.post('/create',userController.create);
router.post('/create-session',userController.createSession);

module.exports = router;