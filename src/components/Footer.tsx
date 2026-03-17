import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Logo & Description */}
          <div className="md:w-1/3">
            <h3 className="font-serif text-xl font-bold text-background mb-3">
              小西 達也
            </h3>
            <p className="text-sm leading-relaxed text-background/60">
              シンガーソングライター<br />小西達也 公式ウェブサイト
            </p>
          </div>

          {/* Navigation - 2 columns */}
          <div className="flex-1">
            <h4 className="font-bold text-background mb-4 text-sm">
              ページ一覧
            </h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
              {[
                { href: "/profile", label: "プロフィール" },
                { href: "/music", label: "CD" },
                { href: "/lecture", label: "講演会" },
                { href: "/youtube", label: "YouTube" },
                { href: "/events", label: "コンサート情報" },
                { href: "/gallery", label: "写真" },
                { href: "/blog", label: "ブログ" },
                { href: "/contact", label: "お問い合わせ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SNS */}
          <div>
            <h4 className="font-bold text-background mb-4 text-sm">SNS</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/@tatsuya_konishi"
                  className="hover:text-primary-light transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/yumeplan_tk"
                  className="hover:text-primary-light transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://lin.ee/Jz0Vqk1"
                  className="hover:text-primary-light transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LINE公式
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/10 text-center text-xs text-background/40">
          <p>&copy; {new Date().getFullYear()} 小西達也. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
