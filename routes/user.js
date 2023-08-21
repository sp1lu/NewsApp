// Import modules
import express from 'express';
const router = express.Router();

import passport from 'passport';

import { renderLogin } from '../controllers/user.js';
import { loginUser } from '../controllers/user.js';
import { renderRegister } from '../controllers/user.js';
import { registerUser } from '../controllers/user.js';

// Routing
router.route('/register')
    .get(renderRegister)
    .post(registerUser)

router.route('/login')
    .get(renderLogin)
    .post(
        passport.authenticate('local', { /* failureFlash: 'Username or password are incorrect', */ failureRedirect: '/login' }),
        loginUser)

export { router as routerUser }