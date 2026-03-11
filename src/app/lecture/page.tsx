"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { assetPath } from "@/lib/path";

const lectureFeatures = [
  {
    title: "トーク&コンサート形式",
    description:
      "ただ話すだけの講演ではなく、歌とトークを織り交ぜた独自のスタイル。参加者の心に直接届く体験をお届けします。",
  },
  {
    title: "2,500本以上の実績",
    description:
      "全国各地で2,500本を超えるコンサート・講演の実績があります。学校、福祉施設、企業など幅広い会場での経験が豊富です。",
  },
  {
    title: "幅広い対象に対応",
    description:
      "小学校から高校、保護者向け、企業研修まで、対象に合わせた内容で講演いたします。",
  },
];


export default function LecturePage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            講演会について
          </h1>
          <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
            歌とトークを織り交ぜた独自のスタイルで、学校・福祉施設・企業研修・文化祭など幅広い場で講演を行っています。
          </p>
          <div className="mt-5 mx-auto w-16 h-0.5 bg-primary/40 rounded-full" />
          <FadeIn>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                <Image
                  src={assetPath("/images/lecture-school-hall.jpg")}
                  alt="学校での講演会"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                <Image
                  src={assetPath("/images/lecture-school-gym.jpg")}
                  alt="体育館での講演会"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                <Image
                  src={assetPath("/images/lecture-children.jpg")}
                  alt="子ども達への講演"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Message - 小西さんの想い */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="space-y-6 text-foreground/80 leading-loose text-base md:text-lg">
              <p>
                たくさんの学校にもおじゃましている。今の子ども達に語りかけながら、その向こうにいる50年後100年後の子ども達を感じている。昔まだレコードの時代、一枚のＬＰレコードは約45分。それを聴き終えた瞬間、心の中に新しい風が吹いていた。子ども達との関わりは約60分…感じてほしい新しい風がある。
              </p>
              <p>
                たとえ何百人を前にしても「一人」を意識して語りかけている。「１×人数」ということだ。そうすると「１」と「１」がつながってくる。「僕と話したみたい」「私に話してくれたみたい」終わった後、そう感じてくれたらうれしい。
              </p>
              <p>
                親であるということは、『責任』でもあり『エネルギー』でもある。親として言うべき事は言い、すべきことはする。そうして一緒に成長していけたらいいと思う。「対話」は家庭をあたためる燃料だと言った人がいる。もちろん燃料が不足してくると冷えこんでくる。理屈ではない。大切なのは「体温」の伝わりだ。
              </p>
              <p className="text-center font-serif text-xl md:text-2xl text-primary font-bold tracking-wider mt-8">
                　　　　ぬくもり<br />
                僕は歌で「体温」をとどけることができるだろうか・・・。<br />
                そんな歌が歌いたい。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl font-bold mb-10 text-center">
            講演の特徴
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lectureFeatures.map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card-bg rounded-2xl p-6 shadow-sm h-full">
                  <h4 className="font-bold text-lg mb-3 text-primary">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ホール・体育館 */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h3 className="font-serif text-lg md:text-2xl font-bold mb-6 text-center">
              ホール・体育館のコンサート・講演会
            </h3>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                基本的に音響機材一式（オペレーター同行）はこちらから持込みといたします。（機材の揃っているホールの場合はオペレーターのみの同行もあります）
              </p>
              <p>
                会の規模によって（広さ、場所、人数）機材の量やスタッフの人数が異なります。その場合、準備に必要な時間や費用にもちがいが発生しますので、その都度どのような会であるかを細かくお聞かせ下さい。尚、照明、美術についてもご要望がありましたら承ります。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 小規模 */}
      <section className="py-16 px-4 bg-section-alt">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h3 className="font-serif text-lg md:text-2xl font-bold mb-6 text-center">
              小規模のコンサート・講演会
            </h3>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                人数が３０〜５０人程度の小さな会も行っています。ちょっとしたサークルの集会、学習会、あるいは会社、喫茶店やお寺さんなど・・・。このような会はなるべく費用がかからないように、小西が簡単な音響機材を車に積み込んで、自ら運転して一人で現地に伺っています。そのために荷物の積み降ろしなど、主催者の方にお手伝いして頂かなければならないこともありますけど・・・。そんな感じでよければ、いつでも呼んで下さい。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Flow */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h3 className="font-serif text-2xl font-bold mb-8 text-center">
              ご依頼の流れ
            </h3>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "お問い合わせ",
                  text: "お電話、FAX、メール、またはお問い合わせフォームよりご連絡ください。ご希望の日時、会場、対象者、テーマなどをお知らせいただければ幸いです。",
                },
                {
                  step: "2",
                  title: "お打ち合わせ",
                  text: "ご要望に合わせた講演内容をご提案いたします。テーマや時間、演奏曲目など柔軟に対応いたします。",
                },
                {
                  step: "3",
                  title: "講演当日",
                  text: "歌とトークを織り交ぜた、心に届く講演をお届けします。",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-6 items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-section-alt">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h3 className="font-serif text-2xl font-bold mb-4">
              講演のご依頼・ご相談
            </h3>
            <p className="text-foreground/60 mb-8">
              講演内容、出演料、日程など、
              お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-10 py-4 rounded-full hover:bg-accent transition-colors font-medium text-lg"
            >
              お問い合わせはこちら
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
