"use client";

import { useMemo, useState } from "react";
import Stars from "@/components/ui/Stars";
import { reviews } from "@/lib/data/reviews";

function ArrowLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GoogleReviewsSlider() {
  const [index, setIndex] = useState(0);
  const total = reviews.length;

  const active = reviews[index];

  const prevIndex = useMemo(() => (index - 1 + total) % total, [index, total]);
  const nextIndex = useMemo(() => (index + 1) % total, [index, total]);

  const prev = () => setIndex((p) => (p - 1 + total) % total);
  const next = () => setIndex((p) => (p + 1) % total);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Google Yorumları</h2>
            <p className="mt-2 text-sm opacity-80">
              Öne çıkan yorum önde, diğerleri arkada premium katman görünümü.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Önceki yorum"
              className="rounded-xl border px-3 py-2 hover:opacity-90"
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={next}
              aria-label="Sonraki yorum"
              className="rounded-xl border px-3 py-2 hover:opacity-90"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
          {/* Sol bilgi */}
          <div className="rounded-2xl border p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm opacity-70">Ortalama</p>
                <p className="mt-1 text-3xl font-semibold">4.9</p>
              </div>
              <div className="text-right">
                <Stars value={5} />
                <p className="mt-2 text-xs opacity-70">Google üzerinden</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="#iletisim"
                className="rounded-xl border px-4 py-2 text-sm hover:opacity-90"
              >
                Randevu Al
              </a>
              <a
                href="#"
                className="rounded-xl border px-4 py-2 text-sm hover:opacity-90"
              >
                Google’da Gör
              </a>
            </div>
          </div>

          {/* Sağ stacked cards */}
          <div className="relative h-[340px]">
            {/* Arkadaki kart 1 (önceki) */}
            <div className="absolute inset-0 translate-y-8 rotate-[-6deg] rounded-2xl border bg-black/15 backdrop-blur-sm p-6 opacity-60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{reviews[prevIndex].name}</p>
                  <p className="text-xs opacity-70">{reviews[prevIndex].time}</p>
                </div>
                <Stars value={reviews[prevIndex].rating} />
              </div>
              <p className="mt-4 text-sm opacity-80 line-clamp-3">{reviews[prevIndex].text}</p>
            </div>

            {/* Arkadaki kart 2 (sonraki) */}
            <div className="absolute inset-0 translate-y-4 rotate-[5deg] rounded-2xl border bg-black/20 backdrop-blur-sm p-6 opacity-70">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{reviews[nextIndex].name}</p>
                  <p className="text-xs opacity-70">{reviews[nextIndex].time}</p>
                </div>
                <Stars value={reviews[nextIndex].rating} />
              </div>
              <p className="mt-4 text-sm opacity-80 line-clamp-3">{reviews[nextIndex].text}</p>
            </div>

            {/* Öndeki kart (aktif) */}
            <div className="absolute inset-0 rounded-2xl border bg-black/35 backdrop-blur-md p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{active.name}</p>
                  <p className="text-xs opacity-70">{active.time}</p>
                </div>
                <Stars value={active.rating} />
              </div>

              <p className="mt-5 text-sm leading-relaxed opacity-90">{active.text}</p>

              <div className="mt-6 flex items-center gap-2 text-xs opacity-70">
                <span className="rounded-full border px-2 py-1">Google</span>
                <span>•</span>
                <span>Doğrulanmış yorum</span>
                <span className="ml-auto opacity-70">{index + 1}/{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}