import { Router } from "express";
import { roadmapCreationController, quizCreationController } from "../controllers/ai.controller.js";

const router = Router();

router.post('/create-roadmap', roadmapCreationController);
router.post('/create-quiz', quizCreationController);

export default router;