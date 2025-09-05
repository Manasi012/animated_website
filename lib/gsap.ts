export async function getGsap() {
  if (typeof window === "undefined") return null
  const gsap = (await import("gsap")).default
  const { ScrollTrigger } = await import("gsap/ScrollTrigger")
  gsap.registerPlugin(ScrollTrigger)
  return { gsap, ScrollTrigger }
}
