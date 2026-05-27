import { loadComments, saveComments, loadVideos } from "../utils/helpers";
import { incrementCounters } from "./videoService";

export const getCommentsForVideo = async (
  videoId: string,
  limit: number,
  page: number
) => {
  const comments = await loadComments();
  const filtered = comments
    .filter((comment) => String(comment.videoId) === String(videoId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const start = (page - 1) * limit;
  const pageComments = filtered.slice(start, start + limit);

  return {
    comments: pageComments,
    total: filtered.length,
    page,
    limit
  };
};

export const addComment = async (
  videoId: string,
  text: string,
  userId: string | null,
  userIp: string
) => {
  if (!text || !text.trim()) {
    throw new Error("Comment cannot be empty");
  }

  const videos = await loadVideos();
  const video = videos.find((item) => String(item.id) === String(videoId));
  if (!video) {
    throw new Error("Video not found");
  }

  const comments = await loadComments();
  const newComment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    videoId: String(videoId),
    text: text.trim(),
    userId,
    userIp,
    createdAt: new Date().toISOString()
  };

  comments.push(newComment);
  await saveComments(comments);
  await incrementCounters(videoId, { commentsCount: 1 });

  return newComment;
};
