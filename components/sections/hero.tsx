"use client"
import { useEffect, useRef } from "react"
import { getGsap } from "@/lib/gsap"
import { motion } from "framer-motion"

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const linesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let ctx: any
    ;(async () => {
      const mod = await getGsap()
      if (!mod || !sectionRef.current) return
      const { gsap, ScrollTrigger } = mod

      ctx = gsap.context(() => {
        // Parallax the background
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })

        // Masked line reveals
        const lines = linesRef.current?.querySelectorAll(".reveal-line") ?? []
        gsap.from(lines, {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=10% center",
            once: true,
          },
        })
      }, sectionRef)
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Hero"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/luxury-corporate-architecture-skyline.png')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400"
        >
          NeoLiv
        </motion.p>
        <div ref={linesRef} className="space-y-2">
          <h1 className="text-pretty text-4xl font-semibold leading-tight text-white md:text-6xl">
            <span className="reveal-line block overflow-hidden">Building Communities,</span>
            <span className="reveal-line block overflow-hidden">Creating Value</span>
          </h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200"
        >
          A long-term approach to real estate and capital advisory with a focus on quality, trust, and lasting impact.
        </motion.p>
      </div>
    </section>
  )
}
