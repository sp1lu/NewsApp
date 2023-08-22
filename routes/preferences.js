// Import modules
import express from 'express';
const router = express.Router();
import { renderPreferences, savePreferences } from '../controllers/preferences.js';

// Routing
router.route('/')
    .get(renderPreferences)
    .post(savePreferences)

export { router as routerPreferences }