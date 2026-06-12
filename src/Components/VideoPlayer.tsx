// src/components/VideoPlayer.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchVideos } from "../services/youtubeApi";
import { Video } from "../services/types";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  MoreHorizontal,
} from "lucide-react";

const VideoPlayer: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [sidebarVideos, setSidebarVideos] = useState<Video[]>([]);
  const [loadingSidebar, setLoadingSidebar] = useState(false);

  // Automatically fetches sidebar recommendations matching standard playback categories
  useEffect(() => {
    const fetchSidebarContent = async () => {
      setLoadingSidebar(true);
      try {
        const { videos } = await fetchVideos("recommended videos", 12);
        setSidebarVideos(videos);
      } catch (error) {
        console.error("Error fetching recommended sidebar feeds:", error);
      } finally {
        setLoadingSidebar(false);
      }
    };
    if (videoId) fetchSidebarContent();
  }, [videoId]);

  if (!videoId) {
    return (
      <div className="p-6 text-center text-zinc-500 font-medium">
        Video asset parameter reference not detected.
      </div>
    );
  }

  return (
    <div className="max-w-[1550px] mx-auto flex flex-col lg:flex-row gap-6 px-1">
      {/* MAIN WATCH COMPONENT COLUMN (Left 70% space) */}
      <div className="flex-1 lg:max-w-[72%]">
        {/* Aspect Ratio Boxed Player Container Frame */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-sm">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Video Informational Headline */}
        <h1 className="text-lg md:text-xl font-bold text-zinc-950 mt-4 line-clamp-2 leading-snug">
          Streaming Content Feature - Beautiful Immersive Media View Interface
        </h1>

        {/* Dynamic Action Interaction Bar Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pb-4 border-b border-zinc-200/80">
          {/* Creator Profile Block */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-zinc-900 text-sm md:text-base leading-tight">
                Channel Network VEVO
              </h3>
              <p className="text-xs text-zinc-500">2.45M subscribers</p>
            </div>
            <button className="ml-4 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full transition-all">
              Subscribe
            </button>
          </div>

          {/* User Evaluation Controls */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-zinc-900">
            {/* Likes Group */}
            <div className="flex items-center bg-zinc-100 hover:bg-zinc-200/80 rounded-full overflow-hidden transition">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-300/40 border-r border-zinc-200">
                <ThumbsUp size={16} />
                <span>312K</span>
              </button>
              <button className="px-3 py-2 hover:bg-zinc-300/40">
                <ThumbsDown size={16} />
              </button>
            </div>

            <button className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full transition">
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full transition">
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Expandable Text Description Box */}
        <div className="mt-4 p-4 bg-zinc-100 rounded-xl text-xs md:text-sm text-zinc-800">
          <div className="font-semibold space-x-2 mb-1 text-zinc-900">
            <span>2.8M views</span>
            <span>•</span>
            <span>5 months ago</span>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            Welcome to the streaming experience panel setup interface! This
            layout handles beautiful fluid grids, clean typography tracking
            spacing ratios, and responsive mobile flex-collapse constraints.
          </p>
        </div>
      </div>

      {/* RECOMMENDED CONTENT FEED BAR (Right 30% space) */}
      <div className="w-full lg:w-[28%] flex flex-col gap-3">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block px-1">
          Up Next
        </span>

        {loadingSidebar ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin h-5 w-5 border-2 border-red-600 rounded-full border-t-transparent" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sidebarVideos.map((video) => {
              const currentId =
                typeof video.id === "object" ? video.id.videoId : video.id;
              if (!currentId) return null;

              return (
                <Link
                  to={`/video/${currentId}`}
                  key={currentId}
                  className="flex gap-2 group cursor-pointer"
                >
                  {/* Miniature Box Preview Cover Image */}
                  <div className="w-36 sm:w-40 h-20 sm:h-24 flex-shrink-0 bg-zinc-200 rounded-xl overflow-hidden">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-102"
                    />
                  </div>

                  {/* Micro-descriptions panel metadata block */}
                  <div className="flex flex-col min-w-0 pt-0.5">
                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                      {video.snippet.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 truncate">
                      {video.snippet.channelTitle}
                    </p>
                    <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">
                      450K views • 1 year ago
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
