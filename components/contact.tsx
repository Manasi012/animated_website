"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

export default function Contact() {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    alert("Thanks! We will get back to you shortly.")
  }

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl">Partner with NeoLiv</h2>
            <p className="mt-2 text-foreground/75">
              Interested in learning more about our approach? Send us a message.
            </p>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <div className="col-span-1">
              <label className="block text-sm">Name</label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="you@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm">Message</label>
              <textarea
                required
                rows={5}
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="How can we help?"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-accent text-foreground font-medium rounded-md hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
