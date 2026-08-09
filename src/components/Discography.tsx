"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { lanaData } from "@/data/lana";

function AlbumCanvas({ image }: { image: string }) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(4.5, 6, 32, 32);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: {
        value: new THREE.Vector2(0.5, 0.5),
      },
      uHover: { value: 0 },
      uTexture: {
        value: new THREE.Texture(),
      },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,

      vertexShader: `
        uniform float uTime;
        uniform float uHover;

        varying vec2 vUv;

        void main() {
          vUv = uv;

          vec3 pos = position;

          float wave =
            sin(pos.x * 2.0 + uTime * 2.0) *
            cos(pos.y * 2.0 + uTime * 2.0);

          pos.z += wave * 0.2 * uHover;

          gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(pos, 1.0);
        }
      `,

      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform float uHover;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          float dist = distance(uv, uMouse);

          vec2 offset =
            (uv - uMouse) *
            smoothstep(0.5, 0.0, dist) *
            uHover *
            0.15;

          vec4 texColor =
            texture2D(uTexture, uv + offset);

          float grayscale =
            dot(
              texColor.rgb,
              vec3(0.299, 0.587, 0.114)
            );

          vec3 finalColor =
            mix(
              vec3(grayscale * 0.3),
              texColor.rgb,
              uHover * 0.8 + 0.2
            );

          vec2 center = vUv - 0.5;

          float vignette =
            1.0 - dot(center, center) * 1.5;

          gl_FragColor =
            vec4(finalColor * vignette, 1.0);
        }
      `,

      side: THREE.FrontSide,
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    let texture: THREE.Texture | null = null;
    let disposed = false;

    const textureLoader = new THREE.TextureLoader();

    textureLoader.setCrossOrigin("anonymous");

    textureLoader.load(image, (loadedTexture) => {
      if (disposed) {
        loadedTexture.dispose();
        return;
      }

      loadedTexture.wrapS = THREE.ClampToEdgeWrapping;

      loadedTexture.wrapT = THREE.ClampToEdgeWrapping;

      texture = loadedTexture;
      uniforms.uTexture.value = loadedTexture;

      // A textura acabou de chegar.
      // Um render é suficiente enquanto não houver hover.
      render();
    });

    let targetHover = 0;
    let currentHover = 0;

    let animationFrameId: number | null = null;

    let isVisible = true;
    let isPointerInside = false;

    let lastTime = performance.now();

    let mouseRect: DOMRect | null = null;

    const render = () => {
      if (disposed || !isVisible) return;

      renderer.render(scene, camera);
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const animate = (time: number) => {
      animationFrameId = null;

      if (disposed || !isVisible) {
        return;
      }

      const delta = Math.min((time - lastTime) * 0.001, 0.05);

      lastTime = time;

      const hoverDifference = targetHover - currentHover;

      currentHover += hoverDifference * Math.min(delta * 6, 1);

      uniforms.uHover.value = currentHover;

      uniforms.uTime.value = time * 0.001;

      renderer.render(scene, camera);

      const hoverFinished = Math.abs(targetHover - currentHover) < 0.001;

      if (hoverFinished) {
        currentHover = targetHover;
        uniforms.uHover.value = currentHover;

        if (currentHover === 0) {
          render();
          return;
        }

        if (isPointerInside) {
          animationFrameId = requestAnimationFrame(animate);
        }

        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (disposed || !isVisible || animationFrameId !== null) {
        return;
      }

      lastTime = performance.now();

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseRect) return;

      const x = (e.clientX - mouseRect.left) / mouseRect.width;

      const y = 1 - (e.clientY - mouseRect.top) / mouseRect.height;

      uniforms.uMouse.value.set(x, y);

      render();
    };

    const handleMouseEnter = () => {
      mouseRect = container.getBoundingClientRect();

      isPointerInside = true;
      targetHover = 1;

      startAnimation();
    };

    const handleMouseLeave = () => {
      isPointerInside = false;
      mouseRect = null;
      targetHover = 0;

      startAnimation();
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

      if (isVisible) {
        render();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (!isVisible) {
          stopAnimation();
          return;
        }

        render();

        if (isPointerInside || currentHover !== targetHover) {
          startAnimation();
        }
      },
      {
        threshold: 0,
      },
    );

    intersectionObserver.observe(container);

    container.addEventListener("mousemove", handleMouseMove);

    container.addEventListener("mouseenter", handleMouseEnter);

    container.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("resize", handleResize);

    // Render inicial.
    render();

    return () => {
      disposed = true;

      stopAnimation();

      intersectionObserver.disconnect();

      container.removeEventListener("mousemove", handleMouseMove);

      container.removeEventListener("mouseenter", handleMouseEnter);

      container.removeEventListener("mouseleave", handleMouseLeave);

      window.removeEventListener("resize", handleResize);

      if (texture) {
        texture.dispose();
        texture = null;
      }

      uniforms.uTexture.value.dispose();

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [image]);

  return <div ref={canvasContainerRef} className="absolute inset-0" />;
}

export default function Discography() {
  return (
    <section className="py-36 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <motion.div
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
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-4">
            02 — Sonic Evolution
          </span>

          <h2 className="font-serif text-5xl md:text-6xl text-[#F5F2EB] leading-none font-light">
            Landmark Eras
          </h2>
        </motion.div>

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
          className="text-xs tracking-widest uppercase text-[#D3CBC0]/60 max-w-xs"
        >
          Tracing the transformation of voice, aesthetic, and poetic vision
          across years.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {lanaData.albums.map((album, index) => (
          <motion.div
            key={album.id}
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
              delay: index * 0.2,
            }}
            className="group relative bg-[#121110] border border-white/5 overflow-hidden flex flex-col justify-between h-[520px] p-8 hover:border-[#C5A059]/40 transition-all duration-500 shadow-2xl"
          >
            <AlbumCanvas image={album.image} />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />

            <div className="relative z-20 flex justify-between items-start">
              <span className="font-serif text-3xl text-[#C5A059] font-light">
                0{index + 1}
              </span>

              <span className="text-[10px] uppercase tracking-widest text-[#D3CBC0] bg-black/80 px-3 py-1.5 border border-white/10 backdrop-blur-md">
                {album.year}
              </span>
            </div>

            <div className="relative z-20">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-2 font-medium">
                {album.tagline}
              </span>

              <h3 className="font-serif text-3xl text-[#F5F2EB] mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {album.title}
              </h3>

              <p className="text-sm text-[#D3CBC0]/90 leading-relaxed font-light line-clamp-3">
                {album.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
