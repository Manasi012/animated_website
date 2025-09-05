"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const stats = [
  { label: "Projects Completed", value: 120 },
  { label: "Investors", value: 450 },
  { label: "Communities Built", value: 35 },
]

export default function Stats() {
  const refs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    refs.current.forEach((el) => {
      if (!el) return
      const end = Number(el.dataset.target || 0)
      const obj = { val: 0 }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      })
      tl.to(obj, {
        val: end,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toString()
        },
      })
    })
  }, [])

  return (
    <div>
      <h2 className="font-serif text-3xl md:text-4xl">Our Impact</h2>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={s.label} className="rounded-lg border bg-background p-6 text-center">
            <span
              ref={(el) => {
                if (el) refs.current[i] = el
              }}
              data-target={s.value}
              className="block font-serif text-3xl md:text-4xl text-primary"
              aria-label={`${s.label}: ${s.value}`}
            >
              0
            </span>
            <span className="mt-1 block text-foreground/75">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
