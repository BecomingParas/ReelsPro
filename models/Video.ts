import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  user: {
    _id: mongoose.Types.ObjectId;
    name: string;
    username: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares: number;
  views: number;
  duration: number;
  tags: string[];
  location: string;
  music: string;
  isLive: boolean;
  visibility: "public" | "private" | "friends";
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    user: {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      username: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    tags: [{ type: String }],
    location: { type: String },
    music: { type: String },
    isLive: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["public", "private", "friends"],
      default: "public",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted duration
VideoSchema.virtual("formattedDuration").get(function () {
  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

export default mongoose.models.Video ||
  mongoose.model<IVideo>("Video", VideoSchema);
