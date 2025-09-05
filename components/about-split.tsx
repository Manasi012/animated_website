"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutSplit() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <h3 className="font-serif text-3xl font-semibold text-slate-900 md:text-4xl">About NeoLiv</h3>
          <p className="text-slate-600">
            NeoLiv is a real estate platform focused on capital advisory, fund advisory, and development strategies that
            elevate urban living while creating long-term stakeholder value.
          </p>
          <p className="text-slate-600">
            With disciplined governance and an investor-first approach, we deliver outcomes rooted in insight,
            integrity, and sustainability.
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
        >
          <Image src="/neoliv-team-discussion-boardroom.png" alt="NeoLiv team collaborating" fill className="object-cover" />
        </motion.div>
      </div>
    </section>
  )
}
