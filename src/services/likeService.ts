import { loadLikes, saveLikes } from "../utils/helpers";
import { incrementCounters } from "./videoService";

export const toggleLike = async (
  videoId: string,
  userId: string | null,
  userIp: string
) => {
  const likes = await loadLikes();
  const existingIndex = likes.findIndex(
    (item) =>
      String(item.videoId) === String(videoId) &&
      (item.userId === userId || item.userIp === userIp)
  );

  let liked = true;
  if (existingIndex >= 0) {
    likes.splice(existingIndex, 1);
    liked = false;
    await incrementCounters(videoId, { likesCount: -1 });
  } else {
    likes.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      videoId: String(videoId),
      userId,
      userIp,
      createdAt: new Date().toISOString()
    });
    await incrementCounters(videoId, { likesCount: 1 });
  }

  await saveLikes(likes);

  const likesCount = likes.filter((item) => String(item.videoId) === String(videoId)).length;
  return { liked, likesCount };
};
