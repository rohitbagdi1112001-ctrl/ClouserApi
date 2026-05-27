import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";

dotenv.config();

const dataDir = path.join(__dirname, "..", "data");
const files = ["videos.json", "likes.json", "shares.json", "comments.json"];

const seedData = async () => {
  await fs.mkdir(dataDir, { recursive: true });

  for (const fileName of files) {
    const filePath = path.join(dataDir, fileName);
    try {
      await fs.access(filePath);
    } catch {
      const initialValue = fileName === "videos.json" ? [] : [];
      await fs.writeFile(filePath, JSON.stringify(initialValue, null, 2), "utf-8");
      console.log(`Created ${fileName}`);
    }
  }

  console.log("JSON storage files are ready.");
  process.exit(0);
};

seedData().catch((error) => {
  console.error(error);
  process.exit(1);
});
