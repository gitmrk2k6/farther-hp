import { getAllPosts, getPostBySlugWithHtml } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}年${month}月${day}日`;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlugWithHtml(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlugWithHtml(slug);

  if (!post) notFound();

  // 前後の記事を取得
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="pt-24 pb-20">
      <article className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-primary transition-colors mb-8 inline-block"
          >
            ← ブログ一覧に戻る
          </Link>

          <p className="text-sm text-muted mb-2">{formatDate(post.date)}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            {post.title}
          </h1>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-8 flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Markdownから変換されたHTMLを表示 */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />

          {/* 前後の記事ナビゲーション */}
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <div className="flex justify-between gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex-1 text-left"
                >
                  <p className="text-xs text-muted mb-1">← 前の記事</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex-1 text-right"
                >
                  <p className="text-xs text-muted mb-1">次の記事 →</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
