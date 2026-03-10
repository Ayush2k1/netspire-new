"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fluidShader, displayShader } from "../../shaders";
import { Button } from "../../ui/button";
import Link from "next/link";

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

export default function GradientHero() {
  const brushSize = 25.0;
  const brushStrength = 0.5;
  const distortionAmount = 2.5;
  const fluidDecay = 0.98;
  const trailLength = 0.8;
  const stopDecay = 0.85;
  const colorIntensity = 1.0;
  const softness = 1.0;
  const colors: [string, string, string, string] = [
    "#b8fff7",
    "#6e3466",
    "#0133ff",
    "#66d1fe",
  ];
  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const simScale = 0.5;
    const simW = Math.floor(width * simScale);
    const simH = Math.floor(height * simScale);

    const makeTarget = (w: number, h: number) =>
      new THREE.WebGLRenderTarget(w, h, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      });

    let fluidTarget1 = makeTarget(simW, simH);
    let fluidTarget2 = makeTarget(simW, simH);
    let currentFluidTarget = fluidTarget1;
    let previousFluidTarget = fluidTarget2;
    let frameCount = 0;

    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(simW, simH) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: brushSize },
        uBrushStrength: { value: brushStrength },
        uFluidDecay: { value: fluidDecay },
        uTrailLength: { value: trailLength },
        uStopDecay: { value: stopDecay },
      },
      vertexShader,
      fragmentShader: fluidShader,
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(width, height) },
        iFluid: { value: null },
        uDistortionAmount: { value: distortionAmount },
        uColor1: { value: new THREE.Vector3(...hexToRgb(colors[0])) },
        uColor2: { value: new THREE.Vector3(...hexToRgb(colors[1])) },
        uColor3: { value: new THREE.Vector3(...hexToRgb(colors[2])) },
        uColor4: { value: new THREE.Vector3(...hexToRgb(colors[3])) },
        uColorIntensity: { value: colorIntensity },
        uSoftness: { value: softness },
      },
      vertexShader,
      fragmentShader: displayShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
    const displayPlane = new THREE.Mesh(geometry, displayMaterial);

    let mouseX = 0,
      mouseY = 0,
      prevMouseX = 0,
      prevMouseY = 0,
      lastMoveTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = (e.clientX - rect.left) * simScale;
      mouseY = (rect.height - (e.clientY - rect.top)) * simScale;
      lastMoveTime = performance.now();
      fluidMaterial.uniforms.iMouse.value.set(
        mouseX,
        mouseY,
        prevMouseX,
        prevMouseY,
      );
    };

    const onMouseLeave = () => {
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = container.getBoundingClientRect();
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = (touch.clientX - rect.left) * simScale;
      mouseY = (rect.height - (touch.clientY - rect.top)) * simScale;
      lastMoveTime = performance.now();
      fluidMaterial.uniforms.iMouse.value.set(
        mouseX,
        mouseY,
        prevMouseX,
        prevMouseY,
      );
    };

    const onTouchEnd = () => {
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", onMouseMove);
      section.addEventListener("mouseleave", onMouseLeave);
      section.addEventListener("touchmove", onTouchMove, { passive: true });
      section.addEventListener("touchend", onTouchEnd);
    }

    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    let smoothTime = 0;
    const timeStep = 1 / targetFPS;

    const animate = (now: number) => {
      animationId = requestAnimationFrame(animate);
      const delta = now - lastFrameTime;
      if (delta < frameInterval) return;
      lastFrameTime = now - (delta % frameInterval);
      smoothTime += timeStep;
      fluidMaterial.uniforms.iTime.value = smoothTime;
      displayMaterial.uniforms.iTime.value = smoothTime;
      fluidMaterial.uniforms.iFrame.value = frameCount;
      if (now - lastMoveTime > 100)
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
      fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
      renderer.setRenderTarget(currentFluidTarget);
      renderer.render(fluidPlane, camera);
      displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayPlane, camera);
      const temp = currentFluidTarget;
      currentFluidTarget = previousFluidTarget;
      previousFluidTarget = temp;
      frameCount++;
    };

    animationId = requestAnimationFrame(animate);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const sw = Math.floor(w * simScale);
      const sh = Math.floor(h * simScale);
      renderer.setSize(w, h);
      fluidMaterial.uniforms.iResolution.value.set(sw, sh);
      displayMaterial.uniforms.iResolution.value.set(w, h);
      fluidTarget1.setSize(sw, sh);
      fluidTarget2.setSize(sw, sh);
      frameCount = 0;
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      if (section) {
        section.removeEventListener("mousemove", onMouseMove);
        section.removeEventListener("mouseleave", onMouseLeave);
        section.removeEventListener("touchmove", onTouchMove);
        section.removeEventListener("touchend", onTouchEnd);
      }
      renderer.dispose();
      geometry.dispose();
      fluidMaterial.dispose();
      displayMaterial.dispose();
      fluidTarget1.dispose();
      fluidTarget2.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen  overflow-x-hidden! section-padding"
    >
      {/* WebGL gradient background */}
      <div
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 "
      />

      {/* Float animations */}
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 6s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite 0.5s; }
      `}</style>

      {/* Hero content */}
      <div
        className="relative w-full  h-full pointer-events-none flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-container mx-auto "
        style={{
          fontFamily: "'Neue Montreal', 'General Sans', 'Satoshi', sans-serif",
        }}
      >
        <div className="flex flex-col gap-4 lg:gap-5  my-auto">
          <div className="flex items-center gap-3 text-white">
            <div className="w-4 h-px bg-white" />
            <span className="text-xs uppercase tracking-[0.2em]">
              Netspire Studio
            </span>
          </div>

          <h1 className="text-white font-medium text-5xl sm:text-5xl md:text-7xl lg:text-9xl">
            Digital experiences
            <br />
            <span className="text-white/90">crafted with intent.</span>
          </h1>

          <p className="text-white/90 text-lg sm:text-2xl ">
            A full-service agency helping brands launch, grow, and transform
            through strategy, design, and code.
          </p>

          <div className="flex gap-3 mt-2 lg:mt-3 pointer-events-auto ">
            <Link href="/contact">
              <Button size="lg" className="rounded-full p-6 w-fit">
                Get in Touch
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                className="rounded-full p-6 w-fit"
                variant="secondary"
              >
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
