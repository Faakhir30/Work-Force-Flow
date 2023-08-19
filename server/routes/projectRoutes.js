import express from "express";
import { isAdmin, isAdminOrDev, isDev, protect } from "../middleware/authMiddleware.js";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);

router
  .route("/:id")
  .put(isAdminOrDev, updateProject)
  .delete(isAdminOrDev, deleteProject);
router.get("/all",protect,  getProjects);
export default router;