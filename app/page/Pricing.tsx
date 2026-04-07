import { motion } from "framer-motion";
import Image from "next/image";
import PricingCard from "../components/pricingcard";
import Tama from "../assets/Tama.png";

export default function Pricing() {
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
              image={Tama}
              note="Background price depends on complexity."
              prices={[
                { label: "Headshot", price: "65k / $15" },
                { label: "Bust-up", price: "100k / $20" },
                { label: "Half Body", price: "135k / $23" },
                { label: "Thigh-up", price: "175k / $35" },
                { label: "Full Body", price: "200k / $40" },
              ]}
            />
            <PricingCard
              title="Illustration Showcase"
              subtitle="CHIBIS!!!!!"
              description="I love drawing chibis and I can make one for you!!"
              image={Tama}
              popular
              buttonColor="#6366F1"
              prices={[
                { label: "Bust-up", price: "40k / $10" },
                { label: "Full Body", price: "65k / $15" },
              ]}
            />
            <PricingCard
              title="Illustration Showcase"
              subtitle="CHARACTER SHEET"
              description="a full body of your character with 1-2 props and a full body chibi of ur chara !!"
              image={Tama}
              // buttonColor="#9CA3AF"
              prices={[
                { label: "Local", price: "250k" },
                { label: "International", price: "$50" },
              ]}
            />
          </div>
        </div>
      </section>
      {/* </motion.section> */}
    </>
  );
}
