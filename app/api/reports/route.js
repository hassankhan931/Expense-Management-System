import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction.js"; // ✅ Correct import

export async function GET() {
  try {
    await connectDB();

    const { userId } = await auth(); // ✅ Keep full Clerk ID
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Use correct model (Transaction)
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    return NextResponse.json(
      {
        success: true,
        totalTransactions: transactions.length,
        transactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Report API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
