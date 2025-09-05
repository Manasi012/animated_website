"use client"
import { useEffect, useRef } from "react"
import { getGsap } from "@/lib/gsap"

const panels = [
  {
    title: "Capital Advisory",
    body: "Strategic guidance across the lifecycle—structuring, fundraising, and long-term stewardship.",
    img: "/timeless-corporate-architecture-closeup.png",
  },
  {
    title: "Real Estate",
    body: "Developing sustainable, human-centric communities—prioritizing livability and resilience.",
    img: "/architectural-lines-minimal-concrete.png",
  },
  {
    title: "Fund Advisory",
    body: "Institutional-grade governance and insights for durable performance and risk management.",
    img: "/city-skyline-dusk-elegant.png",
  },
]

export default function StoryPanels() {
  const rootRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let ctx: any
    ;(async () => {
      const mod = await getGsap()
      if (!mod || !rootRef.current || !trackRef.current) return
      const { gsap, ScrollTrigger } = mod

      const cards = gsap.utils.toArray<HTMLDivElement>(trackRef.current.querySelectorAll(".panel"))

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=2500", // scrub length for the narrative
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        })

        cards.forEach((card, i) => {
          const text = card.querySelector(".panel-text")
          const image = card.querySelector(".panel-image")
          // enter animation
          tl.fromTo(
            card,
            { autoAlpha: i === 0 ? 1 : 0 },
            { autoAlpha: 1, duration: 0.3, ease: "none" },
            i === 0 ? 0 : ">-0.1",
          )
            .fromTo(
              image,
              { scale: 1.1, yPercent: 8, clipPath: "inset(10% 10% 10% 10%)" },
              { scale: 1, yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "power2.out" },
              "<",
            )
            .fromTo(text, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "<0.2")
            // exit fade before next
            .to(card, { autoAlpha: 0, duration: 0.3, ease: "none" }, "+=0.6")
        })
      }, rootRef)
    })()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="story"
      ref={rootRef}
      className="relative flex h-[100svh] items-center justify-center bg-white text-slate-900"
      aria-label="Mont-Fort style storytelling"
    >
      <div ref={trackRef} className="relative h-full w-full">
        {panels.map((p, idx) => (
          <div
            key={idx}
            className="panel absolute inset-0 grid h-full w-full grid-rows-[1fr_auto] opacity-0"
            aria-hidden={idx !== 0}
          >
            <div
              className="panel-image absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${p.img}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
            <div className="relative z-10 mx-auto flex w-full max-w-5xl items-end px-4 pb-16">
              <div className="panel-text max-w-3xl">
                <h2 className="text-balance text-3xl font-semibold md:text-5xl">{p.title}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{p.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
