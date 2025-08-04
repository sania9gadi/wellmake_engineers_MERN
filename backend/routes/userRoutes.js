const express = require('express');
const router = express.Router();

const { signupUser, loginUserHandler, getAllUsers, getProfile ,updateProfile } = require('../services/userServices');


const { validateSignup, validateLogin } = require('../middleware/userValidation');
const { protectRoute } = require('../middleware/AuthMiddleware');
const { checkAdmin } = require('../middleware/checkRole');


router.post('/signup', validateSignup, signupUser);
router.post('/login', validateLogin, loginUserHandler);

router.get('/signup', (req, res) => res.send('Signup route working!'));
router.get('/login', (req, res) => res.send('Login route working!'));


router.get('/all-users', protectRoute, checkAdmin, getAllUsers);

router.get('/profile', protectRoute, getProfile);
router.put('/update-profile', protectRoute, updateProfile);


module.exports = router;



