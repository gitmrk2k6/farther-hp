"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";

const photos = [
  { src: "/images/concert-rainbow.jpg", alt: "コンサート" },
  { src: "/images/concert-green.jpg", alt: "コンサート" },
  { src: "/images/concert-old-photo.jpg", alt: "コンサート" },
  { src: "/images/concert-blue-curtain.jpg", alt: "コンサート" },
  { src: "/images/concert-red-spotlight.jpg", alt: "コンサート" },
  { src: "/images/concert-purple-stage.jpg", alt: "コンサート" },
  { src: "/images/concert-dramatic.jpg", alt: "コンサート" },
  { src: "/images/concert-warm-closeup.jpg", alt: "コンサート" },
  { src: "/images/concert-purple-smile.jpg", alt: "コンサート" },
  { src: "/images/concert-singing.jpg", alt: "コンサート" },
  { src: "/images/concert-blue-medium.jpg", alt: "コンサート" },
  { src: "/images/concert-side-profile.jpg", alt: "コンサート" },
  { src: "/images/concert-blue.jpg", alt: "コンサート" },
  { src: "/images/concert-orange.jpg", alt: "コンサート" },
  { src: "/images/concert-side-dark.jpg", alt: "コンサート" },
  { src: "/images/lecture-venue.jpg", alt: "講演会" },
];

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="写真" subtitle="コンサートや講演会の様子" />
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
