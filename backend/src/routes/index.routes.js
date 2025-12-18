import {Router} from "express";
import authRoutes from "./auth.routes.js";
import aiRoutes from "./ai.routes.js";

const router = Router();

router.use('/auth', authRoutes);
router.use('/ai-services', aiRoutes);

export default router;