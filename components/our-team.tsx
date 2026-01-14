"use client";

import { motion } from "framer-motion";
import ExploreButton from "./sections/explorebutton";

export default function OurTeam() {
  return (
  <section
  id="team"
  className="relative h-auto flex items-center bg-cover text-white overflow-hidden"
  style={{
    backgroundImage:
      "url('https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmf3ytuoa.webp')",
  }}
>
  <div className="container mx-auto md:px-40 px-8 flex justify-end relative z-10">
    {/* Inner content block (left-aligned) */}
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Small subtitle */}
      <div className="border border-white px-8 py-5 rotate-45 w-10 flex items-center justify-center mt-32">
        <span className="-rotate-45 text-white font-medium">2</span>
      </div>

      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg tracking-wide text-white font-medium"
      >
        Our Team
      </motion.span>

       <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl text-white leading-tight max-w-4xl capitalize"
      >
       <p className="text-xl font-semibold tracking-wider">Mohit Malhotra</p>
       <p className="text-lg">Founder & CEO</p>
      </motion.p>

      {/* Big Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl md:text-5xl text-white md:leading-tight leading-10 max-w-4xl capitalize"
      >
        At NeoLiv Trading, our core pillars define everything we do: Innovation
        to stay ahead, Efficiency to deliver more.
      </motion.h1>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex items-start gap-4"
      >
        <ExploreButton label="DISCOVER&nbsp;NOW" />
      </motion.div>

      {/* Decorative underline */}
      <div className="mt-8 w-1/3 border-b border-white"></div>
    </div>
  </div>

</section>


  );
}
