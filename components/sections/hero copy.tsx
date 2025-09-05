  "use client";

  import { motion } from "framer-motion";
  import { useEffect, useRef } from "react";
  import { getGsap } from "@/lib/gsap";
  import AboutSplit from "./sections/about-split";
  import OurPurpose from "./sections/ourpurpose";
  import OurPillar from "./sections/ourpillar";
  import OurTeam from "./sections/our-team";

  export default function Hero() {
    const textRef = useRef<HTMLDivElement | null>(null);

    // Text lift/fade on scroll
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
              start: "top top+=10",
              end: "top top+=100",
              scrub: 1.2,
            },
          });
        });
      })();

      return () => ctx?.revert();
    }, []);

    return (
      <>
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
      </>
    );
  }
