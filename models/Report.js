import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reporterID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
