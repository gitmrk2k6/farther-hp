"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import { assetPath } from "@/lib/path";

export default function ProfilePage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="プロフィール" subtitle="これまでの歩みと活動についてご紹介します" />
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-10 items-stretch">
              {/* Photo */}
              <div className="w-full md:w-1/3 flex-shrink-0">
                {/* スマホ: 上を少し切る */}
                <div className="md:hidden relative aspect-[3/4] bg-section-alt rounded-2xl overflow-hidden">
                  <Image
                    src={assetPath("/images/portrait-outdoor.jpg")}
                    alt="小西達也"
                    fill
                    className="object-cover object-[center_30%]"
                    sizes="100vw"
                  />
                </div>
                {/* PC: テキストの高さに合わせて上を切る */}
                <div className="hidden md:block relative h-full bg-section-alt rounded-2xl overflow-hidden">
                  <Image
                    src={assetPath("/images/portrait-outdoor.jpg")}
                    alt="小西達也"
                    fill
                    className="object-cover object-bottom"
                    sizes="33vw"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-bold mb-4">
                  小西 達也
                </h3>
                <div className="space-y-4 text-foreground/70 leading-relaxed">
                  <p>
                    1962年6月27日、兵庫県豊岡市生まれ（姫路市在住）。先天性骨形成不全症により、幼少期より車椅子での生活。
                  </p>
                  <p>
                    小・中学校時代は親元を離れ、神戸市の療育センターで治療を受けながら隣接した養護学校にて義務教育を受ける。12歳の頃、70年代フォークソングに魅了されギターの練習を始める。
                  </p>
                  <p>
                    養護学校高等部時代よりシンガーソングライターとしての活動を開始し、オリジナル曲の創作とコンサート活動をスタート。佛教大学社会学部社会福祉学科に進学し、4年間京都で下宿生活を送る。
                  </p>
                  <p>
                    卒業後、姫路市のコンピューター会社、神戸市の印刷・イベント企画会社でサラリーマンとして勤務。1990年、長男の誕生を機に独立。以来、全国各地でコンサート・講演活動を展開している。
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Activity */}
          <FadeIn delay={0.15}>
            <div className="mt-16 bg-section-alt rounded-2xl p-8 md:p-10 text-center">
              <h3 className="font-serif text-xl font-bold mb-4">
                活動内容
              </h3>
              <p className="text-foreground/70 leading-relaxed max-w-xl mx-auto">
                歌とトークを織り交ぜた独自のスタイルで、全国各地でコンサート・講演活動を行っています。
                学校、福祉施設、企業研修、文化祭など幅広い場に出向き、
                小規模な集まりからホール公演まで対応しています。
              </p>
            </div>
          </FadeIn>

          {/* Timeline / History */}
          <FadeIn delay={0.2}>
            <div className="mt-16">
              <h3 className="font-serif text-xl font-bold mb-8 text-center">
                活動の歩み
              </h3>
              <div className="space-y-6">
                {[
                  { year: "1962", text: "兵庫県豊岡市に生まれる" },
                  { year: "1974", text: "12歳で70年代フォークソングに出会い、ギターを始める" },
                  { year: "1978", text: "養護学校高等部時代、シンガーソングライターとして活動開始" },
                  { year: "1982", text: "佛教大学社会学部社会福祉学科に進学（京都）" },
                  { year: "1986", text: "大学卒業後、姫路市のコンピューター会社、神戸市の印刷・イベント企画会社でサラリーマンとして勤務" },
                  { year: "1990", text: "長男の誕生を機に独立。全国でのコンサート・講演活動を本格始動" },
                  { year: "現在", text: "全国各地でコンサート・講演活動を続ける" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-6 items-start border-l-2 border-primary/20 pl-6"
                  >
                    <span className="font-serif font-bold text-primary text-lg min-w-[4rem]">
                      {item.year}
                    </span>
                    <p className="text-foreground/70">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
