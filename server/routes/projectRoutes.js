import express from "express";
import { isAdmin, isAdminOrDev, isDev } from "../middleware/authMiddleware";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectController";

const router = express.Router();

router.post("/", isAdmin, createProject);

router
  .route("/:id")
  .put(isDev, updateProject)
  .delete(isAdminOrDev, deleteProject);
router.get("/all", getProjects);
export default router;