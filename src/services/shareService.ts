import { loadShares, saveShares } from "../utils/helpers";
import { incrementCounters } from "./videoService";

export const createShare = async (
  videoId: string,
  platform: string,
  userId: string | null,
  userIp: string
) => {
  if (!platform || !platform.trim()) {
    throw new Error("Platform is required");
  }

  const shares = await loadShares();
  shares.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    videoId: String(videoId),
    platform: platform.trim(),
    userId,
    userIp,
    createdAt: new Date().toISOString()
  });

  await saveShares(shares);
  await incrementCounters(videoId, { sharesCount: 1 });

  const sharesCount = shares.filter((item) => String(item.videoId) === String(videoId)).length;
  return { sharesCount };
};
