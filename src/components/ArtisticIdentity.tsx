"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { lanaData } from "@/data/lana";

export default function ArtisticIdentity() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;

    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    // Cena WebGL para Partículas Etéreas / Douradas
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Criação das partículas
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;

      positions[i + 1] = (Math.random() - 0.5) * 6;

      positions[i + 2] = (Math.random() - 0.5) * 5;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc5a059,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);

    scene.add(particles);

    let animationFrameId: number | null = null;
    let isVisible = true;
    let disposed = false;

    const startTime = performance.now();

    const render = (elapsedTime: number) => {
      if (disposed || !isVisible) return;

      particles.rotation.y = elapsedTime * 0.03;

      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      renderer.render(scene, camera);
    };

    const animate = (time: number) => {
      animationFrameId = null;

      if (disposed || !isVisible) return;

      const elapsedTime = (time - startTime) * 0.001;

      render(elapsedTime);

      animationFrameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (disposed || !isVisible || animationFrameId !== null) {
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);

        animationFrameId = null;
      }
    };

    const handleResize = () => {
      if (disposed) return;

      const nextWidth = container.clientWidth;

      const nextHeight = container.clientHeight;

      if (nextWidth === 0 || nextHeight === 0) {
        return;
      }

      camera.aspect = nextWidth / nextHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(nextWidth, nextHeight);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      {
        threshold: 0,
      },
    );

    intersectionObserver.observe(container);

    window.addEventListener("resize", handleResize);

    // Render inicial
    render(0);

    // Inicia somente se estiver visível
    startAnimation();

    return () => {
      disposed = true;

      stopAnimation();

      intersectionObserver.disconnect();

      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <motion.section
      id="identity"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{
        once: true,
        margin: "-100px",
      }}
      transition={{ duration: 1 }}
      className="py-36 px-6 md:px-16 lg:px-24 bg-[#121110]/40 border-y border-white/5 relative overflow-hidden"
    >
      {/* Background WebGL Interativo / Partículas */}
      <div
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#3A1215]/20 blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Coluna do Título e Introdução do Manifesto */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="lg:col-span-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-4">
            03 — Visual Manifesto
          </span>

          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F2EB] mb-6 leading-tight font-light">
            The Mythology of Lana
          </h2>

          <p className="text-sm text-[#D3CBC0]/90 leading-relaxed font-light">
            Constructed through a careful synthesis of vintage Americana,
            cinematic melodrama, and poetic vulnerability, her persona
            transcends standard pop stardom.
          </p>
        </motion.div>

        {/* Coluna dos Temas Estéticos com Cards Interativos */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {lanaData.identityThemes.map((theme, i) => (
            <motion.div
              key={theme.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-50px",
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
              }}
              className="p-8 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/5 flex flex-col justify-between hover:border-[#C5A059]/40 transition-all duration-500 group shadow-2xl relative overflow-hidden"
            >
              {/* Efeito de brilho interno sutil no topo do card */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mb-12 block group-hover:tracking-[0.3em] transition-all duration-300">
                Theme // 0{i + 1}
              </span>

              <div>
                <h3 className="font-serif text-2xl text-[#F5F2EB] mb-3 group-hover:translate-x-1 transition-transform duration-300 font-light">
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
