import { Router } from "express";
import uploadMiddleware from "../middleware/uploadMiddleware"
import uploadController from "../controllers/uploadController"

const router = Router();

//Post /api/upload
router.post(
    "upload",
    uploadMiddleware.single("file"),  //handlesfile before controller
    uploadController.handleUpload
);

export default router;