import Image from "next/image";
import Gaci from "../assets/ganciyoko.png";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function Rules() {
  const items = [
    {
      title: "I will draw.",
      desc: [
        { text: "Anime Artstyle", type: "ok" },
        { text: "Couples / Yumeship", type: "ok" },
        { text: "Kemonomimi / Nekomimi", type: "ok" },
        { text: "Any Gender", type: "ok" },
        { text: "Complex Character", type: "ok" },
      ],
    },
    {
      title: "I will not draw (or Discuss first).",
      desc: [
        { text: "NSFW", type: "no" },
        { text: "Furry", type: "no" },
        { text: "Mecha / Heavy Armor", type: "no" },
        { text: "Muscular Characters", type: "no" },
        { text: "Real Life People (will be simplified)", type: "no" },
      ],
    },
  ];
  return (
    // <motion.section
    //   id="rules"
    //   initial={{ opacity: 0, y: 50 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.8, ease: "easeInOut" }}
    //   viewport={{ once: true }}
    //   className="text-gray-600 bg-white body-font"
    // >
    <section id="rules">
      <div className="overflow-hidden h-full bg-[#E36464] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-white">
                  Please Read me!
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                  Rules
                </p>
                <p className="mt-6 text-lg/8 text-white">
                  I do my comms slowly because i am currently studying at uni
                  and recovering from an illness but i always try to finish the
                  comm whenever im free, so thank you for being patient{" "}
                </p>
                {/* WRAPPER */}
                <div className="space-y-8">
                  {items.map((item, idx) => (
                    <div key={idx} className="space-y-3">
                      {/* TITLE */}
                      <dt className="text-lg font-semibold text-white">
                        {item.title}
                      </dt>

                      {/* DESC LIST */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.desc.map((descItem, i) => (
                          <div
                            key={i}
                            className={`flex items-center rounded-lg p-4 transition duration-200 hover:scale-[1.03] hover:shadow-md ${
                              descItem.type === "no"
                                ? "bg-red-50"
                                : "bg-green-50"
                            }`}
                          >
                            {/* ICON */}
                            {descItem.type === "no" ? (
                              <XCircleIcon className="w-6 h-6 text-red-500 mr-3" />
                            ) : (
                              <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                            )}

                            {/* TEXT */}
                            <span className="text-gray-800 text-sm">
                              <span className="font-semibold mr-1">
                                {i + 1}.
                              </span>
                              {descItem.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div
              animate={{ y: -6 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image
                width={800}
                height={800}
                src={Gaci}
                alt="Showcase image"
                className="w-3xl max-w rounded-xl shadow-xl bg-white ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:ml-0"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
    // </motion.section>
  );
}
