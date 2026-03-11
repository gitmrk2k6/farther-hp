"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import { assetPath } from "@/lib/path";

// TODO: 小西さんに今後のコンサート情報を確認して更新
const upcomingConcerts: {
  date: string;
  title: string;
  venue: string;
  description: string;
}[] = [];


export default function EventsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            title="コンサート情報"
            subtitle="最新のコンサート・ライブ情報をお届けします"
          />
          <FadeIn>
            <div className="mt-8 rounded-2xl overflow-hidden relative aspect-[16/7] max-w-3xl mx-auto">
              <Image
                src={assetPath("/images/concert-golden-curtain.jpg")}
                alt="コンサートの様子"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Upcoming Concerts */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl font-bold mb-8 text-center">
            今後のコンサート
          </h3>
          <div className="space-y-6">
            {upcomingConcerts.length === 0 && (
              <FadeIn>
                <div className="bg-card-bg rounded-2xl p-8 shadow-sm text-center">
                  <p className="text-foreground/50 mb-2">
                    現在、予定されているコンサートはありません
                  </p>
                  <p className="text-sm text-foreground/40">
                    最新情報はブログやSNSでお知らせします。
                  </p>
                </div>
              </FadeIn>
            )}
            {upcomingConcerts.map((concert, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card-bg rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-32 flex-shrink-0">
                      <p className="font-serif text-lg font-bold text-primary">
                        {concert.date}
                      </p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{concert.title}</h4>
                      <p className="text-sm text-muted mb-2">{concert.venue}</p>
                      <p className="text-sm text-foreground/60">
                        {concert.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
