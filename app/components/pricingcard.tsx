"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

type PriceItem = {
  label: string;
  price: string;
};

type PricingCardProps = {
  title: string;
  subtitle: string;
  description: string;
  prices: PriceItem[];
  image: StaticImageData;
  note?: string;
  buttonColor?: string;
  popular?: boolean;
};

const imageVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.05,
    transition: { type: "spring" as const, stiffness: 120 },
  },
};

export default function PricingCard({
  title,
  subtitle,
  description,
  prices,
  image,
  note,
  buttonColor = "#E36464",
  popular = false,
}: PricingCardProps) {
  return (
    <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
      <motion.div
        className="relative h-full pt-20 p-6 rounded-lg border-2 border-gray-300 flex flex-col justify-between overflow-visible"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* BADGE */}
        {popular && (
          <span className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
            POPULAR
          </span>
        )}

        {/* CONTENT */}
        <div className="flex gap-4">
          {/* LEFT */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#E36464] mb-2">
              {title}
            </h2>

            <h3 className="text-gray-800 font-bold mb-2">{subtitle}</h3>

            <p className="text-gray-600 mb-4">{description}</p>

            {/* TABLE */}
            <div className="border border-red-400 w-fit">
              {prices.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between gap-6 p-2 ${
                    i !== prices.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span>{item.label}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>

            {note && <p className="text-sm text-gray-500 mt-3">{note}</p>}
          </div>

          {/* RIGHT IMAGE (FIX POSITION) */}
          {/* 🔥 BACKGROUND GLOW */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <div className="w-32 h-32 bg-[#E36464]/50 rounded-full blur-2xl"></div>
          </motion.div>

          {/* 🖼️ FLOATING IMAGE */}
          <motion.div
            variants={imageVariants}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <Image
              src={image}
              alt="character"
              width={140}
              height={240}
              className="object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* BUTTON ALWAYS BOTTOM */}
        <button
          style={{ backgroundColor: buttonColor }}
          className="mt-6 w-full z-10 text-white py-2 rounded hover:opacity-90 transition"
        >
          See More →
        </button>
      </motion.div>
    </div>
  );
}
