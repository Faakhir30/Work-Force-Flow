import express from "express";
import { isDev, protect } from "../middleware/authMiddleware.js";
import {
  createTicket,
  deleteTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticketController.js";
const router = express.Router();

router.post("/", isDev, createTicket);

router.route("/:id").put(protect, updateTicket).delete(isDev, deleteTicket);
router.get("/all", getTickets);

export default router;
