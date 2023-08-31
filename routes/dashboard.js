// Import modules
import express from "express";
const router = express.Router();

import { renderDashboard } from "../controllers/dashboard.js";
import { isLoggedIn } from "../utils/middleware.js"

// Routing
router.get('/', isLoggedIn, renderDashboard);

export { router as routerDashboard }