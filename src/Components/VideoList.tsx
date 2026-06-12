// src/components/VideoList.tsx

import React, { useState, useEffect, useCallback } from "react";
import { fetchVideos } from "../services/youtubeApi";
import VideoCard from "./VideoCard";
import { Video } from "../services/types";

interface VideoListProps {
  query?: string;
  filter?: string;
  videos?: Video[];
  loading?: boolean;
}

const VideoList: React.FC<VideoListProps> = ({
  query = "all",
  filter = "All",
  videos: passedVideos,
  loading: passedLoading,
}) => {
  const [internalVideos, setInternalVideos] = useState<Video[]>([]);
  const [internalLoading, setInternalLoading] = useState(false);

  const isControlled = passedVideos !== undefined;
  const displayVideos = isControlled ? passedVideos : internalVideos;
  const displayLoading =
    passedLoading !== undefined ? passedLoading : internalLoading;

  const loadVideos = useCallback(
    async (searchQuery: string) => {
      if (isControlled) return;

      setInternalLoading(true);
      try {
        const { videos: fetchedVideos } = await fetchVideos(
          searchQuery || "all"
        );
        setInternalVideos(fetchedVideos);
      } catch (error) {
        console.error("Error loading videos:", error);
      } finally {
        setInternalLoading(false);
      }
    },
    [isControlled]
  );

  useEffect(() => {
    loadVideos(filter !== "All" ? filter : query || "all");
  }, [query, filter, loadVideos]);

  return (
    <div className="w-full">
      {displayLoading ? (
        <div className="w-full flex justify-center py-12">
          <div className="animate-spin h-9 w-9 border-4 border-red-600 rounded-full border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {displayVideos &&
            displayVideos.map((video) => {
              const videoIdKey =
                typeof video.id === "object" ? video.id.videoId : video.id;
              return <VideoCard key={videoIdKey} video={video} />;
            })}
        </div>
      )}
    </div>
  );
};

export default VideoList;
