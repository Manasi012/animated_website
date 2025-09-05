"use client";

import React, { useEffect, useRef } from "react";
import { FaAward, FaBuilding, FaUsers, FaLightbulb, FaGlobe, FaChartLine } from "react-icons/fa";
import { getGsap } from "@/lib/gsap"; // your gsap helper

type Credential = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const credentials: Credential[] = [
  { icon: <FaAward className="text-blue-900 w-8 h-8" />, title: "Award-Winning Leadership", description: "Recognized for outstanding contributions in real estate and innovation." },
  { icon: <FaBuilding className="text-blue-900 w-8 h-8" />, title: "Expert in Development", description: "Led large-scale residential and commercial projects successfully." },
  { icon: <FaUsers className="text-blue-900 w-8 h-8" />, title: "Team Builder", description: "Built high-performing teams driving organizational excellence." },
  { icon: <FaLightbulb className="text-blue-900 w-8 h-8" />, title: "Visionary Strategist", description: "Developed long-term strategies to transform businesses." },
  { icon: <FaGlobe className="text-blue-900 w-8 h-8" />, title: "Global Exposure", description: "Experience in international markets and cross-cultural leadership." },
  { icon: <FaChartLine className="text-blue-900 w-8 h-8" />, title: "Market Leadership", description: "Transformed companies into market leaders with sustainable growth." },
];

const WhoAreWe: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    (async () => {
      const api = await getGsap();
      if (!api) return;
      const { gsap, ScrollTrigger } = api;

      gsap.registerPlugin(ScrollTrigger);

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        });
      });
    })();
  }, []);

  return (
    <section id="who-are-we" className="py-16 bg-transparent h-auto">
      <div className="container mx-auto md:px-28 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12">
          Who Are We?
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  {credentials.map((cred, index) => (
    <div
      key={index}
      ref={(el) => {
        if (el) cardsRef.current[index] = el;
      }}
      className="flex flex-col items-start p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-gray-50"
    >
      <div className="mb-4">{cred.icon}</div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{cred.title}</h3>
      <p className="text-gray-700 text-sm">{cred.description}</p>
    </div>
  ))}
</div>


        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-4">
            Founded by Mohit Malhotra
          </h3>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Ex MD & CEO of Godrej Properties, who transformed Godrej Properties into a market
            leader in his 12 years journey. His vision, leadership, and expertise have been
            instrumental in building a strong foundation for NeoLiv.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
