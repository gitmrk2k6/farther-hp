import { getAllPosts } from "@/lib/blog";
import { getLatestVideos } from "@/lib/youtube";
import HomeClient from "@/components/HomeClient";

interface NewsItem {
  date: string;
  category: string;
  title: string;
  href: string;
  pinned: boolean;
}

function formatDisplayDate(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;
}

export default async function Home() {
  const posts = getAllPosts();
  const videos = await getLatestVideos(5);
  const today = new Date().toISOString().split("T")[0];

  // ブログ記事をニュースアイテムに変換
  const blogNews: NewsItem[] = posts.map((post) => ({
    date: formatDisplayDate(post.date),
    category: "ブログ",
    title: post.title,
    href: `/blog/${post.slug}`,
    pinned: !!post.pinUntil && post.pinUntil >= today,
  }));

  // YouTube動画をニュースアイテムに変換
  const youtubeNews: NewsItem[] = videos.map((video) => ({
    date: formatDisplayDate(video.published),
    category: "YouTube",
    title: `「${video.title}」が公開されました`,
    href: `https://www.youtube.com/watch?v=${video.id}`,
    pinned: false,
  }));

  // マージして日付順にソート（固定表示は上部に）
  const allNews = [...blogNews, ...youtubeNews];
  allNews.sort((a, b) => {
    // 固定表示を優先
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    // 同じなら日付の降順
    return b.date.localeCompare(a.date);
  });

  // 最新5件
  const newsItems = allNews.slice(0, 5).map(({ pinned, ...rest }) => rest);

  // ブログプレビュー（最新2件）
  const blogPreviews = posts.slice(0, 2).map((post) => ({
    date: formatDisplayDate(post.date),
    title: post.title,
    excerpt: post.excerpt,
    href: `/blog/${post.slug}`,
  }));

  return <HomeClient newsItems={newsItems} blogPreviews={blogPreviews} />;
}
