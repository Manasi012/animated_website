"use client";

import { motion } from "framer-motion";
import ExploreButton from "./explorebutton";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-start bg-cover bg-center text-white overflow-hidden"
    >
      {/* Fog overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Multiple fog layers for depth */}
        <div className="absolute  bg-white/20 backdrop-blur-sm animate-fogSlow"></div>
        <div className="absolute bg-white/10 backdrop-blur-sm animate-fogFast"></div>
      </div>

      <div className="container mx-auto md:px-40 flex flex-col gap-8 relative z-10">
        {/* Small subtitle */}
        <div className="border border-blue-900 px-8 py-5 rotate-45 w-10 flex items-center justify-center">
          <span className="-rotate-45 text-blue-900 font-medium">1</span>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg tracking-wide text-blue-900 font-medium"
        >
          Our Pillars
        </motion.span>

        {/* Big Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl text-blue-900 leading-tight max-w-4xl capitalize"
        >
          At NeoLiv Trading, our core pillars define everything we do: Innovation to stay ahead, Efficiency to deliver more.
        </motion.h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <ExploreButton label="DISCOVER NOW" />
        </motion.div>

        {/* Decorative underline */}
        <div className="mt-8 w-1/3 border-b border-white"></div>
      </div>

      {/* Ship image positioned at bottom right */}
      <motion.img
        src="/ship.png"
        alt="Ship"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-0 right-12 w-[400px] md:w-[600px]"
      />
    </section>
  );
}
