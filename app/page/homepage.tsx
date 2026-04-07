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
      {/* <motion.section
        id="homepage"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gray-600 bg-white body-font"
      > */}
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
                      transition={{ type: "spring", stiffness: 200 }}
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="currentColor"
                                className="bi bi-whatsapp text-green-500"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                              </svg>
                            </motion.a>

                            {/* DISCORD */}
                            <motion.a
                              href="https://discord.com/users/your-id"
                              target="_blank"
                              whileHover={{ scale: 1.2, y: -5 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 rounded-full bg-indigo-50 hover:bg-indigo-100 transition shadow-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="currentColor"
                                className="bi bi-discord text-indigo-500"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                              </svg>
                            </motion.a>
                            {/* TWITTER / X */}
                            <motion.a
                              href="https://twitter.com/your-username"
                              target="_blank"
                              whileHover={{ scale: 1.2, y: -5 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="currentColor"
                                className="bi bi-twitter-x text-gray-500"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                              </svg>
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
      {/* </motion.section> */}
    </>
  );
}
