import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPrivate: {
      type: Boolean,
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
    type: {
      type: String,
      required: true,
    },
    path: {
      type: String,
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

postSchema.index({ location: "2dsphere" });

const Post = mongoose.model("Post", postSchema);
export default Post;
