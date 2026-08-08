"use client";

import React from "react";

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 py-5 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5 transition-all">
      <a
        href="#"
        className="font-serif tracking-[0.25em] text-sm md:text-base uppercase text-[#F5F2EB] hover:text-[#C5A059] transition-colors"
      >
        Lana Del Rey
      </a>
      
      <nav className="hidden md:flex gap-10 text-xs tracking-[0.25em] uppercase text-[#D3CBC0]/80">
        <a
          href="#early-life"
          className="hover:text-[#F5F2EB] transition-colors relative group py-1"
        >
          01. Origins
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
        </a>
        <a
          href="#discography"
          className="hover:text-[#F5F2EB] transition-colors relative group py-1"
        >
          02. Discography
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
        </a>
        <a 
          href="#identity" 
          className="hover:text-[#F5F2EB] transition-colors relative group py-1"
        >
          03. Manifesto
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
        </a>
        <a 
          href="#legacy" 
          className="hover:text-[#F5F2EB] transition-colors relative group py-1"
        >
          04. Legacy
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
        </a>
      </nav>

      <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase border border-[#C5A059]/30 px-3.5 py-1.5 bg-[#121110]/50 backdrop-blur-sm">
        Interactive Monograph
      </span>
    </header>
  );
}