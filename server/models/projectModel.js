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
      type: Set,
      default: function () {
        return Set([this.lead, this.pm]);
      },
    },
    status: {
      type: String,
      enum: ["active", "pending", "Done"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
