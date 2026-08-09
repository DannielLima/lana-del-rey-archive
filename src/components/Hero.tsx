"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { lanaData } from "@/data/lana";
import { motion } from "framer-motion";

export default function LiquidHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uVelo: { value: new THREE.Vector2(0, 0) },
      uTexture: { value: new THREE.Texture() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform vec2 uVelo;
        uniform float uTime;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          float dist = distance(uv, uMouse);
          vec2 venezol = uVelo * 0.08;

          uv += venezol *
                smoothstep(0.4, 0.0, dist) *
                sin(uTime * 4.0);

          float r = texture2D(
            uTexture,
            uv + venezol * 0.02
          ).r;

          float g = texture2D(
            uTexture,
            uv
          ).g;

          float b = texture2D(
            uTexture,
            uv - venezol * 0.02
          ).b;

          vec2 center = vUv - 0.5;
          float vignette = 1.0 - dot(center, center) * 1.2;

          gl_FragColor = vec4(
            vec3(r, g, b) * vignette * 0.75,
            1.0
          );
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let texture: THREE.Texture | null = null;
    let disposed = false;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    textureLoader.load(
      "https://images.unsplash.com/photo-1711808688094-4873349ec56f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      (loadedTexture) => {
        if (disposed) {
          loadedTexture.dispose();
          return;
        }

        loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
        loadedTexture.wrapT = THREE.ClampToEdgeWrapping;

        texture = loadedTexture;
        uniforms.uTexture.value = loadedTexture;
      },
    );

    let mouseX = 0.5;
    let mouseY = 0.5;

    let targetX = 0.5;
    let targetY = 0.5;

    let velX = 0;
    let velY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = 1.0 - e.clientY / window.innerHeight;
    };

    const onResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    let animationFrameId = 0;
    const startTime = performance.now();

    const animate = () => {
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      velX = mouseX - targetX;
      velY = mouseY - targetY;

      uniforms.uMouse.value.set(mouseX, mouseY);
      uniforms.uVelo.value.set(velX, velY);

      uniforms.uTime.value = (performance.now() - startTime) * 0.001;

      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      disposed = true;

      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      if (texture) {
        texture.dispose();
        texture = null;
      }

      if (uniforms.uTexture.value) {
        uniforms.uTexture.value.dispose();
      }

      geometry.dispose();
      material.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-6 opacity-90 font-medium"
        >
          WebGL Interactive Monograph
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight text-[#F5F2EB] mb-6 font-light drop-shadow-2xl"
        >
          {lanaData.hero.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif italic text-lg md:text-2xl text-[#D3CBC0] max-w-2xl font-light drop-shadow-md"
        >
          &ldquo;{lanaData.hero.tagline}&rdquo;
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#D3CBC0]/60">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#C5A059] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
