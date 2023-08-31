// Import modules
import express from 'express';
const router = express.Router();
import { renderPreferences, savePreferences, renderAddFeed, saveCustomFeed } from '../controllers/preferences.js';
import { isLoggedIn } from "../utils/middleware.js"

// Routing
router.route('/')
    .get(isLoggedIn, renderPreferences)
    .post(isLoggedIn, savePreferences)

router.route('/add')
    .get(isLoggedIn, renderAddFeed)
    .post(isLoggedIn, saveCustomFeed)

export { router as routerPreferences }