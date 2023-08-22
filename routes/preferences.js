// Import modules
import express from 'express';
const router = express.Router();
import { renderPreferences } from '../controllers/preferences.js';

// Routing
router.get('/preferences', renderPreferences);

export { router as routerPreferences }