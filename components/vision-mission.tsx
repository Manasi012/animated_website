"use client"

import { motion } from "framer-motion"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function VisionMission() {
  return (
    <section id="vision" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-serif text-3xl md:text-4xl">Vision & Mission</h2>

          <div className="mt-6 grid md:grid-cols-2 gap-6 md:gap-10">
            <motion.div variants={item} className="rounded-lg border p-6">
              <h3 className="font-serif text-2xl text-primary">Vision</h3>
              <p className="mt-2 text-foreground/75 leading-relaxed">
                To be a trusted partner in building thriving communities and creating sustainable value for generations.
              </p>
            </motion.div>

            <motion.div variants={item} className="rounded-lg border p-6">
              <h3 className="font-serif text-2xl text-primary">Mission</h3>
              <p className="mt-2 text-foreground/75 leading-relaxed">
                We combine strategic capital, disciplined execution, and market insight to deliver outcomes that benefit
                investors and society.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
