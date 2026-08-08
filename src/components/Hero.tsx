"use client";

import React from "react";
import { motion } from "framer-motion";
import { lanaData } from "@/data/lana";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0A0A0A] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#0A0A0A] z-10 pointer-events-none" />

      <div
        className="absolute inset-0 bg-cover bg-center scale-105 opacity-45 transition-transform duration-1000 select-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1711808688094-4873349ec56f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      />

      <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none z-20 hidden md:block">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C5A059]/40" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C5A059]/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C5A059]/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C5A059]/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-30 max-w-4xl text-center flex flex-col items-center"
      >
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.35em] text-[#C5A059] mb-4 opacity-90 block"
        >
          Cinematic Monograph
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight text-[#F5F2EB] mb-6 font-light drop-shadow-lg"
        >
          {lanaData.hero.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif italic text-lg md:text-2xl text-[#D3CBC0] max-w-2xl mb-12 font-light leading-relaxed"
        >
          &ldquo;{lanaData.hero.tagline}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#D3CBC0]/70 animate-bounce"
        >
          <span className="w-6 h-[1px] bg-[#C5A059]/50" />
          <span>{lanaData.hero.subtext}</span>
          <span className="w-6 h-[1px] bg-[#C5A059]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
