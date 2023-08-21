import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Project from "../models/projectModel.js";
// @desc    Create ticket
// @route   POST /api/tickets/
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { project, title, category, holder, status } = req.body;
  const provider = req.user._id;
  if (await Ticket.findOne({ project, title, provider, holder }))
    return res.status(400).json({ message: "Similar ticket already exists" });
  const ticket = await Ticket.create({
    project,
    title,
    provider: req.user._id,
    category,
    holder,
    status,
  });
  if (ticket) {
    const dev = await User.findById(provider);
    dev.tickets.push(ticket);
    await dev.save();
    const intern = await User.findById(holder);
    intern.tickets.push(ticket);
    await intern.save();
    const theProject = await Project.findById(project); // Fetch the project
    theProject.tickets.push(ticket); // Add ticket to the tickets array
    await theProject.save();
    res.status(200).json({ message: "Created Sucessfully" });
  } else res.status(400).json({ message: "Error saving ticket" });
});

// @desc    get all tickets
// @route   GET /api/tickets/all
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const cur_user = req.user;
  let tickets = [];
  for (const ticket_id of cur_user.tickets) {
    const ticket = await Ticket.findById(ticket_id);
    if (ticket) tickets.push(ticket);
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
