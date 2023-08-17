// Import modules
import express from 'express';
const router = express.Router();

import { renderHome } from '../controllers/home.js';

// Routing
router.get('/', renderHome);

export { router as routerHome };