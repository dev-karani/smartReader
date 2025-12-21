// src/routes/health.routes.js
import { Router } from "express";
const router = Router();
router.get("/", (req, res) => res.send('<h1>scrimba</h1>'))

export default router;


