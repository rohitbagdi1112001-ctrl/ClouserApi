export interface IVideo {
  id: string | number;
  type?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes?: number;
  shares?: number;
  likesCount?: number;
  sharesCount?: number;
  commentsCount?: number;
}
