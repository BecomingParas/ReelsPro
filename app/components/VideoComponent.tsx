import { IVideo } from "@/models/video";
import { IKVideo } from "imagekitio-next";
import Link from "next/link";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <IKVideo
            path={video.videoUrl}
            transformation={[
              {
                height: "1920",
                width: "1080",
              },
            ]}
            controls={video.controls}
            className="w-full h-full object-cover"
          />
        </Link>
      </figure>
      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>
        <p className="text-sm text-base-content/80 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
