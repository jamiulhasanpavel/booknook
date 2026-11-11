
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    eyebrow: "A WORLD OF STORIES",
    title: "Discover Your Next Favorite Book",
    description:
      "Explore beautiful stories, inspiring ideas and unforgettable journeys. Your next great read is waiting here.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  },
  {
    eyebrow: "READ. LEARN. GROW.",
    title: "Knowledge Begins With One Page",
    description:
      "Find books that inspire your imagination, expand your knowledge and bring new perspectives into your life.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
  },
  {
    eyebrow: "SHARE THE LOVE OF READING",
    title: "Borrow Books, Create Memories",
    description:
      "Discover wonderful books and enjoy reading without limits. Make every reading moment meaningful.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative overflow-hidden bg-[#172B3A]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="booknook-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div
              className="relative flex min-h-[570px] items-center bg-cover bg-center md:min-h-[650px]"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(15,32,45,0.95) 0%, rgba(15,32,45,0.82) 48%, rgba(15,32,45,0.25) 100%), url('${slide.image}')`,
              }}
            >
              <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10">
                <div className="max-w-2xl">

                  <div className="mb-7 flex items-center gap-3">
                    <span className="h-px w-12 bg-[#D9B779]" />
                    <span className="text-xs font-semibold tracking-[4px] text-[#D9B779]">
                      {slide.eyebrow}
                    </span>
                  </div>

                  <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mt-7 max-w-xl text-sm leading-8 text-gray-300 md:text-base">
                    {slide.description}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-3 rounded-full bg-[#D9B779] px-8 py-4 text-sm font-bold text-[#172B3A] transition hover:bg-white"
                    >
                      Browse Books
                      <ArrowRight size={18} />
                    </Link>

                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <BookOpen size={19} className="text-[#D9B779]" />
                      <span>Discover. Read. Enjoy.</span>
                    </div>
                  </div>

                  <p className="mt-12 text-xs tracking-[3px] text-white/50">
                    0{index + 1} / 03
                  </p>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
