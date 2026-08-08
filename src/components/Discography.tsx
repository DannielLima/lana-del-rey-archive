"use client";

import React from "react";
import { motion } from "framer-motion";
import { lanaData } from "@/data/lana";

export default function Discography() {
  return (
    <section
      id="discography"
      className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-3">
            02 — Sonic Evolution
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#F5F2EB]">
            Landmark Eras
          </h2>
        </div>
        <p className="text-xs tracking-widest uppercase text-[#D3CBC0]/60 max-w-xs">
          Tracing the transformation of voice, aesthetic, and poetic vision
          across years.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {lanaData.albums.map((album, index) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative bg-[#121110] border border-white/5 overflow-hidden flex flex-col justify-between p-8 hover:border-[#C5A059]/40 transition-all duration-500 shadow-xl"
          >
            <div
              className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-all duration-700 bg-cover bg-center filter grayscale group-hover:grayscale-0"
              style={{ backgroundImage: `url(${album.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/40" />

            <div className="relative z-10 flex justify-between items-start mb-28">
              <span className="font-serif text-3xl text-[#C5A059] font-light">
                0{index + 1}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D3CBC0] bg-black/80 px-3 py-1.5 border border-white/10">
                {album.year}
              </span>
            </div>

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-2 font-medium">
                {album.tagline}
              </span>
              <h3 className="font-serif text-3xl text-[#F5F2EB] mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {album.title}
              </h3>
              <p className="text-sm text-[#D3CBC0]/90 leading-relaxed font-light">
                {album.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
