import mongoose from "mongoose";
import User from "./userModel";
import Project from "./projectModel";

const ticketSchema = mongoose.Schema(
  {
    project:{
        type:Project,
        required:true
    },
    title: {
      type: String,
      required: true,
    },
    provider: {
      type: User,
      required: true,
    },
    holder: {
      type: User,
      required: true,
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

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
