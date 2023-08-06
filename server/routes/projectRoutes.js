import express from "express";
import { isAdmin, isAdminOrDev, isDev } from "../middleware/authMiddleware.js";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", isAdmin, createProject);

router
  .route("/:id")
  .put(isAdminOrDev, updateProject)
  .delete(isAdminOrDev, deleteProject);
router.get("/all", getProjects);
export default router;