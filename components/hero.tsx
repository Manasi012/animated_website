"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import WhoAreWe from "./sections/WhoAreWe";
import AboutSplit from "./sections/about-split";
import OurPurpose from "./sections/ourpurpose";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const cloudsRef = useRef<HTMLDivElement | null>(null);
  const mountain1Ref = useRef<HTMLImageElement | null>(null);
  const mountain2Ref = useRef<HTMLImageElement | null>(null);
  const mountain3Ref = useRef<HTMLImageElement | null>(null);
  const mountain4Ref = useRef<HTMLImageElement | null>(null);
  const mountain5Ref = useRef<HTMLImageElement | null>(null);
  const fogRef = useRef<HTMLDivElement | null>(null);
  const smokeContainerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const mountainsContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollSmokeContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const api = await getGsap();
      if (!api || !bgRef.current) return;
      const { gsap, ScrollTrigger } = api;

      ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mountainRefs = [mountain1Ref, mountain2Ref, mountain3Ref, mountain4Ref, mountain5Ref];

        // Floating animation for all mountains
        mountainRefs.forEach((mountainRef, index) => {
          if (mountainRef.current) {
            gsap.set(mountainRef.current, {
              transformOrigin: "center center"
            });

            // Different floating patterns for each mountain
            const baseDelay = index * 0.8;
            const baseY = 8 + index * 2;
            const baseX = 5 + index * 1.5;
            const baseRotation = 0.3 + index * 0.1;

            gsap.to(mountainRef.current, {
              y: baseY,
              duration: 5 + index * 0.5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: baseDelay,
              force3D: true
            });

            gsap.to(mountainRef.current, {
              x: baseX,
              duration: 7 + index * 0.3,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: baseDelay + 0.5,
              force3D: true
            });

            gsap.to(mountainRef.current, {
              rotation: baseRotation,
              duration: 9 + index * 0.7,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: baseDelay + 1,
              force3D: true
            });
          }
        });

        // Enhanced floating fog-like smoke animation
        if (smokeContainerRef.current) {
          const smokeElements = smokeContainerRef.current.querySelectorAll('.smoke-image');
          
          smokeElements.forEach((smokeElement, index) => {
            // Set initial opacity and transform origin
            gsap.set(smokeElement, {
              opacity: 0.4 + (index % 4) * 0.1,
              scale: 1,
              transformOrigin: "center center"
            });

            // Primary floating animation - vertical up and down
            gsap.to(smokeElement, {
              y: -20 - (index % 6) * 10, // Different floating heights
              duration: 8 + (index % 4) * 12, // Varied floating speeds
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Secondary floating animation - horizontal sway
            gsap.to(smokeElement, {
              x: 30 + (index % 5) * 15, // Gentle horizontal sway
              duration: 12 + (index % 5) * 7, // Different horizontal speeds
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Natural opacity floating like fog density changes
            gsap.to(smokeElement, {
              opacity: 0.2 + (index % 4) * 0.15, // Floating opacity
              duration: 15 + (index % 6) * 5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Floating scale breathing effect
            gsap.to(smokeElement, {
              scale: 0.95 + (index % 3) * 0.1, // Subtle floating scale changes
              duration: 18 + (index % 4) * 6,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });
          });

          // Overall container floating movement
          gsap.to(smokeContainerRef.current, {
            x: 20,
            y: -10,
            duration: 25,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            force3D: true
          });

          // Secondary container floating
          gsap.to(smokeContainerRef.current, {
            y: 15,
            duration: 35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            force3D: true
          });
        }

        // REVERSE SCALING: Mountains get smaller and fade on scroll
        if (mountainsContainerRef.current) {
          gsap.to(mountainsContainerRef.current, {
            scale: 0.3, // Shrink to 30% of original size
            opacity: 0, // Fade out completely
            ease: "none",
            scrollTrigger: {
              trigger: bgRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1, // Smooth scroll-tied animation
              toggleActions: "play reverse play reverse"
            }
          });
        }

        // Individual mountain scaling and fading (additional effect for each mountain)
        mountainRefs.forEach((mountainRef, index) => {
          if (mountainRef.current) {
            gsap.to(mountainRef.current, {
              scale: 0.2 + index * 0.05, // Different shrinking levels
              opacity: 0,
              y: `+=${50 + index * 20}`, // Move up as they disappear
              ease: "power2.out",
              scrollTrigger: {
                trigger: bgRef.current,
                start: `top+=${index * 10}% top`,
                end: `bottom-=${index * 5}% top`,
                scrub: 1.5,
                toggleActions: "play reverse play reverse"
              }
            });
          }
        });

        // SCROLL-TRIGGERED SMOKE ANIMATION - Rising from bottom as you scroll
        if (scrollSmokeContainerRef.current) {
          const scrollSmokeElements = scrollSmokeContainerRef.current.querySelectorAll('.scroll-smoke-image');
          
          scrollSmokeElements.forEach((smokeElement, index) => {
            // Set initial position at bottom
            gsap.set(smokeElement, {
              y: window.innerHeight + 200 + (index * 50), // Start below viewport
              opacity: 0,
              scale: 0.5 + (index % 3) * 0.2,
              transformOrigin: "center center"
            });

            // Smoke rises from bottom to top based on scroll progress
            gsap.to(smokeElement, {
              y: -window.innerHeight - 100, // End above viewport
              opacity: 0.8, // Fade in then out
              scale: 1.5 + (index % 2) * 0.5, // Grow as it rises
              ease: "none",
              scrollTrigger: {
                trigger: bgRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5 + (index * 0.1), // Different scrub speeds for variety
                toggleActions: "play reverse play reverse"
              }
            });

            // Individual opacity animation for more realistic smoke
            gsap.to(smokeElement, {
              opacity: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bgRef.current,
                start: "center top",
                end: "bottom top",
                scrub: 1,
                toggleActions: "play reverse play reverse"
              }
            });

            // Horizontal drift during rise
            gsap.to(smokeElement, {
              x: (Math.random() - 0.5) * 300, // Random horizontal drift
              rotation: (Math.random() - 0.5) * 45, // Random rotation
              ease: "none",
              scrollTrigger: {
                trigger: bgRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1 + (index * 0.2),
                toggleActions: "play reverse play reverse"
              }
            });
          });
        }

        // Static fog intensification on scroll
        if (fogRef.current) {
          gsap.to(fogRef.current, {
            opacity: 0.9,
            scale: 1.3,
            y: -50,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bgRef.current,
              start: "top top",
              end: "bottom-=200 top",
              scrub: 1.5,
              toggleActions: "play reverse play reverse"
            }
          });
        }

        // Enhanced cloud floating with multiple layers
        if (cloudsRef.current) {
          gsap.to(cloudsRef.current, {
            x: 30,
            duration: 45,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            force3D: true
          });

          gsap.to(cloudsRef.current, {
            y: 10,
            duration: 35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 5,
            force3D: true
          });

          gsap.to(cloudsRef.current, {
            rotation: 0.3,
            duration: 60,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 10,
            force3D: true
          });
        }

        // Text lift on scroll
        if (textRef.current) {
          gsap.to(textRef.current, {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
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

  useEffect(() => {
    let ctx: any;
    (async () => {
      const api = await getGsap();
      if (!api || !textRef.current) return;
      const { gsap, ScrollTrigger } = api;

      ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(textRef.current, {
          y: -50,
          opacity: 0,
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
      {/* Body overflow fix */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* Hero Section - Full viewport height with no gaps */}
      <div className="relative w-full" style={{ minHeight: "100vh" }}>
        {/* Fixed background layer */}
        <div
          ref={bgRef}
          className="fixed inset-0 w-full h-full overflow-hidden will-change-transform"
          style={{ 
            pointerEvents: "none",
            zIndex: -1
          }}
        >
          {/* Static cloud background layer */}
          <div
            ref={cloudsRef}
            className="absolute w-full h-full will-change-transform"
            style={{
              top: "-2.5%",
              left: "-2.5%",
              width: "105%",
              height: "105%",
              background: `
                linear-gradient(180deg, #e0e8ee 0%, #9aa4ad 50%, #f3f8fc   100%)
              `,
              backgroundSize: "100%",
            }}
          />

          {/* Mountains Container - This will shrink and fade on scroll */}
          <div
            ref={mountainsContainerRef}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            {/* Mountain 1 - Largest, back */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: 1, right: "-20%" }}
            >
              <img
                ref={mountain1Ref}
                src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfyzqssh.webp"
                alt="Mountain 1"
                className="object-cover will-change-transform"
                style={{
                  width: "40%",
                  height: "80%",
                  opacity: 0.7,
                  maskImage: "radial-gradient(ellipse 90% 70% at center, black 30%, transparent 85%)",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 70% at center, black 30%, transparent 85%)"
                }}
              />
            </div>

            {/* Mountain 2 - Large, left */}
            <div 
              className="absolute inset-0 flex items-center justify-start"
              style={{ zIndex: 2, left: "20%", bottom: "-70%" }}
            >
              <img
                ref={mountain2Ref}
                src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfyzqssh.webp"
                alt="Mountain 2"
                className="object-cover will-change-transform"
                style={{
                  width: "15%",
                  height: "30%",
                  opacity: 0.8,
                  maskImage: "radial-gradient(ellipse 75% 65% at center, black 35%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(ellipse 75% 65% at center, black 35%, transparent 80%)"
                }}
              />
            </div>

            {/* Mountain 3 - Medium, right */}
            <div 
              className="absolute inset-0 flex items-center justify-start"
              style={{ zIndex: 3, left: "17%" }}
            >
              <img
                ref={mountain3Ref}
                src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfyzqssh.webp"
                alt="Mountain 3"
                className="object-cover will-change-transform"
                style={{
                  width: "25%",
                  height: "35%",
                  opacity: 0.85,
                  maskImage: "radial-gradient(ellipse 70% 60% at center, black 40%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse 70% 60% at center, black 40%, transparent 75%)"
                }}
              />
            </div>

            {/* Mountain 4 - Small, bottom-right */}
            <div 
              className="absolute inset-0 flex items-end justify-end"
              style={{ zIndex: 4, right: "-10%", bottom: "-40%" }}
            >
              <img
                ref={mountain4Ref}
                src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfyzqssh.webp"
                alt="Mountain 4"
                className="object-cover will-change-transform"
                style={{
                  width: "50%",
                  height: "60%",
                  opacity: 0.9,
                  maskImage: "radial-gradient(ellipse 65% 55% at center, black 45%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(ellipse 65% 55% at center, black 45%, transparent 70%)"
                }}
              />
            </div>
          </div>

          {/* Natural Full-Screen Fog Coverage */}
          <div
            ref={smokeContainerRef}
            className="absolute inset-0"
            style={{ 
              zIndex: 8,
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%'
            }}
          >
            {/* Top Row - Sky Level */}
            {/* <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '650px', height: '420px', top: '-120px', left: '50%', opacity: 0.35, mixBlendMode: 'overlay'}} />
            <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '500px', height: '350px', top: '-60px', left: '75%', opacity: 0.3, mixBlendMode: 'multiply'}} /> */}

            {/* Upper Middle Row */}
            {/* <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '700px', height: '450px', top: '50px', left: '-5%', opacity: 0.4, mixBlendMode: 'screen'}} />
            <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '580px', height: '390px', top: '80px', left: '20%', opacity: 0.45, mixBlendMode: 'multiply', transform: 'scaleY(-1)'}} /> */}

            {/* Middle Row */}
            {/* <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '750px', height: '500px', top: '200px', left: '-10%', opacity: 0.5, mixBlendMode: 'multiply'}} /> */}
            <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '680px', height: '460px', top: '160px', left: '40%', opacity: 0.52, mixBlendMode: 'screen'}} />
            {/* <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '520px', height: '360px', top: '220px', left: '65%', opacity: 0.46, mixBlendMode: 'multiply'}} /> */}

            {/* Lower Middle Row */}
            <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '800px', height: '550px', top: '350px', left: '-15%', opacity: 0.55, mixBlendMode: 'screen'}} />
            {/* <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '720px', height: '480px', top: '300px', left: '35%', opacity: 0.57, mixBlendMode: 'multiply', transform: 'scaleY(-1)'}} /> */}
            {/* <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '560px', height: '380px', top: '370px', left: '60%', opacity: 0.51, mixBlendMode: 'screen'}} /> */}

            {/* Bottom Row */}
            <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '700px', height: '480px', bottom: '-80px', left: '5%', opacity: 0.58, mixBlendMode: 'overlay', transform: 'scaleX(-1)'}} />
            <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{width: '760px', height: '520px', bottom: '-120px', left: '30%', opacity: 0.62, mixBlendMode: 'screen'}} />
          </div>

          {/* SCROLL-TRIGGERED SMOKE - Rising from bottom during scroll */}
          <div
            ref={scrollSmokeContainerRef}
            className="absolute inset-0"
            style={{ 
              zIndex: 15,
              width: '100%',
              height: '100%'
            }}
          >
            {/* Multiple scroll-triggered smoke images */}
            {Array.from({ length: 20 }, (_, index) => (
              <img
                key={index}
                className="scroll-smoke-image absolute will-change-transform"
                src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp"
                alt={`Scroll Smoke ${index + 1}`}
                style={{
                  width: `${300 + (index % 5) * 50}px`,
                  height: `${300 + (index % 5) * 50}px`,
                  left: `${(index % 10) * 10}%`,
                  mixBlendMode: index % 3 === 0 ? 'multiply' : index % 3 === 1 ? 'screen' : 'overlay',
                  transform: index % 2 === 0 ? 'scaleX(-1)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Static fog layer for additional depth */}
          <div
            ref={fogRef}
            className="absolute inset-0 will-change-transform"
            style={{
              opacity: 0.2,
              background: `
                radial-gradient(ellipse 100% 60% at center bottom, rgba(255,255,255,0.8) 0%, transparent 60%),
                linear-gradient(180deg, transparent 60%, rgba(255,248,255,0.7) 100%)
              `,
              zIndex: 11
            }}
          />

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15" style={{ zIndex: 12 }}></div>
        </div>

        {/* Hero content - positioned relative to allow natural scroll flow */}
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center"
          style={{ zIndex: 20 }}
        >
          <div className="container mx-auto px-6 flex items-center md:px-64">
            <div ref={textRef} className="max-w-3xl will-change-transform">
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
                  />
                  <span className="border h-12.5 border-blue-900 rounded-lg text-blue-900 w-px"></span>
                  <span className="tracking-[7px] text-blue-900 md:text-5xl text-3xl">NEOLIV</span>
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
                  className="inline-flex items-center text-blue-900 font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  SCROLL DOWN TO EXPLORE
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Sections below hero - ensure no gaps */}
      <div className="relative z-30">
        <AboutSplit />
        <OurPurpose />
        {/* <WhoAreWe /> */}
        {/* <OurTeam /> */}
      </div>
    </>
  );
}
