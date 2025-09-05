"use client"

import { motion } from "framer-motion"

const team = [
  { name: "A. Sharma", title: "Managing Partner" },
  { name: "R. Gupta", title: "Head of Real Estate" },
  { name: "S. Mehta", title: "Director, Fund Advisory" },
  { name: "K. Rao", title: "Principal, Capital Advisory" },
]

export default function Team() {
  return (
    <section id="team" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-serif text-3xl md:text-4xl">Leadership Team</h2>
        <motion.div
          className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {team.map((m) => (
            <motion.article
              key={m.name}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="rounded-lg overflow-hidden border bg-background"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/corporate-executive-portrait.png"
                  alt={`${m.name} portrait`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg">{m.name}</h3>
                <p className="text-foreground/75 text-sm mt-1">{m.title}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
