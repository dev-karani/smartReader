import { Router } from "express";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";

const router = Router();

router.post("/", uploadMiddleware, uploadFile);

export default router;
