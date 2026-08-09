"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { lanaData } from "@/data/lana";

const earlyLifeDetails = [
  {
    label: "Birth Name",
    getValue: () => lanaData.earlyLife.birthName,
  },
  {
    label: "Date of Birth",
    getValue: () => lanaData.earlyLife.birthDate,
  },
  {
    label: "Origin",
    getValue: () => lanaData.earlyLife.birthPlace,
  },
];

export default function EarlyLife() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const mouseRectRef = useRef<DOMRect | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const updateGlow = () => {
    animationFrameRef.current = null;

    const glow = glowRef.current;
    const rect = mouseRectRef.current;

    if (!glow || !rect) return;

    const { x, y } = mousePositionRef.current;

    glow.style.background = `radial-gradient(
      400px circle at ${x}px ${y}px,
      rgba(197, 160, 89, 0.12),
      transparent 80%
    )`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = mouseRectRef.current;

    if (!rect) return;

    mousePositionRef.current.x = e.clientX - rect.left;
    mousePositionRef.current.y = e.clientY - rect.top;

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(updateGlow);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseRectRef.current = e.currentTarget.getBoundingClientRect();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseRectRef.current = null;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      id="early-life"
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="py-36 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
    >
      <motion.div
        style={{ y: yParallax }}
        className="lg:col-span-5 lg:sticky lg:top-32"
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-4"
        >
          01 — Origins & Roots
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-5xl md:text-6xl text-[#F5F2EB] mb-8 leading-none font-light"
        >
          Before the Myth
        </motion.h2>

        <div className="space-y-6 border-t border-white/10 pt-6">
          {earlyLifeDetails.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4 + idx * 0.1,
              }}
              className="flex justify-between items-baseline group cursor-default"
            >
              <span className="text-xs tracking-widest text-[#D3CBC0]/50 uppercase group-hover:text-[#C5A059] transition-colors duration-300">
                {item.label}
              </span>

              <span className="font-serif text-base text-[#F5F2EB] group-hover:translate-x-[-4px] transition-transform duration-300">
                {item.getValue()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="lg:col-span-7 bg-[#121110] p-10 md:p-14 border border-white/5 relative shadow-2xl overflow-hidden group"
      >
        {isHovered && (
          <div
            ref={glowRef}
            className="absolute pointer-events-none -inset-px transition duration-300 rounded-xl"
          />
        )}

        <div className="absolute top-0 right-0 w-48 h-48 bg-[#5A181D]/20 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-serif text-4xl text-[#C5A059] mb-6 leading-none"
        >
          “
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-xl md:text-2xl text-[#F5F2EB] leading-relaxed font-light mb-10 relative z-10"
        >
          {lanaData.earlyLife.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#C5A059] relative z-10"
        >
          <div className="hover:text-white transition-colors">
            01 // Lake Placid
          </div>

          <div className="hover:text-white transition-colors">
            02 // New York
          </div>

          <div className="hover:text-white transition-colors">
            03 // Brooklyn
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
