import express from "express";
import { isDev, protect } from "../middleware/authMiddleware.js";
import {
  createTicket,
  deleteTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticketController.js";
const router = express.Router();

router.post("/", protect, createTicket);

router.route("/:id").put(protect, updateTicket).delete(protect, deleteTicket);
router.get("/all", getTickets);

export default router;
