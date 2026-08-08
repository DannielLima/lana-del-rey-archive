"use client";

import React from "react";
import { motion } from "framer-motion";
import { lanaData } from "@/data/lana";

export default function ArtisticIdentity() {
  return (
    <motion.section
      id="identity"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-32 px-6 md:px-16 lg:px-24 bg-[#121110]/40 border-y border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#3A1215]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Coluna do Título e Introdução do Manifesto */}
        <div className="lg:col-span-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-4">
            03 — Visual Manifesto
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F2EB] mb-6 leading-tight">
            The Mythology of Lana
          </h2>
          <p className="text-sm text-[#D3CBC0]/90 leading-relaxed font-light">
            Constructed through a careful synthesis of vintage Americana,
            cinematic melodrama, and poetic vulnerability, her persona
            transcends standard pop stardom.
          </p>
        </div>

        {/* Coluna dos Temas Estéticos */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {lanaData.identityThemes.map((theme, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-8 bg-[#0A0A0A] border border-white/5 flex flex-col justify-between hover:border-[#C5A059]/40 transition-all duration-500 group shadow-lg"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mb-12 block">
                Theme // 0{i + 1}
              </span>
              <div>
                <h3 className="font-serif text-2xl text-[#F5F2EB] mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {theme.title}
                </h3>
                <p className="text-xs text-[#D3CBC0]/80 leading-relaxed font-light">
                  {theme.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}