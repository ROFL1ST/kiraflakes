"use client";
import { motion, AnimatePresence } from "framer-motion";
import {useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Kai1 from "../assets/Showcase/Kai_Comm21.png";
import HNY from "../assets/Showcase/HNY.png";
import Chibi1 from "../assets/Chibi.png";
import Chibi2 from "../assets/Chibi1.png";
import Porto1 from "../assets/Showcase/Portfo1.png";
import Porto2 from "../assets/Showcase/Portfo2.png";
import Sketch from "../assets/ColouredSketch.png";


export default function Showcase() {
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);


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
              src={selectedImage.src}
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
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
             <motion.div
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(Chibi1)}
              >
                <Image
                  width={600}
                  height={600}
                  src={Chibi1}
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg"
                />
              </motion.div>
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(Kai1)}
              >
                <Image
                  width={600}
                  height={600}
                  src={Kai1}
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg"
                />
              </motion.div>
            </div>
            <div className="md:p-2 p-1 w-full">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(Porto1)}
              >
                <Image
                  width={600}
                  height={600}
                  src={Porto1}
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                />
              </motion.div>
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(Porto2)}
              >
                <Image
                  width={600}
                  height={600}
                  src={Porto2}
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg"
                />
              </motion.div>
            </div>
            <div className="md:p-2 p-1 w-1/2">
             <motion.div
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(Sketch)}
              >
                <Image
                  width={600}
                  height={600}
                  src={Sketch}
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg"
                />
              </motion.div>
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(Chibi2)}
              >
                <Image
                  width={600}
                  height={600}
                  src={Chibi2}
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // </motion.section>
  );
}
