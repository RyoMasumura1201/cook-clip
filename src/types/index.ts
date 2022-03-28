export type YoutubeMovie = {
  id: string;
  title: string;
  description: string;
  videoId: string;
};

export type Bookmark = {
  id: string;
  title: string;
  startAt: number;
  videoId: string;
  userId: string;
  createdAt: Date;
};
