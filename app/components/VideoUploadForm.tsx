"use client";

import { useForm } from "react-hook-form";
import { useNotification } from "./Notification";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}
export default function VideoUploadForm() {
  const { showNotification } = useNotification();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });
  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first.", "error");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
      <div className="form-control">
        <label className="label">Title</label>
        <input
          type="text"
          className={`input input-bordered ${
            errors.title ? "input-error" : ""
          }`}
          {...register("title", { required: "Title is required." })}
        />
        {errors.description && (
          <span className="text-error text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="form-control"></div>
    </form>
  );
}
