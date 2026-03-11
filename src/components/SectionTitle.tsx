import type { ReactNode } from "react";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <div className="text-center">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-5 mx-auto w-16 h-0.5 bg-primary/40 rounded-full" />
    </div>
  );
}
