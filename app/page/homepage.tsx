"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Tamalogo from "../assets/TamaIcon.jpg";
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const text = "Kiraflakes";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section id="Hero">
        <div className="bg-white h-screen">
          <div className="relative isolate px-6 pt-5 lg:px-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
              />
            </div>
            <div className="mx-auto max-w-2xl py-28 sm:py-40 lg:py-52">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
              <div>
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {/* LOGO */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <Image
                        src={Tamalogo}
                        alt="Tama Logo"
                        width={120}
                        height={120}
                        className="mx-auto h-30 w-auto"
                      />
                    </motion.div>

                    {/* TEXT */}
                    <div className="text-center mt-4">
                      {/* TYPING TITLE */}
                      <h1 className="text-5xl font-semibold tracking-tight bg-linear-to-r from-[#E36464] to-pink-400 bg-clip-text text-transparent sm:text-7xl">
                        {displayText}
                        <span className="ml-1 animate-blink bg-linear-to-r from-[#E36464] to-pink-400 bg-clip-text text-transparent ">
                          |
                        </span>
                      </h1>

                      {/* SUBTEXT */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-8 text-lg font-medium text-[#E36464] sm:text-xl/8"
                      >
                        hii! my name is kira (or tama) she/her | uni student!
                        take a look around
                      </motion.p>
                    </div>
                  </motion.div>
                  {/* BUTTON */}
                  <div className="mt-10 flex justify-center">
                    <motion.button
                      /* ENTRANCE ANIMATION */
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      onClick={() => setIsOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-md bg-[#E36464] px-4 py-2 text-sm font-semibold text-white shadow-md"
                    >
                      Order Now!
                    </motion.button>
                  </div>

                  {/* MODAL */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                      >
                        {/* BOX */}
                        <motion.div
                          onClick={(e) => e.stopPropagation()}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 250 }}
                          className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center"
                        >
                          <h2 className="text-lg font-semibold mb-2 text-gray-900">
                            Order via
                          </h2>
                          <p className="text-gray-500 mb-5 text-sm">
                            Choose your preferred platform to contact me
                          </p>

                          <div className="flex justify-center gap-6">
                            {/* WHATSAPP */}
                            <motion.a
                              href="https://wa.me/628xxxxxxxxxx"
                              target="_blank"
                              whileHover={{ scale: 1.2, y: -5 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 rounded-full bg-green-50 hover:bg-green-100 transition shadow-sm"
                            >
                              <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
                            </motion.a>

                            {/* DISCORD */}
                            <motion.a
                              href="https://discord.com/users/your-id"
                              target="_blank"
                              whileHover={{ scale: 1.2, y: -5 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 rounded-full bg-indigo-50 hover:bg-indigo-100 transition shadow-sm"
                            >
                              <UserGroupIcon className="w-6 h-6 text-indigo-600" />
                            </motion.a>
                            {/* TWITTER / X */}
                            <motion.a
                              href="https://twitter.com/your-username"
                              target="_blank"
                              whileHover={{ scale: 1.2, y: -5 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
                            >
                              <PaperAirplaneIcon className="w-6 h-6 text-gray-700" />
                            </motion.a>
                          </div>

                          {/* CLOSE BUTTON */}
                          <button
                            onClick={() => setIsOpen(false)}
                            className="mt-5 text-sm text-gray-500 hover:text-gray-700"
                          >
                            Close
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
