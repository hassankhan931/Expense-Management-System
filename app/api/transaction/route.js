// api/transaction/route.js

import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Transaction from "@/models/Transaction";
import { auth } from "@clerk/nextjs/server";

// -------------------------------------------------------------
// @route POST /api/transaction - Create
// -------------------------------------------------------------
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const { type, amount, description, category, date } = body;

    if (
      !type ||
      !amount ||
      !description ||
      !category ||
      !date ||
      typeof amount !== "number" ||
      amount <= 0
    ) {
      return NextResponse.json(
        { message: "Missing or invalid required fields." },
        { status: 400 }
      );
    }

    const newTransaction = new Transaction({
      userId: userId,
      type,
      amount,
      description,
      category,
      date: new Date(date),
    });

    const savedTransaction = await newTransaction.save();

    return NextResponse.json(
      {
        message: "Transaction created successfully.",
        transaction: savedTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------
// @route GET /api/transaction - Read (List)
// -------------------------------------------------------------
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Fetch transactions *only* for the authenticated userId
    const transactions = await Transaction.find({ userId })
      .sort({ date: -1, createdAt: -1 }) // Sort by newest first
      .limit(100);

    return NextResponse.json(
      {
        transactions: transactions,
        message: "Transactions fetched successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------
// ✅ @route DELETE /api/transaction?id=... - Delete
// -------------------------------------------------------------
export async function DELETE(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    // Get the transaction ID from the URL query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Transaction ID is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Delete the transaction, ensuring it belongs to the authenticated user
    const result = await Transaction.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!result) {
      return NextResponse.json(
        {
          message: "Transaction not found or not authorized to delete.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Transaction deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------
// ✅ @route PUT /api/transaction - Update (PUT/PATCH)
// -------------------------------------------------------------
export async function PUT(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { message: "Transaction ID (_id) is required for update." },
        { status: 400 }
      );
    }

    // Remove userId and any invalid fields from updateData to prevent unauthorized changes
    delete updateData.userId;

    // Ensure amount is valid if present
    if (
      updateData.amount &&
      (typeof updateData.amount !== "number" || updateData.amount <= 0)
    ) {
      return NextResponse.json(
        { message: "Amount must be a positive number." },
        { status: 400 }
      );
    }

    // Find the transaction by ID AND userId to ensure ownership before updating
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: _id, userId: userId },
      updateData,
      { new: true, runValidators: true } // Return the updated doc and run schema validators
    );

    if (!updatedTransaction) {
      return NextResponse.json(
        {
          message: "Transaction not found or not authorized to update.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Transaction updated successfully.",
        transaction: updatedTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating transaction:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { message: error.message, error: error.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}
