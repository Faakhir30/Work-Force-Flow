import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
// @desc    Create project
// @route   POST /api/projects/
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, lead, pm, team, status } = req.body;
  const project = await Project.create({
    title,
    lead,
    pm,
    team,
    status,
  });
  for (const person_id of team) {
    const person = await User.findById(person_id);
    if (person && !(project._id in person.projects))
      person.projects = [...person.projects, project._id];
    await person.save();
  }

  if (project) res.status(200).json({ message: "Created successfully" });
  else res.status(400).json({ message: "error creating project!" });
});

// @desc    get all project
// @route   GET /api/projects/all
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  // Decode the token and extract the userId
  const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const cur_user = await User.findById(decodedToken.userId);
  let projects = [];
  for (const project_id of cur_user.projects) {
    const project = await Project.findById(project_id);
    if (project) projects=[...projects,project];
  }
  if (projects) {
    res.status(200).json(projects); // Send the retrieved projects as the response
  } else {
    res.status(404).json({ message: "No projects found" });
  }
});

// @desc    update project
// @route   PUT /api/projects/:id
// @access  Private

const updateProject = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const project = await Project.findById(req.params.id);
  project.status = status || project.status;
  const updatedProject = await project.save();
  if (updatedProject)
    res.status(200).json({ message: "Updated successfully!" });
  else res.status(400).json({ message: "error updating project!" });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404).json({ message: "Project not found" });
    return;
  }
  // Delete the project and handle the result
  const deletedProject = await project.deleteOne();
  if (deletedProject)
    res.status(200).json({ message: "Project deleted successfully" });
  else res.status(500).json({ message: "Error deleting project" });
});

export { updateProject, createProject, getProjects, deleteProject };
