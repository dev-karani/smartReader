import { Router } from "express";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";

const router = Router();

router.post("/", uploadMiddleware, uploadFile);

router.post("/test-multer", uploadMiddleware, (req, res) => {
  if (!req.file) return res.status(400).json({ ok:false, msg:"no file" });
  res.json({ ok:true, path: req.file.path, original: req.file.originalname });
});

export default router;
