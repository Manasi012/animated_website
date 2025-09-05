"use client"

import { useEffect, useRef } from "react"
import { getGsap } from "@/lib/gsap"

const stats = [
  { label: "Projects Completed", value: 120 },
  { label: "Investors", value: 450 },
  { label: "Communities Built", value: 35 },
]

export default function StatsCounters() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const numRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    let ctx: any
    ;(async () => {
      const api = await getGsap()
      if (!api || !containerRef.current) return
      const { gsap, ScrollTrigger } = api

      ctx = gsap.context(() => {
        numRefs.current.forEach((el) => {
          const target = Number(el.dataset.target || "0")
          const obj = { val: 0 }
          gsap.fromTo(
            obj,
            { val: 0 },
            {
              val: target,
              roundProps: "val",
              duration: 1.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
              },
              onUpdate: () => {
                el.textContent = obj.val.toString()
              },
            },
          )
        })
      }, containerRef)
    })()
    return () => ctx && ctx.revert()
  }, [])

  return (
    <section id="stats" className="bg-slate-900 text-white">
      <div ref={containerRef} className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-3">
        {stats.map((s, i) => (
          <div key={s.label} className="rounded-md border border-white/10 bg-white/5 p-6">
            <span
              ref={(el) => {
                if (el) numRefs.current[i] = el
              }}
              data-target={s.value}
              className="block font-serif text-4xl font-semibold text-amber-400"
            >
              0
            </span>
            <span className="mt-2 block text-sm text-white/80">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
