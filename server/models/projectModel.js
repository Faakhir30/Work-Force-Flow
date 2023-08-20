import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tickets:{
      type:Array,
      default:[]
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
    deadline:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;