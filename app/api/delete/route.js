// app/api/delete/route.js

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb.js";
import Transaction from "@/models/Transaction";
import ContactMessage from "@/models/ContactMessage";

// Handler for DELETE requests
export async function DELETE(request) {
  // 1. Authenticate and get User ID (with prefix, e.g., 'user_...')
  const { userId: clerkIdWithPrefix } = await auth();

  if (!clerkIdWithPrefix) {
    return NextResponse.json(
      { message: "Unauthorized. User must be logged in." },
      { status: 401 }
    );
  }

  // 2. Derive the ID format expected by your MongoDB documents.
  // We strip the 'user_' prefix, assuming that's how it's stored in your Transactions/Contacts.
  const finalUserId = clerkIdWithPrefix.replace("user_", "");

  // Log the final ID being used for the query for final confirmation
  console.log("Final DB Query Field: userId");
  console.log("Final ID used for Mongoose query (stripped):", finalUserId);

  try {
    // 3. Establish MongoDB connection
    await dbConnect();

    // 4. Delete ALL Transactions and Contact Messages using the 'userId' field.
    // ✅ FIX APPLIED: Using { userId: finalUserId } for the query.
    const transactionResult = await Transaction.deleteMany({
      userId: finalUserId,
    });
    const contactResult = await ContactMessage.deleteMany({
      userId: finalUserId,
    });

    // 5. Consolidate results for the message
    const deletedTxns = transactionResult.deletedCount;
    const deletedContacts = contactResult.deletedCount;

    // 6. Return success response
    return NextResponse.json(
      {
        message: `Successfully deleted user data: ${deletedTxns} transaction(s) and ${deletedContacts} contact message(s).`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the detailed error for server-side debugging
    console.error("API Deletion Error:", error.message);

    // 7. Return error response
    return NextResponse.json(
      {
        message: "An internal server error occurred during data deletion.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
