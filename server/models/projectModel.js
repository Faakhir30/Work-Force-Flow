import mongoose from "mongoose";
import User from "./userModel";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lead: {
      type: User,
      required: true,
    },
    team: {
      type: Array,
      default: [this.lead],
    },
    status:{
        type:String,
        enum:["active","pending","Done"],
        default:"pending"
    }
},
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
