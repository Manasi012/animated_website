"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface ExploreButtonProps {
  label: string; // ✅ Custom text for the button
  onClick?: () => void; // ✅ Optional click handler
}

export default function ExploreButton({ label, onClick }: ExploreButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="flex items-center gap-4 bg-transparent text-blue-900 px-6 py-3 rounded-full transition-colors relative overflow-hidden"
    >
      {/* Left Arrow (hidden initially, shows on hover) */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -20 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white text-blue-900 rounded-full p-4 flex font-normal items-center justify-center"
      >
        <FaArrowRight size={12} />
      </motion.span>

      {/* Text with motion */}
      <motion.span
        animate={{ x: hovered ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="font-semibold tracking-widest"
      >
        {label}
      </motion.span>

      {/* Right Arrow (inside circle) → visible initially, hides on hover */}
      <motion.span
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: hovered ? 0 : 1, x: hovered ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white text-blue-900 rounded-full p-4 flex font-normal items-center justify-center"
      >
        <FaArrowRight size={12} />
      </motion.span>
    </motion.button>
  );
}
