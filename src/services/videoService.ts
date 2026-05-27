import {
  loadVideos,
  saveVideos
} from "../utils/helpers";

const normalizeVideo = (video: any) => ({
  ...video,
  likesCount: video.likes ?? video.likesCount ?? 0,
  sharesCount: video.shares ?? video.sharesCount ?? 0,
  commentsCount: video.commentsCount ?? 0
});

export const getVideoFeed = async (
  limit: number,
  page: number,
  cursor?: string
) => {
  const videos = (await loadVideos()).map(normalizeVideo);
  const sorted = [...videos].sort((a, b) => Number(a.id) - Number(b.id));

  let startIndex = 0;
  if (cursor) {
    const cursorIndex = sorted.findIndex((item) => String(item.id) === String(cursor));
    startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
  } else {
    startIndex = (page - 1) * limit;
  }

  const pageVideos = sorted.slice(startIndex, startIndex + limit).map((video) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    videoUrl: video.videoUrl,
    likesCount: video.likesCount,
    sharesCount: video.sharesCount,
    commentsCount: video.commentsCount
  }));

  const lastPageVideo = pageVideos[pageVideos.length - 1];
  const nextCursor = lastPageVideo ? String(lastPageVideo.id) : null;

  return {
    videos: pageVideos,
    nextCursor,
    total: sorted.length
  };
};

export const getVideoById = async (id: string) => {
  const videos = await loadVideos();
  const video = videos.find((item) => String(item.id) === String(id));
  return video ? normalizeVideo(video) : null;
};

export const incrementCounters = async (
  id: string,
  updates: Partial<{
    likesCount: number;
    sharesCount: number;
    commentsCount: number;
  }>
) => {
  const videos = await loadVideos();
  const index = videos.findIndex((item) => String(item.id) === String(id));
  if (index < 0) return null;

  const video = videos[index];
  if (updates.likesCount != null) {
    video.likes = Math.max(0, (video.likes ?? video.likesCount ?? 0) + updates.likesCount);
  }
  if (updates.sharesCount != null) {
    video.shares = Math.max(0, (video.shares ?? video.sharesCount ?? 0) + updates.sharesCount);
  }
  if (updates.commentsCount != null) {
    video.commentsCount = Math.max(0, (video.commentsCount ?? 0) + updates.commentsCount);
  }

  videos[index] = video;
  await saveVideos(videos);
  return normalizeVideo(video);
};
