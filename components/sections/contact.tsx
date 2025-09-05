"use client"
import { motion } from "framer-motion"

export default function Contact() {
  return (
    <section id="contact" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-3xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold md:text-4xl"
        >
          Let’s build something enduring
        </motion.h2>
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 gap-4"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <label className="block">
            <span className="sr-only">Name</span>
            <input
              type="text"
              required
              placeholder="Name"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-amber-500"
            />
          </label>
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-amber-500"
            />
          </label>
          <label className="block">
            <span className="sr-only">Message</span>
            <textarea
              required
              placeholder="How can we help?"
              rows={5}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-amber-500"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-md bg-amber-500 px-5 py-3 font-medium text-slate-950 transition-colors hover:bg-amber-400"
          >
            Send message
          </button>
        </motion.form>
      </div>
    </section>
  )
}
