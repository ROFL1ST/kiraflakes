import Image from "next/image";
import Tama from "../assets/Tama.png";

export default function Rules() {
  const items = [
    {
      title: "I will draw.",
      desc: [
        "Anime",
        "Couples",
        "Kemonomimi / Nekomimi",
        "Fansart",
        "Any Gender",
        "Complex Character",
        "Bingus",
        "Rigby Cat",
      ],
    },
    {
      title: "I will not draw.",
      desc: [
        "nsfw",
        "furry",
        "mecha/heavy armor",
        "muscular characters",
        "elderly characters",
        "real life people (i will simplify it)",
      ],
    },
  ];
  return (
    <section id="rules">
      <div className="overflow-hidden h-screen bg-[#E36464] py-24 sm:py-32">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 lg:py-8">
                  {items.map((item, index) => (
                    <div key={index} className="relative pl-9">
                      {/* TITLE */}
                      <dt className="font-semibold text-white mb-1">
                        {item.title}
                      </dt>

                      {/* DESC LIST */}
                      <div className="pl-5 space-y-1">
                        {item.desc.map((descItem, i) => (
                          <dd key={i} className="text-white flex gap-2">
                            <span className="text-white">{i + 1}.</span>
                            {descItem}
                          </dd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Image
              width={1200}
              height={1200}
              src={Tama}
              alt="Showcase image"
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:ml-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
