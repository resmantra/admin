import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
const SALT_WORK_FACTOR = 10;

const subscribedInterestsSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Node",
    },
    path: {
      type: String,
      required: true,
    },
    range: {
      type: Number,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    isPrivate: {
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

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePic: {
      key: { type: String },
    },
    images: [
      {
        key: { type: String },
      },
    ],
    yearOfBirth: {
      type: Number,
    },
    interestRange: {
      type: Number,
      default: 10,
    },
    defaultLanguage: {
      type: String,
      default: "en",
    },
    gender: {
      type: String,
    },
    defaultLocation: {
      type: Object,
    },
    city: {
      type: String,
    },
    subscribedInterests: [subscribedInterestsSchema],
    deletedAccount: {
      type: Boolean,
    },
    lastInteraction: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

//hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
userSchema.pre("save", async function (next) {
  // Only run if the document is new (isNew: true)
  if (!this.isNew) {
    return next(); // Skip for existing documents
  }

  if (!this.username) {
    return next(new Error("Username is required")); // Ensure username is present
  }

  let uniqueUsername = this.username;
  let suffix = "";

  while (await User.findOne({ username: uniqueUsername })) {
    suffix = `-${crypto.randomBytes(4).toString("hex")}`;
    uniqueUsername = this.username + suffix;
  }

  this.username = uniqueUsername;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
