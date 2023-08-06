import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    projects: {
      type: Set,
      default: Set([]),
    },
    role: {
      type: String,
      required: true,
      enum: ["dev", "intern", "admin"],
      default: "dev",
    },
    tickets: {
      type: Set,
      default: Set([]),
    },
    stats: {
      type: {},
      default: {
        projects: [0, 0], //  [total, active]
        tickets: [0, 0],
        days: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
