import { promises as fs } from "fs";
import path from "path";
import { Request } from "express";

const dataDir = path.join(__dirname, "..", "data");
const videosFile = path.join(dataDir, "videos.json");
const likesFile = path.join(dataDir, "likes.json");
const sharesFile = path.join(dataDir, "shares.json");
const commentsFile = path.join(dataDir, "comments.json");

const ensureJsonFile = async <T>(filePath: string, defaultValue: T): Promise<T> => {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return raw.trim() ? JSON.parse(raw) : defaultValue;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2), "utf-8");
      return defaultValue;
    }
    throw error;
  }
};

export const getUserIp = (req: any): string => {
  const rawIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || req.ip || "unknown";
  return Array.isArray(rawIp) ? rawIp[0] : String(rawIp);
};

export const getUserIdentity = (req: Request) => {
  const rawUserId = req.headers["x-user-id"] || req.headers["user-id"];
  const userId = Array.isArray(rawUserId) ? rawUserId[0] : String(rawUserId || "");
  return {
    userId: userId || null,
    userIp: getUserIp(req)
  };
};

export const loadVideos = async (): Promise<any[]> => {
  return ensureJsonFile(videosFile, []);
};

export const saveVideos = async (videos: any[]): Promise<void> => {
  await fs.writeFile(videosFile, JSON.stringify(videos, null, 2), "utf-8");
};

export const loadLikes = async (): Promise<any[]> => {
  return ensureJsonFile(likesFile, []);
};

export const saveLikes = async (likes: any[]): Promise<void> => {
  await fs.writeFile(likesFile, JSON.stringify(likes, null, 2), "utf-8");
};

export const loadShares = async (): Promise<any[]> => {
  return ensureJsonFile(sharesFile, []);
};

export const saveShares = async (shares: any[]): Promise<void> => {
  await fs.writeFile(sharesFile, JSON.stringify(shares, null, 2), "utf-8");
};

export const loadComments = async (): Promise<any[]> => {
  return ensureJsonFile(commentsFile, []);
};

export const saveComments = async (comments: any[]): Promise<void> => {
  await fs.writeFile(commentsFile, JSON.stringify(comments, null, 2), "utf-8");
};