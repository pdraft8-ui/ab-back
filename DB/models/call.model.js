import mongoose, { Schema } from "mongoose";

const callSchema = new mongoose.Schema(
  {
    callid: {
      type: String,
      required: true,
      unique: true,
    },
    recordingUrl: {
      type: String,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CallModel = mongoose.model("Call", callSchema);
export default CallModel;
