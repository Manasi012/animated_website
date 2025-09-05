import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import StoryPanels from "@/components/story-panels"
import AboutSplit from "@/components/about-split"
import VerticalsGrid from "@/components/verticals-grid"
import VisionMission from "@/components/vision-mission"
import StatsCounters from "@/components/stats-counters"
import Team from "@/components/team"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutSplit />
      {/* <StoryPanels /> */}
      {/* <VerticalsGrid />
      <VisionMission />
      <StatsCounters />*/}
      <Team /> 
      <Contact />
      <Footer />
    </main>
  )
}
