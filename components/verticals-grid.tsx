"use client"

import { motion } from "framer-motion"

const items = [
  { title: "NeoLiv Capital Advisory", copy: "Strategic capital solutions and investor partnerships." },
  { title: "Real Estate", copy: "Development and asset management across urban growth corridors." },
  { title: "Fund Advisory", copy: "Institutional-grade structures and governance for enduring value." },
]

export default function VerticalsGrid() {
  return (
    <section id="verticals" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h3 className="font-serif text-3xl font-semibold text-slate-900 md:text-4xl">Business Verticals</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group rounded-lg border border-slate-200 bg-white p-6"
            >
              <h4 className="font-serif text-xl font-semibold text-slate-900">{it.title}</h4>
              <p className="mt-2 text-slate-600">{it.copy}</p>
              <span className="mt-6 inline-block h-[2px] w-10 bg-amber-500 transition-all group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
