"use client";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function OurPurpose() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const smokeContainerRef = useRef<HTMLDivElement | null>(null);
  const staticSmokeRef = useRef<HTMLDivElement | null>(null);
  const raisingSmokeContainerRef = useRef<HTMLDivElement | null>(null);

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

        // Dense static smoke effects
        if (smokeContainerRef.current) {
          const smokeElements = smokeContainerRef.current.querySelectorAll('.purpose-smoke-image');
          
          smokeElements.forEach((smokeElement, index) => {
            // Set stable initial state
            gsap.set(smokeElement, {
              opacity: 0.3 + (index % 4) * 0.08,
              scale: 0.9 + (index % 3) * 0.1,
              transformOrigin: "center center"
            });

            // Very gentle floating
            gsap.to(smokeElement, {
              y: -12 - (index % 3) * 4,
              duration: 30 + (index % 4) * 20,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Minimal horizontal drift
            gsap.to(smokeElement, {
              x: 8 + (index % 4) * 4,
              duration: 40 + (index % 5) * 15,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Stable opacity changes
            gsap.to(smokeElement, {
              opacity: 0.25 + (index % 3) * 0.06,
              duration: 50 + (index % 4) * 25,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });

            // Minimal scale breathing
            gsap.to(smokeElement, {
              scale: 0.88 + (index % 2) * 0.06,
              duration: 60 + (index % 3) * 30,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              force3D: true
            });
          });

          // Container floating
          gsap.to(smokeContainerRef.current, {
            y: -8,
            duration: 80,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            force3D: true
          });
        }

        // Static background smoke effects
        if (staticSmokeRef.current) {
          gsap.to(staticSmokeRef.current, {
            opacity: 0.5,
            scale: 1.03,
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

        // Bottom raising smoke animation
        if (raisingSmokeContainerRef.current) {
          const raisingSmokeElements = raisingSmokeContainerRef.current.querySelectorAll('.raising-smoke-image');
          
          raisingSmokeElements.forEach((smokeElement, index) => {
            // Set initial position at bottom
            gsap.set(smokeElement, {
              y: window.innerHeight + 150 + (index * 30),
              opacity: 0,
              scale: 0.6 + (index % 3) * 0.15,
              transformOrigin: "center center"
            });

            // Smoke rises from bottom based on scroll
            gsap.to(smokeElement, {
              y: -window.innerHeight - 150,
              opacity: 0.7,
              scale: 1.2 + (index % 2) * 0.3,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8 + (index * 0.15),
                toggleActions: "play reverse play reverse"
              }
            });

            // Fade out at the top
            gsap.to(smokeElement, {
              opacity: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "center top",
                end: "bottom top",
                scrub: 1.2,
                toggleActions: "play reverse play reverse"
              }
            });

            // Horizontal drift during rise
            gsap.to(smokeElement, {
              x: (Math.random() - 0.5) * 200,
              rotation: (Math.random() - 0.5) * 30,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5 + (index * 0.2),
                toggleActions: "play reverse play reverse"
              }
            });
          });
        }
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="purpose"
      ref={sectionRef}
      className="my-[30%] h-auto md:mx-40 relative"
    >
      {/* Enhanced static background smoke layer */}
      <div
        ref={staticSmokeRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          width: '160%',
          height: '160%',
          left: '-30%',
          top: '-30%'
        }}
      >
        <div 
          className="absolute inset-0 opacity-35"
          style={{
            background: `
              radial-gradient(ellipse 120% 90% at 15% 85%, rgba(255,255,255,0.7) 0%, transparent 65%),
              radial-gradient(ellipse 90% 70% at 85% 15%, rgba(200,210,220,0.6) 0%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 50% 50%, rgba(240,245,250,0.5) 0%, transparent 45%),
              radial-gradient(ellipse 100% 80% at 25% 75%, rgba(220,225,235,0.6) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 75% 25%, rgba(210,220,235,0.5) 0%, transparent 50%),
              linear-gradient(135deg, transparent 25%, rgba(240,245,250,0.5) 55%, transparent 85%),
              linear-gradient(45deg, rgba(230,235,245,0.4) 0%, transparent 45%, rgba(210,220,235,0.4) 100%)
            `
          }}
        />
      </div>

      {/* Dense static smoke layer */}
      <div
        ref={smokeContainerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          width: '220%',
          height: '220%',
          left: '-60%',
          top: '-60%'
        }}
      >
        {/* Dense smoke coverage - Multiple layers */}
        
        {/* Bottom dense layer */}
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '650px', height: '650px', bottom: '0%', left: '0%', opacity: 0.32, mixBlendMode: 'multiply'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '600px', height: '600px', bottom: '8%', left: '18%', opacity: 0.28, mixBlendMode: 'screen', transform: 'scaleX(-1)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '620px', height: '620px', bottom: '12%', left: '35%', opacity: 0.3, mixBlendMode: 'overlay'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '580px', height: '580px', bottom: '5%', right: '0%', opacity: 0.34, mixBlendMode: 'multiply', transform: 'scaleY(-1)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '590px', height: '590px', bottom: '15%', right: '25%', opacity: 0.29, mixBlendMode: 'screen'}} />

        {/* Middle dense layer */}
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '550px', height: '550px', top: '25%', left: '8%', opacity: 0.36, mixBlendMode: 'multiply'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '500px', height: '500px', top: '35%', left: '25%', opacity: 0.32, mixBlendMode: 'screen', transform: 'scaleX(-1)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '520px', height: '520px', top: '30%', left: '45%', opacity: 0.34, mixBlendMode: 'overlay'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '560px', height: '560px', top: '20%', right: '8%', opacity: 0.38, mixBlendMode: 'multiply', transform: 'scaleY(-1)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '480px', height: '480px', top: '40%', right: '30%', opacity: 0.3, mixBlendMode: 'screen'}} />

        {/* Top dense layer */}
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '580px', height: '580px', top: '0%', left: '12%', opacity: 0.27, mixBlendMode: 'multiply'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '510px', height: '510px', top: '8%', left: '32%', opacity: 0.24, mixBlendMode: 'screen', transform: 'scaleX(-1)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '540px', height: '540px', top: '12%', left: '52%', opacity: 0.29, mixBlendMode: 'overlay'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '570px', height: '570px', top: '5%', right: '12%', opacity: 0.33, mixBlendMode: 'multiply', transform: 'scaleY(-1)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '490px', height: '490px', top: '15%', right: '35%', opacity: 0.28, mixBlendMode: 'screen'}} />

        {/* Center fill layers */}
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '680px', height: '680px', top: '18%', left: '28%', opacity: 0.22, mixBlendMode: 'multiply'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '630px', height: '630px', top: '28%', left: '38%', opacity: 0.20, mixBlendMode: 'screen', transform: 'scaleX(-1)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '600px', height: '600px', top: '38%', left: '22%', opacity: 0.25, mixBlendMode: 'overlay'}} />

        {/* Additional density layers */}
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '420px', height: '420px', top: '12%', left: '65%', opacity: 0.31, mixBlendMode: 'multiply', transform: 'rotate(45deg)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '440px', height: '440px', top: '52%', left: '12%', opacity: 0.29, mixBlendMode: 'screen', transform: 'rotate(-30deg)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '460px', height: '460px', top: '58%', right: '18%', opacity: 0.32, mixBlendMode: 'overlay', transform: 'rotate(60deg)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '400px', height: '400px', bottom: '22%', left: '48%', opacity: 0.33, mixBlendMode: 'multiply', transform: 'rotate(-45deg)'}} />

        {/* Edge coverage */}
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '380px', height: '380px', top: '65%', left: '2%', opacity: 0.36, mixBlendMode: 'screen'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '390px', height: '390px', top: '75%', right: '2%', opacity: 0.34, mixBlendMode: 'multiply'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '370px', height: '370px', bottom: '55%', left: '78%', opacity: 0.30, mixBlendMode: 'overlay'}} />

        {/* Additional ambient coverage */}
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '350px', height: '350px', top: '45%', left: '70%', opacity: 0.28, mixBlendMode: 'screen', transform: 'rotate(90deg)'}} />
        <img className="purpose-smoke-image absolute will-change-transform" src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp" alt="Purpose Smoke" style={{width: '360px', height: '360px', bottom: '35%', right: '45%', opacity: 0.31, mixBlendMode: 'multiply', transform: 'rotate(-90deg)'}} />
      </div>

      {/* Bottom raising smoke - scroll triggered */}
      <div
        ref={raisingSmokeContainerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 15,
          width: '100%',
          height: '100%'
        }}
      >
        {/* Multiple scroll-triggered raising smoke images */}
        {Array.from({ length: 15 }, (_, index) => (
          <img
            key={index}
            className="raising-smoke-image absolute will-change-transform"
            src="https://magicpage-dev.propstory.com/ImageUploads/Image_Upload/1nnx5eapkmfntgvku.webp"
            alt={`Raising Smoke ${index + 1}`}
            style={{
              width: `${280 + (index % 6) * 40}px`,
              height: `${280 + (index % 6) * 40}px`,
              left: `${(index % 8) * 12.5}%`,
              mixBlendMode: index % 3 === 0 ? 'multiply' : index % 3 === 1 ? 'screen' : 'overlay',
              transform: index % 2 === 0 ? 'scaleX(-1)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-20">
        <div className="flex justify-start items-center gap-40 px-4 md:w-3/4">
          <p className="font-normal text-blue-900 md:text-4xl text-xl leading-14 capitalize">
            The residential real estate sector in India has been affected with distrust & conflict-driven relationships. The whole experience is stressful and far from being a joyous relationship. Moreover, lack of transparency, secure funding, and corporate governance issues have resulted in loss of credibility.
          </p>
        </div>

        <div className="my-[20%] flex justify-end items-center px-4 w-full">
          <p className="font-normal text-blue-900 text-2xl leading-10 max-w-2xl text-left">
            Our Purpose : To build joyful communities and <br /> living experiences through people, <br /> quality and service excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
