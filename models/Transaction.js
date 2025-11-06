import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    // Clerk uses a simple string ID, so using String is often easier than ObjectId here
    userId: {
      type: String,
      required: true,
      //   index: true, // Index for fast retrieval by user
    },
    type: {
      type: String,
      required: true,
      enum: ["Expense", "Income"], // Restrict to these two values
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01, // Must be a positive amount
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    // The actual date of the expense, usually provided by the user
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Optional: Combine userId and date for composite indexing if you often query by both
TransactionSchema.index({ userId: 1, date: -1 });

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
export default Transaction;
