"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import StoryPanels from "@/components/story-panels"
import About from "@/components/about"
import Verticals from "@/components/verticals"
import VisionMission from "@/components/vision-mission"
import Stats from "@/components/stats"
import Team from "@/components/team"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { registerGsap } from "@/lib/gsap-setup"

export default function Page() {
  useEffect(() => {
    registerGsap()
  }, [])

  return (
    <main>
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="story">
        <StoryPanels />
      </section>

      <section id="about" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <About />
        </div>
      </section>

      <section id="verticals" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <Verticals />
        </div>
      </section>

      <section id="vision" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <VisionMission />
        </div>
      </section>

      <section id="stats" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Stats />
        </div>
      </section>

      <section id="team" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Team />
        </div>
      </section>

      <section id="contact" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Contact />
        </div>
      </section>

      <Footer />
    </main>
  )
}
