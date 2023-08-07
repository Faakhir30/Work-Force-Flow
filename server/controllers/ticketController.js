import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
// @desc    Create ticket
// @route   POST /api/tickets/
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { project, title, provider, holder, status } = req.body;
  if (await Ticket.findOne({ project, title, provider, holder }))
    return res.status(400).json({ message: "Similar ticket already exists" });
  const ticket = await Ticket.create({
    project,
    title,
    provider,
    holder,
    status,
  });
  if (ticket) {
    const dev = await User.findById(provider);
    if (dev) {
      dev.tickets = [...dev.tickets, ticket];
      await dev.save();
    }
    const intern = await User.findById(holder);
    if (intern) {
      intern.tickets = [...intern.tickets, ticket];
      await dev.save();
      res.status(200).json({ message: "Created Sucessfully" });
    }
  } else res.status(400).json({ message: "Error saving ticket" });
});

// @desc    get all tickets
// @route   GET /api/tickets/all
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Decode the token and extract the userId
  const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const cur_user = await User.findById(decodedToken.userId);
  let tickets = [];
  for (const ticket_id of cur_user.tickets) {
    const ticket = await Ticket.findById(ticket_id);
    if (ticket) tickets = [...tickets, ticket];
  }
  if (tickets) {
    res.status(200).json(tickets); // Send the retrieved projects as the response
  } else {
    res.status(404).json({ message: "No projects found" });
  }
});

// @desc    update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  ticket.status = status || ticket.status;
  const updatedTicket = await ticket.save();
  if (updatedTicket) res.status(200).json({ message: "Updated successfully!" });
  else res.status(400).json({ message: "error updating Ticket!" });
});

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404).json({ message: "Ticket not found" });
    return;
  }
  // Delete the Ticket and handle the result
  const deletedTicket = await Ticket.deleteOne();
  if (deletedTicket)
    res.status(200).json({ message: "Ticket deleted successfully" });
  else res.status(500).json({ message: "Error deleting Ticket" });
});

export { updateTicket, createTicket, getTickets, deleteTicket };
