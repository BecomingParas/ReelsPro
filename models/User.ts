import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  loginAttempts?: number;
  lastLogin?: Date;
  isEmailVerified?: boolean;
  role?: "user" | "admin" | "creator";
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't include password in queries by default
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must not exceed 50 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username must not exceed 30 characters"],
      match: [
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers, and underscores",
      ],
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: [160, "Bio must not exceed 160 characters"],
      default: "",
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lastLogin: {
      type: Date,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "creator"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON:
    {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Virtual for follower count
userSchema.virtual("followerCount").get(function () {
  return this.followers?.length || 0;
});

// Virtual for following count
userSchema.virtual("followingCount").get(function () {
  return this.following?.length || 0;
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Validate username uniqueness case-insensitively
userSchema.pre("save", async function (next) {
  if (this.isModified("username")) {
    const existingUser = await (this.constructor as any).findOne({
      username: new RegExp(`^${this.username}$`, "i"),
      _id: { $ne: this._id },
    });
    if (existingUser) {
      throw new Error("Username already taken");
    }
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to find by username (case-insensitive)
userSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username: new RegExp(`^${username}$`, "i") });
};

const User = models?.User || model<IUser>("User", userSchema);

export default User;
