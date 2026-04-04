"use client";
import Image from "next/image";
import Tamalogo from "../assets/TamaIcon.jpg";



export default function Hero() {

  return (
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
            <Image
              src={Tamalogo}
              alt="Tama Logo"
              width={120}
              height={120}
              className="mx-auto h-30 w-auto"
            />
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-[#E36464] sm:text-7xl">
              Kiraflakes
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-[#E36464] sm:text-xl/8">
              hii! my name is kira (or tama) she/her | uni student! take a look
              around
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#E36464] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Order Now!
              </a>
              <a href="#" className="text-sm/6 font-semibold text-[#E36464]">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
  );
}
