import mongoose from "mongoose";

const EmailTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      validate: {
        validator: (v) => v?.en, // Ensure at least English exists
        message: "English subject is required",
      },
    },
    body: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      validate: {
        validator: (v) => v?.en,
        message: "English body is required",
      },
    },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

const EmailTemplate = mongoose.model("email-template", EmailTemplateSchema);
export default EmailTemplate;
