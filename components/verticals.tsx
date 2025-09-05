"use client"

import { motion } from "framer-motion"

const items = [
  { title: "NeoLiv Capital Advisory", desc: "Strategic capital solutions tailored to growth and resilience." },
  { title: "Real Estate", desc: "Developing spaces that elevate urban living and community well-being." },
  { title: "Fund Advisory", desc: "Institutional-grade fund strategy, governance, and performance." },
]

export default function Verticals() {
  return (
    <div>
      <h2 className="font-serif text-3xl md:text-4xl text-balance">Business Verticals</h2>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="group rounded-lg border bg-background p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">{it.title}</h3>
              <span className="h-2 w-2 rounded-full bg-accent opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-3 text-foreground/75 leading-relaxed">{it.desc}</p>
            <div className="mt-4 h-[2px] bg-foreground/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </motion.article>
        ))}
      </div>
    </div>
  )
}
