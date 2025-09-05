"use client"
import { useEffect, useRef } from "react"
import { getGsap } from "@/lib/gsap"

const items = [
  { label: "Projects Completed", value: 48 },
  { label: "Investors", value: 120 },
  { label: "Communities Built", value: 22 },
]

export default function Stats() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let ctx: any
    ;(async () => {
      const mod = await getGsap()
      if (!mod || !rootRef.current) return
      const { gsap } = mod

      ctx = gsap.context(() => {
        const counters = gsap.utils.toArray<HTMLSpanElement>(".stat-value")
        counters.forEach((el) => {
          const target = Number(el.dataset.target || "0")
          gsap.fromTo(
            { n: 0 },
            { n: target },
            {
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              onUpdate(self) {
                el.textContent = Math.round(self.targets()[0].n).toString()
              },
            },
          )
        })
      }, rootRef)
    })()
    return () => ctx?.revert()
  }, [])

  return (
    <section id="stats" ref={rootRef} className="bg-slate-50 py-20 text-slate-900">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.label} className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <span className="stat-value block text-4xl font-semibold text-amber-600" data-target={it.value}>
              0
            </span>
            <span className="mt-2 block text-sm text-slate-600">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
