// models/ContactMessage.js

import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends of a string
    },
    email: {
      type: String,
      required: true,
      lowercase: true, // Stores emails in lowercase
      trim: true,
    },
    subject: {
      type: String,
      required: false, // Subject is optional
      default: "No Subject Provided",
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Use existing model if it exists, otherwise create a new one
export default mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);
