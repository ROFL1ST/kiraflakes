"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Showcase({ data }: { data: any[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  return (
    
    // <motion.section
    //   id="showcase"
    //   initial={{ opacity: 0, y: 50 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.8, ease: "easeInOut" }}
    //   viewport={{ once: true }}
    //   className="text-gray-600 bg-white body-font"
    // >
    <section id="showcase" className="text-gray-600 bg-white body-font">
      {/* MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* IMAGE */}
            <motion.img
              src={selectedImage}
              alt="preview"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // biar tidak close kalau klik gambar
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* MODAL */}
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            Showcase of my works!
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            A curated collection of my creative works, showcasing my passion for
            design, detail, and visual storytelling. Each piece reflects my
            exploration of ideas, techniques, and artistic expression..
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item, idx) => (
            <div key={idx} className="w-full">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer h-full"
                onClick={() => setSelectedImage(item.image_url)}
              >
                <img
                  src={item.image_url}
                  alt={item.alt_text || "gallery"}
                  className="w-full h-full object-cover rounded-lg aspect-square"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
    // </motion.section>
  );
}
