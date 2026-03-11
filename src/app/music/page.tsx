"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import type { ReactNode } from "react";
import { assetPath } from "@/lib/path";

const albums: {
  title: ReactNode;
  subtitle?: string;
  alt: string;
  src: string;
  note?: string;
  price?: string;
  tracks: string[];
}[] = [
  {
    title: <>しらさぎ<ruby>情歌<rp>(</rp><rt>じょうか</rt><rp>)</rp></ruby></>,
    alt: "しらさぎ情歌",
    src: assetPath("/images/cd-shirasagi.jpg"),
    note: "30周年記念の第2弾として、初めてのご当地ソングを作ってみました。\nしかも昭和の歌謡曲仕立てです(笑)\n歌以外にオリジナルキーのカラオケ(Cm)と女性や声の低い男性が歌えるような高さのカラオケ(G♯m)も録音されています。\n覚えて歌ってみてください。歌い終わったら、サンキュー！と叫ばねばなりません(笑)\n\n♪しらさぎ情歌の楽譜が必要な方はYouTubeのページから自由にダウンロードしてください。",
    price: "¥500（税込）",
    tracks: [],
  },
  {
    title: "夢の残り火",
    subtitle: "30th Anniversary Album",
    alt: "夢の残り火",
    src: assetPath("/images/cd-yume-no-nokoribi.jpg"),
    price: "¥2,000（税込）",
    tracks: [
      "トイレの小窓",
      "華の鏡",
      "花をたやさずに",
      "手あて",
      "猫の耳に風",
      "夏の風邪",
      "ピエロ",
      "雑巾と五線紙",
      "時を越えて",
    ],
  },
  {
    title: "風の吹く坂道",
    alt: "風の吹く坂道",
    src: assetPath("/images/cd-kaze-no-fuku-sakamichi.jpg"),
    price: "¥2,000（税込）",
    tracks: [
      "お兄ちゃんはずるい",
      "裏庭には",
      "冷たい夜",
      "恋唄",
      "金喰い虫のララバイ",
      "耳をすまして",
      "ねがい",
      "さようなら",
      "遺言",
      "かたつむり",
    ],
  },
  {
    title: "小曲集Ⅱ「書簡」",
    alt: "小曲集Ⅱ 書簡",
    src: assetPath("/images/cd-shokyokushu-2.jpg"),
    price: "¥1,000（税込）",
    note: "※現在品切れです",
    tracks: [
      "夢の行方",
      "予感",
      "小さな家",
      "帰港",
      "哀しいしあわせ",
    ],
  },
  {
    title: "小曲集Ⅰ",
    alt: "小曲集Ⅰ",
    src: assetPath("/images/cd-shokyokushu.jpg"),
    price: "¥1,000（税込）",
    note: "※現在品切れです",
    tracks: [
      "風のアスリート",
      "振り向けば",
      "ずっと",
      "生命のふるさと",
    ],
  },
  {
    title: "心の響き",
    alt: "心の響き",
    src: assetPath("/images/cd-kokoro-no-hibiki.jpg"),
    price: "¥2,000（税込）",
    tracks: [
      "力を抜いて",
      "心のうた",
      "卒業前夜",
      "いつまでも忘れない",
      "かなしい恋",
      "指きり",
      "静かな午後に",
      "きみの誕生日",
      "今日もどこかで",
      "花をたやさずに",
      "君に話したいこと 〜もうひとりの自分より〜",
      "一羽のふくろう",
      "蝉",
    ],
  },
  {
    title: <><ruby>生命<rp>(</rp><rt>いのち</rt><rp>)</rp></ruby>の<ruby>詩<rp>(</rp><rt>うた</rt><rp>)</rp></ruby></>,
    alt: "生命の詩",
    src: assetPath("/images/cd-inochi-no-uta.jpg"),
    note: "1995〜99年に発表したシングルCDをまとめたものです",
    price: "¥2,000（税込）",
    tracks: [
      "山吹色のセーター",
      "ゆめ",
      "お兄ちゃんはずるい",
      "歩きはじめた君達へ",
      "ときめき色",
      "雨",
      "空への郵便",
      "悩みの種",
      "残されたランドセル",
      "祈り",
      "いちばん星",
      "ねがい",
      "そんな年頃",
      "すやすやとすくすくと",
    ],
  },
];

export default function MusicPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="CD" subtitle="在庫がなくなり次第販売は終了します。その際はご了承ください。" />
        </div>
      </section>

      {/* Albums */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          {albums.map((album, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-card-bg rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
                  <div className="w-full sm:w-56 md:w-64 flex-shrink-0">
                    <div className="aspect-square rounded-xl overflow-hidden relative shadow-sm">
                      <Image
                        src={album.src}
                        alt={album.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 256px"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-2xl font-bold mb-1">
                      {album.title}
                    </h4>
                    {album.subtitle && (
                      <p className="text-sm text-foreground/50">{album.subtitle}</p>
                    )}
                    {album.tracks.length > 0 && (
                      <div className="text-sm text-foreground/60 leading-relaxed mt-4">
                        <p className="text-xs font-medium text-muted mb-2">収録曲</p>
                        <ol className="space-y-0.5 list-decimal list-inside">
                          {album.tracks.map((track, j) => (
                            <li key={j}>{track}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {album.note && (
                      <p className="text-sm text-muted mt-4 leading-relaxed whitespace-pre-line">{album.note}</p>
                    )}
                    {album.price && (
                      <p className="text-base font-bold text-primary mt-4">{album.price}</p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 購入方法 */}
      <section className="py-16 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-card-bg rounded-2xl p-8 md:p-10 shadow-sm">
              <h3 className="font-serif text-2xl font-bold mb-6 text-center">
                CDの購入方法
              </h3>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  購入ご希望の方は、郵便番号・住所・氏名・電話番号・CDタイトル・枚数をメール、またはお問い合わせフォームよりご連絡ください。
                </p>
                <div className="space-y-2">
                  <p>
                    Eメール：
                    <a href="mailto:yumeplan1962@ezweb.ne.jp" className="text-primary hover:text-accent transition-colors">
                      yumeplan1962@ezweb.ne.jp
                    </a>
                  </p>
                  <p>
                    お問い合わせフォームは<Link href="/contact" className="text-primary hover:text-accent transition-colors underline">こちら</Link>
                  </p>
                  <p>TEL・FAXでも申し込めます。</p>
                  <p className="font-medium">079-235-6185　ゆめぷらん事務局　小西</p>
                </div>
                <div className="border-t border-foreground/10 pt-4 mt-4 space-y-2 text-sm text-muted">
                  <p>※送付に関わる費用（送料等）…枚数に関わらず一律200円</p>
                  <p className="ml-3">お支払いは商品到着後同封の郵便振替用紙にて送金してください。</p>
                  <p>※注文されてから10日以上経過しても届かない場合は、申し訳ありませんが再度ご連絡ください。</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
