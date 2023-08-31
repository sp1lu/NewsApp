// Import modules
import express from 'express';
const router = express.Router();
import { renderOnBoard, saveInitialFeed } from '../controllers/onboard.js';
import { isLoggedIn } from "../utils/middleware.js"

// Routing
router.route('/')
    .get(isLoggedIn, renderOnBoard)
    .post(isLoggedIn, saveInitialFeed)

export { router as routerOnBoard }