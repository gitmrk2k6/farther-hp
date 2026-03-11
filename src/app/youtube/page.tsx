"use client";

import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";

const youtubeVideos = [
  { id: "az4zlAqe4ig", title: "しらさぎ情歌" },
];

export default function YouTubePage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="YouTube" subtitle="ライブ映像や楽曲をお届けします" />
        </div>
      </section>

      {/* Videos */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* チャンネル紹介 */}
          <FadeIn>
            <div className="bg-card-bg rounded-2xl p-6 md:p-8 shadow-sm mb-10 text-center">
              <p className="text-xs text-muted mb-2">YouTubeチャンネル</p>
              <h3 className="font-serif text-xl font-bold mb-3">小西達也の「歌の枕」</h3>
              <p className="text-sm text-foreground/60 mb-6">
                ライブ映像や楽曲を配信しています。ぜひチャンネル登録をお願いします。
              </p>
              <div className="border-t border-foreground/10 pt-6 mb-6">
                <p className="text-sm text-foreground/50 mb-3">小西達也の「歌の枕」によせて。</p>
                <p className="text-sm text-foreground/70 leading-relaxed max-w-lg mx-auto whitespace-pre-line">{`どこにでもあるような、探してみるとどこにもない…\nそんな歌を歌えたらと思います。\n１行目のフレーズで物語の風景が浮かぶように。\n１冊の短編小説を読み終えるように…。\nそしてあなたとばったり会えたなら、なほよろし。`}</p>
              </div>
              <a
                href="https://www.youtube.com/@tatsuya_konishi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-accent transition-colors font-medium text-sm"
              >
                チャンネルを見る
              </a>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {youtubeVideos.map((video, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card-bg rounded-2xl overflow-hidden shadow-sm">
                  <iframe
                    className="aspect-video w-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-sm">{video.title}</h4>
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* 楽譜ダウンロード */}
            <FadeIn delay={0.2}>
              <div className="bg-card-bg rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col justify-center space-y-5">
                  <h4 className="font-bold text-sm">しらさぎ情歌 楽譜ダウンロード</h4>
                  <div>
                    <p className="font-medium text-sm">カラオケ（Cm）</p>
                    <p className="text-xs text-foreground/60 mt-0.5">オリジナルカラオケ</p>
                    <a
                      href="/pdf/ShirasagiCm.pdf"
                      download
                      className="inline-block mt-2 text-sm text-primary hover:text-accent transition-colors underline"
                    >
                      ShirasagiCm.pdf
                    </a>
                    <p className="text-xs text-muted mt-0.5">PDFファイル 96.2 KB</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">カラオケ（G♯m）</p>
                    <p className="text-xs text-foreground/60 mt-0.5">女性や声の低い男性が歌えるような高さです</p>
                    <a
                      href="/pdf/ShirasagiG%23m_MeloOctDown.pdf"
                      download
                      className="inline-block mt-2 text-sm text-primary hover:text-accent transition-colors underline"
                    >
                      ShirasagiG#m_MeloOctDown.pdf
                    </a>
                    <p className="text-xs text-muted mt-0.5">PDFファイル 97.4 KB</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
