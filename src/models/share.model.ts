export interface IShare {
  id: string;
  videoId: string;
  platform: string;
  userId?: string | null;
  userIp: string;
  createdAt: string;
}
