"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import PricingCard from "../pricingcard";
import { useState } from "react";

export default function Pricing({ data }: { data: any[] }) {
  const [index, setIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [images, setImages] = useState<(StaticImageData | string)[]>([]);

  const openGallery = (gallery: (StaticImageData | string)[]) => {
    // Filter gambar kosong sebelum dibuka
    const filtered = gallery.filter((img) => !!img);
    if (filtered.length === 0) return; // Jangan buka modal kalau tidak ada gambar
    setImages(filtered);
    setIndex(0);
    setIsOpen(true);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <section
        id="pricing"
        className="text-gray-600 body-font bg-white overflow-hidden"
      >
        {/* ── MODAL GALLERY ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.8}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -100) next();
                        if (info.offset.x > 100) prev();
                      }}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={images[index]}
                        alt={`gallery ${index + 1}`}
                        width={800}
                        height={800}
                        className="rounded-lg max-h-[80vh] object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* ⬅️ PREV — hanya tampil kalau lebih dari 1 gambar */}
                  {images.length > 1 && (
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
                    >
                      ‹
                    </button>
                  )}

                  {/* ➡️ NEXT — hanya tampil kalau lebih dari 1 gambar */}
                  {images.length > 1 && (
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
                    >
                      ›
                    </button>
                  )}

                  {/* ── DOT INDICATOR ── */}
                  {images.length > 1 && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === index
                              ? "bg-white scale-125"
                              : "bg-white/40 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CONTENT ── */}
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Commission Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
              Looking for unique and personalized artwork? You're in the right
              place. Order now and let me create something special just for you.
            </p>
          </div>

          <div className="flex flex-wrap -m-4">
            {data.map((item, idx) => (
              <PricingCard
                key={idx}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                image={item.image_urls?.[0] ?? ""} 
                note={item.note}
                prices={item.prices}
                popular={item.popular}
                buttonColor={item.button_color}
                onClick={() => openGallery(item.image_urls ?? [])}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}