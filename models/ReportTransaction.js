import mongoose from "mongoose";

const ReportTransactionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
});

// ⚡ Unique model name to avoid conflict with existing "Transaction"
export default mongoose.models.ReportTransaction ||
  mongoose.model("ReportTransaction", ReportTransactionSchema);
