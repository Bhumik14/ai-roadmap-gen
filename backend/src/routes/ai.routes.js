import { Router } from "express";
import { roadmapCreationController, quizCreationController, roadmapCreationResumeController } from "../controllers/ai.controller.js";
import { upload } from "../middleware/upload.middleware.js";
const router = Router();

router.post('/create-roadmap', roadmapCreationController);
router.post('/create-roadmap-resume',upload.single("resume"), roadmapCreationResumeController)
router.post('/create-quiz', quizCreationController);

export default router;