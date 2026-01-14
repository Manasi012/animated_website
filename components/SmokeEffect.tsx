"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function SmokeEffect() {
  const smokeContainerRef = useRef<HTMLDivElement | null>(null);
  const staticSmokeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;

    (async () => {
      const api = await getGsap();
      if (!api) return;
      const { gsap, ScrollTrigger } = api;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Gentle animated smoke effects
        if (smokeContainerRef.current) {
          const smokeElements = smokeContainerRef.current.querySelectorAll(".smoke-image");

       smokeElements.forEach((smokeElement, index) => {
  gsap.set(smokeElement, {
    opacity: 0.35 + (index % 3) * 0.08,
    scale: 0.9 + (index % 2) * 0.1,
    transformOrigin: "center center"
  });

  // Continuous upward drift (no yoyo, like smoke rising)
  gsap.to(smokeElement, {
    y: "-=300", // rise up 300px
    duration: 80 + (index % 3) * 20, // slow & natural
    ease: "linear",
    repeat: -1
  });

  // Gentle sideways sway
  gsap.to(smokeElement, {
    x: "+=30", // drift left/right
    duration: 40 + (index % 4) * 10,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  // Opacity breathing
  gsap.to(smokeElement, {
    opacity: 0.25 + (index % 3) * 0.08,
    duration: 50 + (index % 4) * 20,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  // Subtle scale breathing
  gsap.to(smokeElement, {
    scale: 0.85 + (index % 2) * 0.08,
    duration: 60 + (index % 3) * 20,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });
});



          // Slow container drift
          gsap.to(smokeContainerRef.current, {
            y: -10,
            duration: 60,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            force3D: true
          });
        }

        // Static smoke overlay
        if (staticSmokeRef.current) {
          gsap.to(staticSmokeRef.current, {
            opacity: 0.6,
            scale: 1.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: staticSmokeRef.current,
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static foggy background */}
      <div
        ref={staticSmokeRef}
        className="absolute inset-0"
        style={{
          zIndex: -1,
          width: "150%",
          height: "150%",
          left: "-25%",
          top: "-25%"
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

      {/* Animated dense smoke */}
      <div
        ref={smokeContainerRef}
        className="absolute inset-0"
        style={{
          zIndex: 1,
          width: "200%",
          height: "200%",
          left: "-50%",
          top: "-50%"
        }}
      >
        {/* Add multiple layers for depth */}
        <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{ width: "600px", height: "600px", bottom: "0%", left: "0%", opacity: 0.3, mixBlendMode: "multiply" }} />
        <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Smoke" style={{ width: "550px", height: "550px", top: "20%", left: "25%", opacity: 0.28, mixBlendMode: "overlay" }} />
        <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{ width: "500px", height: "500px", top: "40%", left: "60%", opacity: 0.25, mixBlendMode: "screen" }} />
        <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Smoke" style={{ width: "480px", height: "480px", bottom: "30%", right: "40%", opacity: 0.32, mixBlendMode: "multiply" }} />
        <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{ width: "520px", height: "520px", top: "100%", right: "20%", opacity: 0.26, mixBlendMode: "screen" }} />
          <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{ width: "500px", height: "500px", top: "70%", left: "80%", opacity: 0.25, mixBlendMode: "screen" }} />
        <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Smoke" style={{ width: "480px", height: "480px", bottom: "80%", right: "10%", opacity: 0.32, mixBlendMode: "multiply" }} />
        <img className="smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp" alt="Smoke" style={{ width: "520px", height: "520px", top: "90%", right: "30%", opacity: 0.26, mixBlendMode: "screen" }} />
        {/* Animated dense smoke */}
<div
  ref={smokeContainerRef}
  className="absolute inset-0"
  style={{
    zIndex: 1,
    width: "200%",
    height: "200%",
    left: "-50%",
    top: "-50%"
  }}
>
  {/* --- Bottom Layer (Ground Smoke) --- */}
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp"
    alt="Smoke"
    style={{ width: "600px", height: "600px", bottom: "0%", left: "0%", opacity: 0.3, mixBlendMode: "multiply" }}
  />
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp"
    alt="Smoke"
    style={{ width: "550px", height: "550px", bottom: "5%", left: "20%", opacity: 0.28, mixBlendMode: "screen" }}
  />
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp"
    alt="Smoke"
    style={{ width: "580px", height: "580px", bottom: "10%", right: "10%", opacity: 0.26, mixBlendMode: "overlay" }}
  />

  {/* --- Middle Layer (Thicker Smoke in Center) --- */}
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp"
    alt="Smoke"
    style={{ width: "500px", height: "500px", top: "20%", left: "10%", opacity: 0.32, mixBlendMode: "multiply" }}
  />
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp"
    alt="Smoke"
    style={{ width: "450px", height: "450px", top: "35%", left: "35%", opacity: 0.28, mixBlendMode: "screen" }}
  />
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp"
    alt="Smoke"
    style={{ width: "520px", height: "520px", top: "40%", right: "20%", opacity: 0.3, mixBlendMode: "overlay" }}
  />

  {/* --- Top Layer (Light Smoke) --- */}
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp"
    alt="Smoke"
    style={{ width: "480px", height: "480px", top: "5%", left: "15%", opacity: 0.22, mixBlendMode: "multiply" }}
  />
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp"
    alt="Smoke"
    style={{ width: "500px", height: "500px", top: "10%", left: "50%", opacity: 0.25, mixBlendMode: "screen" }}
  />
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp"
    alt="Smoke"
    style={{ width: "520px", height: "520px", top: "0%", right: "10%", opacity: 0.2, mixBlendMode: "overlay" }}
  />

  {/* --- Edge Coverage (To Avoid Empty Gaps) --- */}
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfxlk15g.webp"
    alt="Smoke"
    style={{ width: "400px", height: "400px", bottom: "20%", left: "80%", opacity: 0.28, mixBlendMode: "multiply" }}
  />
  <img className="smoke-image absolute will-change-transform"
    src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp"
    alt="Smoke"
    style={{ width: "380px", height: "380px", top: "60%", right: "0%", opacity: 0.26, mixBlendMode: "screen" }}
  />
</div>

      </div>
    </div>
  );
}
