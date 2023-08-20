import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    project:{
        type:String,  //Project._id
        required:true
    },
    title: {
      type: String,
      required: true,
    },
    provider: {
      type: String, //User._id
      required: true,
    },
    holder: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "done","submited"],
      default: "pending",
    },
    category: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;