import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "ブログ",
  description: "小西達也のブログ。日々の活動や想い、近況、ちょっとしたぼやきなど。",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}年${month}月${day}日`;
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <SectionTitle
          title="ブログ"
          subtitle="日々の活動や想い、近況、ちょっとしたぼやきなど"
        />
      </section>

      {/* Blog List */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted">記事の準備中です。お楽しみに。</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="bg-card-bg rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-primary/15">
                    <p className="text-xs text-muted mb-2">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="font-bold text-lg mb-2">{post.title}</h2>
                    <p className="text-sm text-foreground/60 line-clamp-2">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex gap-2 flex-wrap">
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
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
