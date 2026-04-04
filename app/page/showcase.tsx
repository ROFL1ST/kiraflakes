import Image from "next/image";
import Tama from "../assets/Tama.png";

export default function showcase() {
  return (
    <section id="showcase" className="text-gray-600 bg-white body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            Showcase of my works!
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            havent heard of them man bun deep jianbing selfies heirloom.
          </p>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <Image
                width={600}
                height={600}
                src={Tama}
                alt="gallery"
                className="w-full object-cover h-full object-center block"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                width={600}
                height={600}
                src={Tama}
                alt="gallery"
                className="w-full object-cover h-full object-center block"
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <Image
                width={600}
                height={600}
                src={Tama}
                alt="gallery"
                className="w-full h-full object-cover object-center block"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <Image
                width={600}
                height={600}
                src={Tama}
                alt="gallery"
                className="w-full h-full object-cover object-center block"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                width={600}
                height={600}
                src={Tama}
                alt="gallery"
                className="w-full object-cover h-full object-center block"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                width={600}
                height={600}
                src={Tama}
                alt="gallery"
                className="w-full object-cover h-full object-center block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
