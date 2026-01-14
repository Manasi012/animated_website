"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import ExploreButton from "./sections/explorebutton";
import SmokeEffect from "./SmokeEffect";

export default function HeroSection() {
  const fogRef1 = useRef<HTMLImageElement | null>(null);
  const fogRef2 = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const api = await getGsap();
      if (!api) return;
      const { gsap, ScrollTrigger } = api;

      ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Fog layer 1 (slow drift)
        if (fogRef1.current) {
          gsap.to(fogRef1.current, {
            x: 150,
            y: -50,
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: "#pillars",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Fog layer 2 (faster opposite drift)
        if (fogRef2.current) {
          gsap.to(fogRef2.current, {
            x: -120,
            y: 80,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: "#pillars",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="pillars"
      className="relative h-screen flex items-center justify-start text-white overflow-hidden"
      style={{
    backgroundImage:
      "url('https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfz0lcol.webp')",
  }}
    >
      {/* Fog layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          ref={fogRef1}
          src="/fog1.png" // transparent blurred white mist
          alt="Fog layer 1"
          className="absolute top-0 left-0 w-[150%] opacity-50"
        />
        <img
          ref={fogRef2}
          src="/fog2.png" // another mist variation
          alt="Fog layer 2"
          className="absolute bottom-0 right-0 w-[120%] opacity-40"
        />
      </div>

      <SmokeEffect />

      <div className="container mx-auto md:px-40 px-8 py-2.5 flex flex-col gap-8 relative z-10">
        {/* Small subtitle */}
        <div className="border border-white px-8 py-5 md:mt-0 mt-42 rotate-45 w-10 flex items-center justify-center">
          <span className="-rotate-45 text-white font-medium">1</span>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg tracking-wide text-white font-medium"
        >
          Our Pillars
        </motion.span>

        {/* Big Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl text-white leading-tight max-w-4xl capitalize"
        >
          At NeoLiv Trading, our core pillars define everything we do: Innovation to stay ahead, Efficiency to deliver more.
        </motion.h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4 md:pb-0 pb-32"
        >
          <ExploreButton label="DISCOVER&nbsp;NOW" />
        </motion.div>

        {/* Decorative underline */}
        <div className="mt-8 w-1/3 border-b border-white"></div>



        
      </div>
    </section>
  );
}
