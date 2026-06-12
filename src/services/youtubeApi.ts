// src/services/youtubeApi.ts

import { z } from 'zod';
import { Video } from '../services/types';

const API_KEY = 'AIzaSyAbL3dRurSsPZ1GrAee0zGMiujAXx0xCiU';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtubeResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.object({
        videoId: z.string(),
      }),
      snippet: z.object({
        title: z.string(),
        thumbnails: z.object({
          medium: z.object({
            url: z.string().url(),
          }),
        }),
        channelTitle: z.string(),
      }),
    })
  ),
});


export const fetchVideos = async (
  query: string,
  maxResults: number = 20
): Promise<{ videos: Video[] }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${query}&type=video&key=${API_KEY}&maxResults=${maxResults}`
    );

    const data = await response.json();

    // Validate the response using the Zod schema
    const parsedData = youtubeResponseSchema.parse(data);

    // Fetch video details (including duration) using `videos.list` with `contentDetails`
    const videoIds = parsedData.items.map((item: any) => item.id.videoId).join(',');
    const detailsResponse = await fetch(
      `${BASE_URL}/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`
    );
    const detailsData = await detailsResponse.json();

    // Map contentDetails data to each video
    const videos = parsedData.items.map((item: any, index: number) => ({
      id: { videoId: item.id.videoId },
      snippet: item.snippet,
      contentDetails: detailsData.items[index].contentDetails, // Add contentDetails to each video
    }));

    return { videos };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};