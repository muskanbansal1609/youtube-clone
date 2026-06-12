// src/components/VideoCard.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video } from "../services/types";

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Extract video ID dynamically (handles both standard video lists and search results shapes)
  const id = typeof video.id === "object" ? video.id.videoId : video.id;

  // Safety break: if no ID can be resolved, do not render broken layouts
  if (!id) return null;

  const handleVideoClick = () => {
    navigate(`/video/${id}`);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col gap-2 cursor-pointer group transition-all duration-200"
      onClick={handleVideoClick}
    >
      {/* Thumbnail / Video Preview Box */}
      <div className="w-full aspect-video bg-zinc-100 rounded-xl overflow-hidden relative shadow-sm">
        {!isHovered ? (
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <iframe
            className="w-full h-full absolute inset-0 pointer-events-none"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1`}
            title={video.snippet.title}
            allow="autoplay; encrypted-media"
            frameBorder="0"
          ></iframe>
        )}
      </div>

      {/* Video Content Descriptions */}
      <div className="flex gap-3 px-1 pt-1">
        {/* Creator Avatar Placeholder circle */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex-shrink-0" />

        <div className="flex flex-col min-w-0">
          <h3 className="font-medium text-zinc-950 text-sm sm:text-base leading-tight line-clamp-2 group-hover:text-red-600 transition-colors">
            {video.snippet.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 truncate">
            {video.snippet.channelTitle}
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            1.2M views • 3 days ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
