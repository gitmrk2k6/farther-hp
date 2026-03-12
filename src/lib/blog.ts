import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  contentHtml?: string;
  tags?: string[];
  pinUntil?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

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
      content,
      tags: data.tags || [],
      pinUntil: data.pinUntil || "",
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostBySlugWithHtml(
  slug: string
): Promise<BlogPost | null> {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const result = await remark().use(html).process(post.content);
  return {
    ...post,
    contentHtml: result.toString(),
  };
}
