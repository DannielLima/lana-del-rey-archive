"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Closing() {
  return (
    <motion.section
      id="legacy"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#3A1215]/20 via-[#0A0A0A] to-[#0A0A0A] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-4">
          04 — Epilogue & Legacy
        </span>

        <h2 className="font-serif text-4xl md:text-6xl text-[#F5F2EB] mb-8 leading-tight max-w-3xl">
          A Permanent Imprint on Modern Songwriting
        </h2>

        <p className="font-serif italic text-xl md:text-2xl text-[#D3CBC0] mb-16 font-light max-w-2xl">
          &ldquo;She shaped the emotional vocabulary of a generation, proving
          that melancholy can be high art.&rdquo;
        </p>

        {/* Bloco de Créditos com Nomes e Repositório */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 bg-[#121110]/60 border border-white/5 hover:border-[#C5A059]/40 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
              Presentation & Written by
            </span>
            <p className="font-serif text-lg text-[#F5F2EB]">Sua Amiga</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 bg-[#121110]/60 border border-white/5 hover:border-[#C5A059]/40 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
              Developed by
            </span>
            <p className="font-serif text-lg text-[#F5F2EB]">Danniel Lima</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-6 bg-[#121110]/60 border border-white/5 hover:border-[#C5A059]/40 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
                Source Code
              </span>
              <p className="font-serif text-xs text-[#D3CBC0] truncate mb-4">
                github.com/DannielLima/lana-del-rey-archive
              </p>
            </div>
            <a
              href="https://github.com/DannielLima/lana-del-rey-archive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest text-[#C5A059] hover:text-[#F5F2EB] transition-colors inline-flex items-center gap-1 group"
            >
              View Repository{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}