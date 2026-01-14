"use client";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import ExploreButton from "./explorebutton";

export default function AboutSplit() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const smokeContainerRef = useRef<HTMLDivElement | null>(null);
  const staticSmokeRef = useRef<HTMLDivElement | null>(null);

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
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play reverse play reverse",
              scrub: true,
            },
          }
        );

        // Stable animated smoke effects - no fluctuation
        if (smokeContainerRef.current) {
          const smokeElements = smokeContainerRef.current.querySelectorAll('.about-smoke-image');
          
          smokeElements.forEach((smokeElement, index) => {
            // Set stable initial state
            gsap.set(smokeElement, {
              opacity: 0.4 + (index % 4) * 0.1, // Stable base opacity
              scale: 0.9 + (index % 3) * 0.1,
              transformOrigin: "center center"
            });

            // Very gentle floating - minimal movement to avoid fluctuation
            gsap.to(smokeElement, {
              y: -15 - (index % 3) * 5, // Reduced movement
              duration: 25 + (index % 4) * 15, // Slower, more stable
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Minimal horizontal drift
            gsap.to(smokeElement, {
              x: 10 + (index % 4) * 5, // Reduced horizontal movement
              duration: 30 + (index % 5) * 10, // Slower drift
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Stable opacity - minimal breathing
            gsap.to(smokeElement, {
              opacity: 0.35 + (index % 3) * 0.08, // Reduced opacity range
              duration: 40 + (index % 4) * 20, // Much slower changes
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Minimal scale breathing
            gsap.to(smokeElement, {
              scale: 0.85 + (index % 2) * 0.08, // Reduced scale range
              duration: 50 + (index % 3) * 25, // Very slow changes
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });
          });

          // Very gentle container movement
          gsap.to(smokeContainerRef.current, {
            y: -10,
            duration: 60, // Much slower
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            force3D: true
          });
        }

        // Static background smoke effects
        if (staticSmokeRef.current) {
          gsap.to(staticSmokeRef.current, {
            opacity: 0.6, // Increased opacity
            scale: 1.05, // Minimal scale change
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "bottom 10%",
              scrub: 1,
              toggleActions: "play reverse play reverse"
            }
          });
        }
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="mb-[30%] bg-transparent h-auto md:mx-40 relative"
    >
      {/* Enhanced static background smoke layer */}
      <div
        ref={staticSmokeRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          width: '150%',
          height: '150%',
          left: '-25%',
          top: '-25%'
        }}
      >
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 10% 90%, rgba(255,255,255,0.6) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 90% 10%, rgba(200,210,220,0.5) 0%, transparent 50%),
              radial-gradient(ellipse 70% 50% at 50% 50%, rgba(240,245,250,0.4) 0%, transparent 40%),
              radial-gradient(ellipse 90% 70% at 30% 70%, rgba(220,225,235,0.5) 0%, transparent 55%),
              linear-gradient(135deg, transparent 30%, rgba(240,245,250,0.4) 60%, transparent 90%),
              linear-gradient(45deg, rgba(230,235,245,0.3) 0%, transparent 50%, rgba(210,220,235,0.3) 100%)
            `
          }}
        />
      </div>

      {/* Dense animated smoke layer */}
      <div
        ref={smokeContainerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%'
        }}
      >
        {/* Dense smoke coverage - Multiple layers */}
        
        {/* Bottom layer */}
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '600px', height: '600px', bottom: '0%', left: '0%', opacity: 0.3, mixBlendMode: 'multiply'}} />
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '550px', height: '550px', bottom: '5%', left: '15%', opacity: 0.25, mixBlendMode: 'screen', transform: 'scaleX(-1)'}} />
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="About Smoke" style={{width: '580px', height: '580px', bottom: '10%', left: '30%', opacity: 0.28, mixBlendMode: 'overlay'}} />
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '520px', height: '520px', bottom: '0%', right: '0%', opacity: 0.32, mixBlendMode: 'multiply', transform: 'scaleY(-1)'}} />
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '560px', height: '560px', bottom: '8%', right: '20%', opacity: 0.26, mixBlendMode: 'screen'}} />

        {/* Middle layer */}
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="About Smoke" style={{width: '500px', height: '500px', top: '30%', left: '5%', opacity: 0.35, mixBlendMode: 'multiply'}} />
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '450px', height: '450px', top: '40%', left: '20%', opacity: 0.3, mixBlendMode: 'screen', transform: 'scaleX(-1)'}} />
     
        {/* Top layer */}
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="About Smoke" style={{width: '550px', height: '550px', top: '0%', left: '10%', opacity: 0.25, mixBlendMode: 'multiply'}} />
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '480px', height: '480px', top: '5%', left: '30%', opacity: 0.22, mixBlendMode: 'screen', transform: 'scaleX(-1)'}} />
         <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="About Smoke" style={{width: '550px', height: '550px', top: '10%', left: '40%', opacity: 0.25, mixBlendMode: 'multiply'}} />
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '480px', height: '480px', top: '15%', left: '60%', opacity: 0.22, mixBlendMode: 'screen', transform: 'scaleX(-1)'}} />

        


        {/* Center fill layer */}
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '650px', height: '650px', top: '20%', left: '25%', opacity: 0.2, mixBlendMode: 'multiply'}} />
  
     
        {/* Edge coverage */}
        {/* <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '350px', height: '350px', top: '70%', left: '0%', opacity: 0.35, mixBlendMode: 'screen'}} /> */}
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '360px', height: '360px', top: '80%', right: '0%', opacity: 0.33, mixBlendMode: 'multiply'}} />
        <img className="about-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="About Smoke" style={{width: '340px', height: '340px', bottom: '60%', left: '80%', opacity: 0.28, mixBlendMode: 'overlay'}} />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <div className="flex justify-end items-center gap-40 px-4">
          <motion.p
            className="font-normal text-blue-900 md:text-5xl text-3xl leading-16"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
            INDIA'S FOREMOST INTEGRATED <br />
            FUND LED RESIDENTIAL <br />
            REAL ESTATE DEVELOPER
          </motion.p>
        </div>

        <div className="mt-[30%] flex justify-start items-center gap-40 px-4 md:w-2/4 w-full">
          <motion.p
            className="font-normal text-blue-900 md:text-2xl text-xl leading-10"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            We are a unique integrated residential real estate platform with both fund
            management business and an in-house development arm founded by Mohit Malhotra
            (ex MD & CEO of Godrej Properties), top industry experts, and 360 ONE
            (Formerly IIFL Wealth) - India's leading wealth management firm with more
            than USD 50 Bn AUM.
          </motion.p>
        </div>

        <div className="my-20 flex justify-start">
          <ExploreButton label="WHO ARE WE ?" />
        </div>
      </div>
    </section>
  );
}
