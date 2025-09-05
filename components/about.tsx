"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-serif text-3xl md:text-4xl text-balance">About NeoLiv</h2>
        <p className="mt-4 text-foreground/75 leading-relaxed">
          NeoLiv is a forward-thinking firm focused on building communities and creating long-term value. Our
          multidisciplinary approach spans capital advisory, real estate development, and fund advisory—aligning
          strategy with execution to deliver sustainable outcomes.
        </p>
        <p className="mt-3 text-foreground/75 leading-relaxed">
          With a commitment to excellence and a deep understanding of markets, we guide investors, partners, and
          communities toward enduring success.
        </p>
      </motion.div>

      <motion.div
        className="relative aspect-[16/10] rounded-lg overflow-hidden"
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/neo-urban-community-architecture.png"
          alt="NeoLiv community development"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  )
}
