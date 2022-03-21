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

export type SearchMovieResult = {
  kind: string;
  etag: string;
  nextPageToken: string;
  reginCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeMovie[];
};

export type Bookmark = {
  id: string;
  title: string;
  startAt: number;
  videoId: string;
  userId: string;
  createdAt: Date;
};
