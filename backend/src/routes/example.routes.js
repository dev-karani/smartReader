import {Router } from "express"
import {getMessage} from "../controllers/example.controller.js"

const router = Router();

router.get("/", getMessage);

export default router;