const express = require('express');
const router = express.Router();
const passport = require('passport')

const userController = require('../controllers/users_controller');


router.get('/profile/:id',passport.checkAuthentication, userController.profile);


router.post('/update/:id',passport.checkAuthentication, userController.update);



// router.get('/post', userController.post)
router.get('/sign-up',userController.sigup);
router.get('/sign-in',userController.sigin);
router.get('/sign-out',userController.signout)

router.post('/create',userController.create);



// use passport as a middlewRE TO AUTHENTICATE THE USER 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
),userController.createSession);



module.exports = router;