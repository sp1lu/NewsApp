// Import modules
import express from 'express';
const router = express.Router();

import { renderLogin } from '../controllers/user.js';
import { renderRegister } from '../controllers/user.js';

// Routing
router.route('/login')
    .get(renderLogin)

router.route('/register')
    .get(renderRegister)

export { router as routerUser }