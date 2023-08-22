// Import modules
import express from "express";
const router = express.Router();

import { renderDashboard } from "../controllers/dashboard.js";

// Routing
router.get('/', renderDashboard);

export { router as routerDashboard }