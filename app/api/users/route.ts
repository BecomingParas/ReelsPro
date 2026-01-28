import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const users = await User.find({}, "_id name username avatar")
      .sort({ _id: -1 })
      .limit(20)
      .lean();

    return NextResponse.json(users);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
