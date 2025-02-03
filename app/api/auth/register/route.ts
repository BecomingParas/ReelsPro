import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { error } from "console";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are requirded" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already exist" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register User" },
      { status: 500 }
    );
  }
}
