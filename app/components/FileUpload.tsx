"use client";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
  ref?: React.RefObject<HTMLInputElement>;
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
  ref: _ref,
}: FileUploadProps) {
  void _ref;

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
    setSuccess(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    setSuccess(true);
    onSuccess(response);
    
    // Reset success state after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
    setSuccess(false);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      const validTypes = ["video/mp4", "video/mov", "video/avi", "video/webm"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid video file (MP4, MOV, AVI, or WebM)");
        return false;
      }
      if (file.size > 500 * 1024 * 1024) {
        setError("Video size must be less than 500MB");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, WebP, or GIF)");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="space-y-3">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        onUploadProgress={handleProgress}
        accept={fileType === "video" ? "video/*" : "image/*"}
        validateFile={validateFile}
        useUniqueFileName={true}
        folder={fileType === "video" ? "/videos" : "/images"}
        className="hidden"
      />

      {uploading && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          <div className="flex-1">
            <p className="font-medium">Uploading file...</p>
            <p className="text-sm text-muted-foreground">Please wait while we upload your file</p>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <div className="flex-1">
            <p className="font-medium">Upload successful!</p>
            <p className="text-sm text-muted-foreground">Your file has been uploaded successfully</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div className="flex-1">
            <p className="font-medium">Upload failed</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}