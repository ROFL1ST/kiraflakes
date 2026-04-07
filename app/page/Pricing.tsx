import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import PricingCard from "../components/pricingcard";
import Sheet from "../assets/sheet.jpg";
import Chibi from "../assets/Chibi.png";
import Chibi1 from "../assets/Chibi1.png";
import Chibi3 from "../assets/Chibi3.png";
import Chibi2 from "../assets/FullBodyChibi.png";
import Chibi4 from "../assets/FullBodyChibi1.png";
import Chibi5 from "../assets/FullBodyChibi2.png";
import Chibi6 from "../assets/FullBodyChibi2x1.png";
import CSK1 from "../assets/ColouredSketch.png";
import CSK2 from "../assets/ColouredSketch1.png";
import CSK3 from "../assets/ColouredSketch2.png";
import Ils1 from "../assets/ilustration.png";
import Ils2 from "../assets/Illustration3x.png";


import { useState } from "react";

export default function Pricing() {
  const [index, setIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [images, setImages] = useState<(StaticImageData | string)[]>([]);
  const gallery1 = [ Ils1, Ils2, CSK1, CSK2, CSK3];
  const gallery2 = [Chibi, Chibi1, Chibi2, Chibi3, Chibi4, Chibi5, Chibi6];
  const gallery3 = [Sheet,];
  const openGallery = (gallery: (StaticImageData | string)[]) => {
    setImages(gallery);
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
      {/* <motion.section
        id="pricing"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="text-gray-600 bg-white body-font"
      > */}
      <section
        id="pricing"
        className="text-gray-600 body-font bg-white overflow-hidden"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              {/* STOP CLICK BIAR GA KE CLOSE */}
              <div onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.8}
                      onDragEnd={(e, info) => {
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
                        alt="gallery"
                        width={800}
                        height={800}
                        className="rounded-lg max-h-[80vh] object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* ⬅️ PREV */}
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
                  >
                    ‹
                  </button>

                  {/* ➡️ NEXT */}
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
                  >
                    ›
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* MODAL */}
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Commission Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
              Looking for unique and personalized artwork? You’re in the right
              place. Order now and let me create something special just for you.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <PricingCard
              title="Illustration Showcase"
              subtitle="ILLUSTRATION"
              description="I will draw your character >:3"
              image={Ilus}
              note="Background price depends on complexity."
              prices={[
                { label: "Headshot", price: "65k / $15" },
                { label: "Bust-up", price: "100k / $20" },
                { label: "Half Body", price: "135k / $23" },
                { label: "Thigh-up", price: "175k / $35" },
                { label: "Full Body", price: "200k / $40" },
              ]}
              onClick={() => openGallery(gallery1)}
            />
            <PricingCard
              title="Illustration Showcase"
              subtitle="CHIBIS!!!!!"
              description="I love drawing chibis and I can make one for you!!"
              image={Chibi}
              popular
              buttonColor="#6366F1"
              prices={[
                { label: "Bust-up", price: "40k / $10" },
                { label: "Full Body", price: "65k / $15" },
              ]}
              onClick={() => openGallery(gallery2)}
            />
            <PricingCard
              title="Illustration Showcase"
              subtitle="CHARACTER SHEET"
              description="a full body of your character with 1-2 props and a full body chibi of ur chara !!"
              image={Sheet}
              // buttonColor="#9CA3AF"
              prices={[
                { label: "Local", price: "250k" },
                { label: "International", price: "$50" },
              ]}
              onClick={() => openGallery(gallery3)}
            />
          </div>
        </div>
      </section>
      {/* </motion.section> */}
    </>
  );
}
