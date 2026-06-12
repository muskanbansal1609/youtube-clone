// src/components/Shorts.tsx

import React, { useEffect, useState } from 'react';
import { fetchVideos } from '../services/youtubeApi';
import VideoList from './VideoList';
import { Video } from '../services/types';

const Shorts: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const loadShorts = async () => {
    setLoading(true);
    try {
      const { videos: fetchedVideos } = await fetchVideos('trending shorts', 20); // 'trending shorts' query
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Error loading shorts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShorts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shorts</h2>
      <VideoList videos={videos} loading={loading} />
    </div>
  );
};

export default Shorts;
