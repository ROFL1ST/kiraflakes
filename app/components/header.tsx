"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Tamalogo from "../assets/TamaIcon.jpg";

const navigation = [
  { name: "Rules", href: "#rules" },
  { name: "Showcase ", href: "#showcase" },
  { name: "Term & Condition", href: "#Tnc" },
  { name: "Pricing", href: "#pricing" },
];

const sidebarVariants: Variants = {
  open: {
    clipPath: "circle(150% at 100% 0)",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 40,
    },
  },
  closed: {
    clipPath: "circle(0% at 100% 0)",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 16,
    },
  },
};

const containerVariants = {
  open: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    handleHashChange(); // initial
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
          current = "#" + section.getAttribute("id");
        }
      });

      setActiveHash(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <header
        className={`inset-x-0 top-0 z-50 transition-all duration-300
        ${
          isSticky
            ? "fixed bg-white/80 backdrop-blur shadow-md"
            : "absolute bg-transparent"
        }`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Kiraflakes</span>
              <Image
                alt=""
                src={Tamalogo}
                width={80}
                height={80}
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#E36464]"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-6">
            {navigation.map((item) => {
              const isActive = activeHash === item.href;

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  /* ANIMATION */
                  whileHover={{
                    y: -2,
                    scale: 1.05,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  /* STYLE */
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition duration-200
        ${
          isActive && "shadow-md shadow-[#E36464]/50"
            ? "bg-[#E36464] text-white border-[#E36464]"
            : "text-[#E36464] border-[#E36464] hover:bg-[#E36464] hover:text-white"
        }`}
                >
                  {item.name}
                </motion.a>
              );
            })}
          </div>
        </nav>
        <AnimatePresence>
          {mobileMenuOpen && (
            <Dialog
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
              className="lg:hidden"
            >
              {/* BACKDROP */}
              <motion.div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* SIDEBAR */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={sidebarVariants}
                className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm"
              >
                <DialogPanel className="h-full bg-white p-6 shadow-xl">
                  {/* HEADER */}
                  <div className="flex items-center justify-between">
                    <Image src={Tamalogo} alt="logo" width={80} height={80} />

                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 text-[#E36464]"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* MENU */}
                  <motion.div
                    className="mt-8 space-y-3"
                    variants={containerVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {navigation.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        /* CLICK → CLOSE DIALOG */
                        onClick={() => setMobileMenuOpen(false)}
                        /* HOVER ANIMATION */
                        whileHover={{
                          scale: 1.05,
                          x: 8,
                          backgroundColor: "#E36464",
                          color: "#ffffff",
                        }}
                        /* CLICK ANIMATION */
                        whileTap={{ scale: 0.95 }}
                        /* STYLE */
                        className="block rounded-lg px-4 py-3 text-base font-semibold text-[#E36464] border border-[#E36464]/30 transition"
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </motion.div>
                </DialogPanel>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
