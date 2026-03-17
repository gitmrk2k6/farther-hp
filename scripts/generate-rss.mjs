/**
 * RSSフィード生成スクリプト
 *
 * ビルド後に実行して out/feed.xml を生成する。
 * GASからこのRSSを定期チェックし、新着ブログ記事をLINEに通知するために使用。
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// --- 定数（サイトに合わせて変更可能） ---
const SITE_URL = "https://gitmrk2k6.github.io/farther-hp";
const SITE_TITLE = "小西達也 | シンガーソングライター";
const SITE_DESCRIPTION =
  "シンガーソングライター小西達也の公式ウェブサイト。楽曲、ライブ情報、ブログなどをお届けします。";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const OUT_DIR = path.join(process.cwd(), "out");

function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || "無題",
      date: data.date || "",
      excerpt: data.excerpt || content.slice(0, 120) + "...",
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss(posts) {
  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

// --- 実行 ---
const posts = getAllPosts();
const rssXml = generateRss(posts);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "feed.xml"), rssXml, "utf-8");

console.log(`✅ RSSフィード生成完了: out/feed.xml（${posts.length}件の記事）`);
