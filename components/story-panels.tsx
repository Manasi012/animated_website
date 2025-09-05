"use client"

import { useEffect, useRef } from "react"
import { getGsap } from "@/lib/gsap"

export default function StoryPanels() {
  const rootRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let ctx: any
    ;(async () => {
      const api = await getGsap()
      if (!api || !rootRef.current || !trackRef.current) return
      const { gsap, ScrollTrigger } = api

      const cards = gsap.utils.toArray<HTMLDivElement>(trackRef.current.querySelectorAll(".panel"))

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: `+=${cards.length * 1200}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            snap: cards.length > 1 ? 1 / (cards.length - 1) : 1,
          },
        })

        cards.forEach((card, i) => {
          const text = card.querySelector(".panel-text")
          const image = card.querySelector(".panel-image")

          tl.fromTo(
            card,
            { autoAlpha: i === 0 ? 1 : 0 },
            { autoAlpha: 1, duration: 0.25, ease: "none" },
            i === 0 ? 0 : ">-0.08",
          )
            .fromTo(
              image,
              { scale: 1.1, yPercent: 8, clipPath: "inset(10% 10% 10% 10%)" },
              { scale: 1, yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "power2.out" },
              "<",
            )
            .fromTo(text, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "<0.2")
            .to(card, { autoAlpha: 0, duration: 0.28, ease: "none" }, "+=0.6")
        })
      }, rootRef)
    })()

    return () => ctx?.revert()
  }, [])

  const panels = [
    {
      title: "NeoLiv Capital Advisory",
      body: "Strategic guidance across the lifecycle—structuring, fundraising, and long-term stewardship with institutional rigor.",
      img: "/architectural-facade-minimal-luxury.png",
    },
    {
      title: "Real Estate",
      body: "Developing sustainable, human-centric communities prioritizing livability, quality, and resilience over cycles.",
      img: "/minimal-concrete-architecture-lines.png",
    },
    {
      title: "Fund Advisory",
      body: "Institutional-grade governance and insight to drive durable performance with thoughtful risk management.",
      img: "/city-skyline-dusk-elegant.png",
    },
  ]

  return (
    <section
      id="story"
      ref={rootRef}
      className="relative flex h-[100svh] items-center justify-center bg-white text-slate-900"
      aria-label="Scroll storytelling"
    >
      <div ref={trackRef} className="relative h-full w-full">
        {panels.map((p, idx) => (
          <div
            key={idx}
            className="panel absolute inset-0 grid h-full w-full grid-rows-[1fr_auto] opacity-0 will-change-[opacity,transform]"
            aria-hidden={idx !== 0}
          >
            <div
              className="panel-image absolute inset-0 bg-cover bg-center will-change-[transform] scale-100"
              style={{ backgroundImage: `url('${p.img}')` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-white via-white/75 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto flex w-full max-w-5xl items-end px-6 pb-16">
              <div className="panel-text max-w-3xl will-change-[transform,opacity]">
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
