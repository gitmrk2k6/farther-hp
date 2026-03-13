"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import { assetPath } from "@/lib/path";

const photos = [
  { src: assetPath("/images/portrait-outdoor.jpg"), alt: "プロフィール" },
  { src: assetPath("/images/concert-pink-shirt.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-cherry-blossom.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-golden-curtain.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-rainbow.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-green.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-blue-curtain.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-red-spotlight.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-purple-stage.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-dramatic.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-warm-closeup.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-purple-smile.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-singing.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-blue-medium.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-side-profile.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-blue.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-orange.jpg"), alt: "コンサート" },
  { src: assetPath("/images/concert-side-dark.jpg"), alt: "コンサート" },
  { src: assetPath("/images/lecture-venue.jpg"), alt: "講演会" },
];

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="写真" subtitle="チラシやポスターなどの製作にお使いください" />
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="aspect-square bg-section-alt rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer relative">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
