"use client"
import { motion } from "framer-motion"

const members = [
  { name: "A. Sharma", role: "Managing Partner" },
  { name: "R. Mehta", role: "Head of Real Estate" },
  { name: "S. Kapoor", role: "Director, Fund Advisory" },
  { name: "D. Rao", role: "VP, Capital Advisory" },
]

export default function Team() {
  return (
    <section id="team" className="bg-white py-20 text-slate-900">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-semibold md:text-4xl">Team</h2>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {members.map((m) => (
            <motion.li
              key={m.name}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="rounded-xl border border-slate-200 p-6"
            >
              <div
                className="aspect-square w-full rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: "url('/executive-portrait-corporate-minimal.png')",
                }}
                role="img"
                aria-label={`${m.name} portrait`}
              />
              <div className="mt-3">
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-slate-600">{m.role}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
