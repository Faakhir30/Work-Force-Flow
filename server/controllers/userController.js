import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(401);
    res.json({ message: "Invalid email or password" });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { company, name, email, password, role, Login } = req.body;
  const companyExists = await User.findOne({ company });
  if (!!Login && companyExists) {
    return res
      .status(400)
      .json({ message: "Company already exists.Contact Admin" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    return res.json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    company,
  });
  if (!Login){
    return res.status(200).json({message: "Added User Sucessfully"})
  }
  if (user) {
    const token = generateToken(res, user._id);
    if (notLogin)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
      });
    else
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        token,
      });
  } else {
    res.status(400);
    res.json({ message: "Invalid user data" });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
// @desc    Get user profile
// @route   GET /api/users/all
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    const mapedUsers = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        projects:user.projects
      };
    });
    res.json({ users: mapedUsers });
  } else {
    res.status(404);
    res.json({ message: "User not found" });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company:user.company
    });
  } else {
    res.status(404);
    res.json({ message: "User not found" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    res.json({ message: "User not found" });
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers
};
