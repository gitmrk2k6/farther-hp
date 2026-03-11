import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

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
  const post = getPostBySlug(slug);
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
  const post = getPostBySlug(slug);

  if (!post) notFound();

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

          <p className="text-sm text-muted mb-2">{post.date}</p>
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

          <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}
