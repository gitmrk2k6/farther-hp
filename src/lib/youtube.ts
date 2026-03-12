import { parseStringPromise } from "xml2js";

const CHANNEL_ID = "UC192QAtF9LlPsvXuAw8y2BA";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
}

export async function getLatestVideos(limit = 5): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, { cache: "force-cache" });
    if (!res.ok) return [];

    const xml = await res.text();
    const parsed = await parseStringPromise(xml);
    const entries = parsed?.feed?.entry || [];

    return entries.slice(0, limit).map((entry: any) => ({
      id: entry["yt:videoId"]?.[0] || "",
      title: (entry.title?.[0] || "").replace(/\/小西達也$/, ""),
      published: entry.published?.[0] || "",
    }));
  } catch (e) {
    console.error("YouTube RSS fetch error:", e);
    return [];
  }
}
