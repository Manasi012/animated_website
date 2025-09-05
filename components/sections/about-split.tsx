"use client";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import ExploreButton from "./explorebutton";

export default function AboutSplit() {
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
      id="about"
      ref={sectionRef}
      className="mb-[30%] bg-transparent h-auto md:mx-40"
    >
      <div className="flex justify-end items-center gap-40 px-4">
        <p className="font-normal text-blue-900 text-5xl leading-16">
          INDIA'S FOREMOST INTEGRATED <br />
          FUND LED RESIDENTIAL <br />
          REAL ESTATE DEVELOPER
        </p>
      </div>

       <div className="mt-[30%] flex justify-start items-center gap-40 px-4 w-2/4">
        <p className="font-normal text-blue-900 text-xl leading-10">
                We are a unique integrated residential real estate platform with both fund
                management business and an in-house development arm founded by Mohit Malhotra
                (ex MD & CEO of Godrej Properties), top industry experts, and 360 ONE
                (Formerly IIFL Wealth) - India’s leading wealth management firm with more
                than USD 50 Bn AUM.
        </p>
       
      </div>
      <div className="my-20 flex justify-start">
<ExploreButton label="WHO ARE WE ?" />

      </div>
    </section>
  );
}
