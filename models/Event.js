import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    postType: {
      type: String,
      default: "event",
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: [
      {
        key: { type: String },
      },
    ],
    costs: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
    dateTime: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "event",
    },
    path: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    isCommercial: {
      type: Boolean,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

eventSchema.index({ location: "2dsphere" });

const Event = mongoose.model("Event", eventSchema);
export default Event;
