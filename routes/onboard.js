// Import modules
import express from 'express';
const router = express.Router();
import { renderOnBoard, saveInitialFeed } from '../controllers/onboard.js';

// Routing
router.route('/')
    .get(renderOnBoard)
    .post(saveInitialFeed)

export { router as routerOnBoard }