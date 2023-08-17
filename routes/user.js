// Import modules
import express from 'express';
const router = express.Router();

import { renderLogin } from '../controllers/user.js';

// Routing
router.route('/login')
    .get(renderLogin)

export {router as routerUser }