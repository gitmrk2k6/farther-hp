"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { motion } from "framer-motion";
import { assetPath } from "@/lib/path";

interface NewsItem {
  date: string;
  category: string;
  title: string;
  href: string;
}

interface BlogPreview {
  date: string;
  title: string;
  excerpt: string;
  href: string;
}

interface HomeClientProps {
  newsItems: NewsItem[];
  blogPreviews: BlogPreview[];
}

function formatDisplayDate(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;
}

export default function HomeClient({ newsItems, blogPreviews }: HomeClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Background concert photo */}
        <div className="absolute inset-0">
          <Image
            src={assetPath("/images/concert-cherry-blossom.jpg")}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />
        </div>

        <div className="relative z-10 px-4 max-w-5xl mx-auto w-full py-14 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-52 md:w-64 flex-shrink-0"
            >
              <div className="aspect-square rounded-2xl overflow-hidden relative shadow-xl">
                <Image
                  src={assetPath("/images/concert-pink-shirt.jpg")}
                  alt="小西達也"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-foreground/60 text-sm md:text-base tracking-[0.3em] mb-3"
              >
                シンガーソングライター
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-5"
              >
                小西 達也
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-serif text-2xl md:text-4xl text-primary font-bold tracking-wider"
              >
                優しさの種をあなたの心に
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* 最新情報 */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-3">
            最新情報
          </h2>
          <div className="mt-3 mx-auto w-16 h-0.5 bg-primary/40 rounded-full mb-8" />
          <FadeIn>
            <div className="space-y-4">
              {newsItems.length === 0 ? (
                <p className="text-center text-muted">最新情報はありません</p>
              ) : (
                newsItems.map((news, i) => (
                  <Link
                    key={i}
                    href={news.href}
                    {...(news.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block bg-card-bg rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm text-muted">{news.date}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          {news.category}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground">{news.title}</h3>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </FadeIn>
          <div className="mt-8 bg-card-bg rounded-2xl p-6 shadow-sm text-center">
            <p className="text-foreground/70 mb-4">
              最新情報は LINE公式・X (Twitter) でもお知らせしています
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://lin.ee/EBGSoDF"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
                  alt="友だち追加"
                  height="36"
                  className="h-9"
                />
              </a>
              <a
                href="https://x.com/yumeplan_tk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2 rounded-full text-sm font-medium hover:bg-foreground/80 transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* プロフィール概要 */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-3">
            プロフィール
          </h2>
          <div className="mt-3 mx-auto w-16 h-0.5 bg-primary/40 rounded-full mb-8" />
          <FadeIn>
            <div className="bg-card-bg rounded-2xl p-8 md:p-12 shadow-sm text-center">
              <p className="text-foreground/70 leading-relaxed text-lg">
                1962年、兵庫県豊岡市生まれ（姫路市在住）。
                先天性骨形成不全症により幼少から車椅子で生活しながら、
                12歳でギターを手にし、現在は全国各地で
                コンサートや講演活動を行っています。
              </p>
              <Link
                href="/profile"
                className="inline-block mt-6 text-primary hover:text-accent transition-colors font-medium"
              >
                もっと詳しく →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 講演会のお問い合わせ */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-card-bg rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-bold text-xl mb-2">講演会について</h2>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    歌とトークを織り交ぜた独自のスタイルで、
                    学校など幅広い場での講演会を開催しています。
                  </p>
                </div>
                <Link
                  href="/lecture"
                  className="bg-primary text-white px-8 py-3 rounded-full hover:bg-accent transition-colors font-medium whitespace-nowrap"
                >
                  講演会の詳細を見る
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ブログ */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-3">
            ブログ
          </h2>
          <div className="mt-3 mx-auto w-16 h-0.5 bg-primary/40 rounded-full mb-8" />
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPreviews.length === 0 ? (
                <p className="text-center text-muted col-span-2">記事の準備中です</p>
              ) : (
                blogPreviews.map((post, i) => (
                  <Link key={i} href={post.href}>
                    <div className="bg-card-bg rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-xs text-muted mb-2">{post.date}</p>
                      <h3 className="font-bold text-foreground mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-foreground/60 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center mt-8">
            <Link
              href="/blog"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              すべての記事を見る →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-2xl font-bold mb-4">
              お問い合わせ
            </h2>
            <p className="text-foreground/60 mb-8">
              講演会・コンサートのご依頼、その他ご質問など
              お気軽にご連絡ください。
            </p>
            <Link
              href="/contact"
              className="inline-block border border-primary text-primary px-10 py-3 rounded-full hover:bg-primary hover:text-white transition-colors font-medium"
            >
              お問い合わせはこちら
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
