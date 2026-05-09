"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Headshot from "@/app/assets/Headshotchibi.png";
import Ilust2 from "@/app/assets/ilust2.png";

export default function Tnc({ data }: { data: any[] }) {
  return (
    <>
      <section id="Tnc" className="text-white body-font bg-[#E36464]">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-white">
              Term & Condition
            </h1>
          </div>
          <div className="flex flex-wrap w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              {data.map((item, idx) => (
                <div key={idx} className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                  </div>
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-[#E36464] relative z-10 font-bold">
                    {idx + 1}
                  </div>
                  <div className="grow pl-4">
                    <h2 className="font-medium title-font text-sm mb-1 tracking-wider uppercase">
                      {item.title}
                    </h2>
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-3/5 md:w-1/2 flex flex-col gap-4">
              <div className="overflow-hidden rounded-lg">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Image
                    priority
                    width={600}
                    height={600}
                    src={Headshot}
                    alt="Headshot chibi illustration"
                    className="w-full object-cover object-center"
                  />
                </motion.div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <motion.video
                  src="/Zetanap.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
