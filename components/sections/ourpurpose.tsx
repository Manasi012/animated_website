"use client";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function OurPurpose() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;

    (async () => {
      const api = await getGsap();
      if (!api || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = api;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Fade in & move up on load
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%", // when top of section is at 80% of viewport
              end: "top 50%",
              toggleActions: "play reverse play reverse",
              scrub: true, // smooth fade in/out
            },
          }
        );
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="purpose"
      ref={sectionRef}
      className="mb-[30%] bg-transparent h-auto md:mx-40"
    >
      <div className="flex justify-start items-center gap-40 px-4 w-3/4">
        <p className="font-normal text-blue-900 text-4xl leading-14 capitalize">
          The residential real estate sector in India has been affected with distrust & conflict-driven relationships. The whole experience is stressful and far from being a joyous relationship. Moreover, lack of transparency, secure funding, and corporate governance issues have resulted in loss of credibility.
        </p>
      </div>

       <div className="my-[20%] flex justify-end items-center px-4 w-full">
  <p className="font-normal text-blue-900 text-2xl leading-10 max-w-2xl text-left">
    Our Purpose : To build joyful communities and <br /> living experiences through people, <br /> quality and service excellence.
  </p>
</div>


    </section>
  );
}
