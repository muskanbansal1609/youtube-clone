// src/components/Subscriptions.tsx

import React, { useEffect, useState } from 'react';
import { fetchVideos } from '../services/youtubeApi';
import VideoList from './VideoList';
import { Video } from '../services/types';

const Subscriptions: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSubscriptions = async () => {
    setLoading(true);
    try {
      const { videos: fetchedVideos } = await fetchVideos('subscribed channels', 20); // 'subscribed channels' query
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
      <VideoList videos={videos} loading={loading} />
    </div>
  );
};

export default Subscriptions;
