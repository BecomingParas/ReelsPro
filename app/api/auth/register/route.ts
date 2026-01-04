import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

// Input validation schema (we'll use Zod in Phase 2, but for now manual validation)
function validateRegistration(data: any) {
  const errors: string[] = [];

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.password || data.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.username || data.username.length < 3) {
    errors.push("Username must be at least 3 characters");
  }

  if (data.username && !/^[a-z0-9_]+$/i.test(data.username)) {
    errors.push(
      "Username can only contain letters, numbers, and underscores"
    );
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, username } = body;

    // Validate input
    const errors = validateRegistration({ email, password, name, username });
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists (email)
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Check if username already exists (case-insensitive)
    const existingUsername = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      name: name.trim(),
      username: username.toLowerCase(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random`,
      bio: "",
      followers: [],
      following: [],
    });

    // Return user data (password excluded by toJSON transform)
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          username: user.username,
          avatar: user.avatar,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((err: any) => err.message)
        .join(", ");
      return NextResponse.json({ error: messages }, { status: 400 });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
