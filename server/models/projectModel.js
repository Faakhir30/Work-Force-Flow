import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lead: {
      type: String, //User._id
      required: true,
    },
    pm: {
      type: String,
      required: true,
    },
    team: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "pending", "done"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
