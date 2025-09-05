"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import WhoAreWe from "./sections/WhoAreWe";
import AboutSplit from "./sections/about-split";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const api = await getGsap();
      if (!api || !bgRef.current) return;
      const { gsap, ScrollTrigger } = api;

      ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        // subtle parallax for background
        gsap.to(bgRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: bgRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // gentle lift on text block
        if (textRef.current) {
          gsap.to(textRef.current, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // scale up (zoom in) video on scroll
      if (videoRef.current) {
  gsap.to(videoRef.current, {
    scale: 5, // smoother zoom, not too aggressive
    ease: "power8.out", // smoother ease
    scrollTrigger: {
      trigger: bgRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 2, // <- adds smoothing effect
    },
    transformOrigin: "center center",
  });
}

      });

      // Set video playback speed
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.2; // 0.5x speed
      }
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* Fixed background video */}
      <div
        ref={bgRef}
        className="fixed inset-0 -z-10 w-full h-[100svh] will-change-transform"
        style={{ pointerEvents: "none" }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/images/foggvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="NeoLiv hero background"
        />
        <div className="absolute bg-primary/45" aria-hidden="true" />
      </div>

      {/* Hero content */}
      <section
        id="hero"
        className="relative h-auto flex items-center overflow-hidden"
      >
        <div className="container mx-auto px-6 flex items-center md:px-64 h-[100vh]">
          <div
            ref={textRef}
            className="max-w-3xl will-change-transform relative top-14"
          >
            <div className="flex items-center justify-start">
              <motion.h1
                className="font-serif text-4xl md:text-6xl text-balance text-blue-900 flex  items-center gap-4"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="https://www.neoliv.in/static/media/NeoLivInsignia.6d74e80ec2fffb75b4db.png"
                  alt="logo"
                  className="w-50 object-contain"
                />
                <span className="border h-12.5 rounded-lg text-blue-900"></span>
                <span className="tracking-[7px] text-blue-900">NEOLIV</span>
              </motion.h1>
            </div>
            <motion.p
              className="mt-5 md:mt-6 text-white text-base md:text-lg leading-relaxed tracking-widest"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <small>We are a unique integrated residential real estate platform with both fund management business and an in house development arm founded by Mohit Malhotra (ex MD & CEO of Godrej Properties), top industry experts and 360 ONE (Formerly IIFL Wealth)- India’s leading wealth management firm with more than USD 50 Bn AUM.</small>
              {/* <small>INDIA'S FOREMOST INTEGRATED FUND LED <br /> RESIDENTIAL REAL ESTATE DEVELOPER</small> */}
            </motion.p>

            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <a
                href="#about"
                className="inline-flex items-center bottom-0 pt-32 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
              >
               SCROLL DOWN TO EXPLORE
              </a>
              {/* <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 border border-white/70 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </a> */}
            </motion.div>
          </div>
        </div>
      </section>

      <section>
        <AboutSplit />
      </section>

      <section>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ipsum qui rerum eveniet, nesciunt unde praesentium nostrum distinctio deserunt ut quae laboriosam consequuntur nemo perspiciatis beatae delectus iste quo quidem cumque laborum quod! Ipsa saepe, asperiores consequatur tempora, molestias, impedit numquam possimus id blanditiis illo et! Nostrum, reiciendis esse beatae nam sunt consequuntur maxime impedit numquam atque velit laborum. Itaque, ratione dolorem, aliquid numquam delectus enim dolorum voluptate suscipit ipsum aperiam asperiores culpa amet facere excepturi magnam explicabo minus quam vitae nihil alias consectetur nulla! Magni, asperiores? Repellat numquam doloribus consectetur dicta consequatur, quos necessitatibus illo dolorem qui excepturi ut!
        </p>
      
      </section>

    </>
  );
}
