"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import WhoAreWe from "./sections/WhoAreWe";
import AboutSplit from "./sections/about-split";
import OurPurpose from "./sections/ourpurpose";
import OurPillar from "./sections/ourpillar";
import OurTeam from "./sections/our-team";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const api = await getGsap();
      if (!api || !bgRef.current) return;
      const { gsap, ScrollTrigger } = api;

      ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Background parallax
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

        // Text lift on scroll
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

        // Zoom-in/out effect on image
        if (imgRef.current) {
          gsap.to(imgRef.current, {
            scale: 7.5, // gentle zoom
            ease: "power2.out",
            scrollTrigger: {
              trigger: bgRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 2, // smooth effect
            },
            transformOrigin: "center center",
          });
        }
      });
    })();

    return () => ctx?.revert();
  }, []);

  useEffect(() => {
  let ctx: any;
  (async () => {
    const api = await getGsap();
    if (!api || !textRef.current) return;
    const { gsap, ScrollTrigger } = api;

    ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(textRef.current, {
        y: -50,       // move text up by 50px
        opacity: 0,   // fade out completely
        ease: "power1.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top top+=10",   // start fading after 20px scroll
          end: "top top+=100",    // fade over 300px scroll distance
          scrub: 1.2,             // smooth interpolation
        },
      });
    });
  })();

  return () => ctx?.revert();
}, []);


  return (
    <>
      {/* Fixed background image */}
      <div
        ref={bgRef}
        className="fixed inset-0 -z-10 w-full h-[100svh] will-change-transform"
        style={{ pointerEvents: "none" }}
      >
        <img
          ref={imgRef}
          src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmf3rm1w8.webp" // replace with your image path
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute bg-primary/45" aria-hidden="true" />
      </div>

      {/* Hero content */}
      <section
        id="hero"
        className="relative h-auto flex items-center overflow-hidden"
      >
        <div className="container mx-auto px-6 flex items-center md:px-64 h-[100vh]">
          <div ref={textRef} className="max-w-3xl will-change-transform relative top-14">
            <div className="flex items-center justify-start">
              <motion.h1
                className="font-serif text-4xl md:text-6xl text-balance text-blue-900 flex items-center gap-4"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmf3rqfdk.webp"
                  alt="logo"
                  className="w-24 object-contain"
                />&nbsp;
                <span className="border h-12.5 border-blue-900 rounded-lg text-blue-900"></span>
                <span className="tracking-[7px] text-blue-900 text-5xl">&nbsp;NEOLIV</span>
              </motion.h1>
            </div>

            {/* <motion.p
              className="mt-5 md:mt-6 text-blue-900 text-base md:text-lg leading-relaxed tracking-widest"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <small>
                We are a unique integrated residential real estate platform with both fund
                management business and an in-house development arm founded by Mohit Malhotra
                (ex MD & CEO of Godrej Properties), top industry experts, and 360 ONE
                (Formerly IIFL Wealth) - India’s leading wealth management firm with more
                than USD 50 Bn AUM.
              </small>
            </motion.p> */}

            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <a
                href="#about"
                className="inline-flex items-center bottom-0 pt-40 text-blue-900 font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                SCROLL DOWN TO EXPLORE
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sections below hero */}
      <section>
        <AboutSplit />
        <OurPurpose />
        <OurPillar />
        <OurTeam />

      </section>

      {/* <section>
        <WhoAreWe />
      </section> */}
    </>
  );
}
