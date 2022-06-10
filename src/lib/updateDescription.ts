import { PrismaClient, Video } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

const prisma = new PrismaClient();

const main = async () => {
  const videoSearchUrl = 'https://www.googleapis.com/youtube/v3/videos';
  const allVideo = await prisma.video.findMany();

  const updateVideoList: Video[] = [];
  const results: Promise<AxiosResponse<any, any>>[] = [];
  allVideo.forEach((video) => {
    const res = axios.get(videoSearchUrl, {
      params: {
        part: 'snippet',
        id: video.videoId,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    results.push(res);
  });

  const videos = await Promise.all(results);

  allVideo.forEach((videoFromDB) => {
    videos.forEach((videoFromYoutube) => {
      if (videoFromDB.videoId === videoFromYoutube.data.items[0].id) {
        videoFromDB.description = videoFromYoutube.data.items[0].snippet.description;
        updateVideoList.push(videoFromDB);
      }
    });
  });

  const updateResult = await prisma.video.updateMany({
    data: updateVideoList,
  });
};

main();
