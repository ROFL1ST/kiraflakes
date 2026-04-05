import Image from "next/image";
import Tama from "../assets/Tama.png";

export default function Tnc() {
    const tncItems = [
  {
    title: "General",
    desc: "I own the right to decline any commission I don't feel comfortable with.",
  },
  {
    title: "General",
    desc: "Please credit me with either a link to my X (Twitter) @kiravflakes or Discord account if you use my work.",
  },
  {
    title: "Revisions",
    desc: "I accept three revisions at maximum. More than that would incur fees.",
  },
  {
    title: "Revisions",
    desc: "When needed, I may send you the work in progress very early on and ask for your feedback.",
  },
  {
    title: "Deadlines and Delivery",
    desc: "I prefer 100% payment upfront. I start work when at least 50% is paid.",
  },
  {
    title: "Payment",
    desc: "Payments are accepted via your preferred method.",
  },
  {
    title: "Usage",
    desc: "Artwork is for personal use unless agreed otherwise.",
  },
];
  return (
    <>
      <section id="Tnc" className="text-white body-font bg-[#E36464]">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-[#E36464] relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    General
                  </h2>
                  <p className="leading-relaxed">
                    I own the right to decline any commission I don&apos;t feel
                    comfortable with.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-[#E36464] relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    General
                  </h2>
                  <p className="leading-relaxed">
                    Please credit me with either a link to my X (Twitter)
                    @kiravflakes or Discord account if you use my work.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-[#E36464] relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Revisions
                  </h2>
                  <p className="leading-relaxed">
                    I accept three revisions at maximum. More than that would
                    incur fees.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-[#E36464] relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Revisions
                  </h2>
                  <p className="leading-relaxed">
                    When needed, I may send you the work in progress very early
                    on and ask for your feedback. This would not count as a
                    revision.
                  </p>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-[#E36464] relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Deadlines and Delivery
                  </h2>
                  <p className="leading-relaxed">
                    I prefer 100% payment upfront. I start work when at least
                    50% down payment is paid. I would need time ranging from 1
                    to 4 weeks, depending on complexity and revisions required.
                  </p>
                </div>
              </div>
            </div>
            <Image
              width={600}
              height={600}
              src={Tama}
              alt="gallery"
              className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
            />
          </div>
        </div>
      </section>
    </>
  );
}

<Image
  width={600}
  height={600}
  src={Tama}
  alt="gallery"
  className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
/>;
