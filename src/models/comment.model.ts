export interface IComment {
  id: string;
  videoId: string;
  text: string;
  userId?: string | null;
  userIp: string;
  createdAt: string;
}
