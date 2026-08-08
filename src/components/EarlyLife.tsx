"use client";

import React from "react";
import { motion } from "framer-motion";
import { lanaData } from "@/data/lana";

export default function EarlyLife() {
  return (
    <motion.section
      id="early-life"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-4">
            01 — Origins & Roots
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#F5F2EB] mb-8 leading-none font-light">
            Before the Myth
          </h2>

          <div className="space-y-6 border-t border-white/10 pt-6">
            <div className="flex justify-between items-baseline">
              <span className="text-xs tracking-widest text-[#D3CBC0]/50 uppercase">
                Birth Name
              </span>
              <span className="font-serif text-base text-[#F5F2EB]">
                {lanaData.earlyLife.birthName}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs tracking-widest text-[#D3CBC0]/50 uppercase">
                Date of Birth
              </span>
              <span className="font-serif text-base text-[#F5F2EB]">
                {lanaData.earlyLife.birthDate}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs tracking-widest text-[#D3CBC0]/50 uppercase">
                Origin
              </span>
              <span className="font-serif text-base text-[#F5F2EB]">
                {lanaData.earlyLife.birthPlace}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#121110] p-10 md:p-14 border border-white/5 relative shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A181D]/20 blur-3xl pointer-events-none" />

          <div className="font-serif text-4xl text-[#C5A059] mb-6 leading-none">
            “
          </div>

          <p className="font-serif text-xl md:text-2xl text-[#F5F2EB] leading-relaxed font-light mb-10">
            {lanaData.earlyLife.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#C5A059]">
            <div>01 // Lake Placid</div>
            <div>02 // New York</div>
            <div>03 // Brooklyn</div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
