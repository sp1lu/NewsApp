// Import modules
import express from 'express';
const router = express.Router();
import { renderPreferences, savePreferences, renderAddFeed, saveCustomFeed } from '../controllers/preferences.js';

// Routing
router.route('/')
    .get(renderPreferences)
    .post(savePreferences)

router.route('/add')
    .get(renderAddFeed)
    .post(saveCustomFeed)

export { router as routerPreferences }