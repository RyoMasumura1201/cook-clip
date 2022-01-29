export type YoutubeMovie = {
  kind: string;
  etag: string;
  id: { kind: string; videoId: string };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: [Object];
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};
