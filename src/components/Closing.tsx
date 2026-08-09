"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

export default function Closing() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;

    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    // Cena WebGL para o Epílogo
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Geometria do Torus / Anel Sutil Giratório
    const geometry = new THREE.TorusGeometry(1.8, 0.02, 16, 100);

    const material = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      transparent: true,
      opacity: 0.25,
    });

    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    let animationFrameId: number | null = null;
    let isVisible = true;
    let disposed = false;

    const startTime = performance.now();

    const render = (time: number) => {
      if (disposed || !isVisible) return;

      const elapsedTime = (time - startTime) * 0.001;

      torus.rotation.x = elapsedTime * 0.15;

      torus.rotation.y = elapsedTime * 0.2;

      renderer.render(scene, camera);
    };

    const animate = (time: number) => {
      animationFrameId = null;

      if (disposed || !isVisible) {
        return;
      }

      render(time);

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
    render(startTime);

    // Anima somente enquanto estiver visível
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
      id="legacy"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{
        once: true,
        margin: "-100px",
      }}
      transition={{ duration: 1 }}
      className="py-36 px-6 md:px-16 lg:px-24 relative overflow-hidden border-t border-white/5 bg-[#0A0A0A]"
    >
      {/* Background WebGL Interativo */}
      <div
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Gradientes e Luzes Atmosféricas */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#3A1215]/20 via-transparent to-[#0A0A0A] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-4"
        >
          04 — Epilogue & Legacy
        </motion.span>

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="font-serif text-4xl md:text-6xl text-[#F5F2EB] mb-8 leading-tight max-w-3xl font-light"
        >
          A Permanent Imprint on Modern Songwriting
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="font-serif italic text-xl md:text-2xl text-[#D3CBC0] mb-20 font-light max-w-2xl"
        >
          &ldquo;She shaped the emotional vocabulary of a generation, proving
          that melancholy can be high art.&rdquo;
        </motion.p>

        {/* Bloco de Créditos com Efeito de Borda Iluminada */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 text-left">
          {[
            {
              label: "Presentation & Written by",
              value: "Sua Amiga",
              isLink: false,
            },
            {
              label: "Developed by",
              value: "Karlão",
              isLink: false,
            },
            {
              label: "Source Code",
              value: "github.com/DannielLima/lana-del-rey-archive",
              isLink: true,
              href: "https://github.com/DannielLima/lana-del-rey-archive",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.15,
              }}
              className="p-6 bg-[#121110]/80 backdrop-blur-md border border-white/5 hover:border-[#C5A059]/40 transition-all duration-500 shadow-xl flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Brilho interno dinâmico */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
                  {item.label}
                </span>

                <p className="font-serif text-lg text-[#F5F2EB] truncate mb-4">
                  {item.value}
                </p>
              </div>

              {item.isLink && item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-widest text-[#C5A059] hover:text-[#F5F2EB] transition-colors inline-flex items-center gap-1 group/link"
                >
                  View Repository{" "}
                  <span className="group-hover/link:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
