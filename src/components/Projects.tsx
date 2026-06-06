"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Cpu, Radio, Brain, Settings } from "lucide-react";
import React from "react";

interface Project {
  title: string;
  category: string;
  description: string;
  badge?: string;
  image?: string;
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    title: "MoyoCare-Her",
    category: "AI • Wellness",
    description:
      "An AI-powered wellness companion designed for female students. Featuring secure, real-time AI conversations, personalized mental wellness guidance and resources.",
    badge: "🏆 Best Lovable Project Award",
    image: "/moyocare.png",
    icon: <Brain className="w-5 h-5" />,
    stats: [
      { label: "Accuracy", value: "98.2%" },
      { label: "Users", value: "1.2k+" },
      { label: "Latency", value: "<200ms" },
    ],
  },
  {
    title: "IoT Solutions Network",
    category: "IoT • Wireless",
    description:
      "Connected environmental sensing nodes deploying low-power mesh networks for real-time monitoring.",
    icon: <Radio className="w-5 h-5" />,
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Latency", value: "12ms" },
    ],
  },
  {
    title: "Embedded Hardware Prototypes",
    category: "Embedded Systems",
    description:
      "Custom firmware development and PCB design for smart hardware monitoring and telemetry systems.",
    icon: <Cpu className="w-5 h-5" />,
    stats: [
      { label: "Power Draw", value: "1.2mW" },
      { label: "Clock", value: "168MHz" },
    ],
  },
  {
    title: "Industrial Automation Systems",
    category: "Automation",
    description:
      "PLC programming and SCADA configuration for automated process flows in modern manufacturing.",
    icon: <Settings className="w-5 h-5" />,
    stats: [
      { label: "Throughput", value: "+30%" },
      { label: "Failure", value: "<0.01%" },
    ],
  },
  {
    title: "Edge AI Applications",
    category: "AI • Deep Learning",
    description:
      "Deploying lightweight object detection models on low-power microcontrollers at the edge.",
    icon: <Brain className="w-5 h-5" />,
    stats: [
      { label: "Model", value: "140KB" },
      { label: "FPS", value: "45" },
    ],
  },
];

/* ─────── Inline SVG Plane (faces UP) ─────── */
function PlaneUp() {
  return (
    <svg
      width="48"
      height="70"
      viewBox="0 0 48 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]"
    >
      {/* Fuselage */}
      <path d="M 24 2 Q 30 20, 28 58 L 20 58 Q 18 20, 24 2 Z" fill="#cbd5e1" />
      {/* Nose cone highlight */}
      <path d="M 24 2 Q 26 12, 26 22 L 22 22 Q 22 12, 24 2 Z" fill="#e2e8f0" opacity="0.8" />
      {/* Left wing */}
      <path d="M 22 28 L 2 40 L 20 38 Z" fill="#94a3b8" />
      {/* Right wing */}
      <path d="M 26 28 L 46 40 L 28 38 Z" fill="#94a3b8" />
      {/* Left tail fin */}
      <path d="M 21 52 L 10 62 L 20 58 Z" fill="#64748b" />
      {/* Right tail fin */}
      <path d="M 27 52 L 38 62 L 28 58 Z" fill="#64748b" />
      {/* Cockpit */}
      <ellipse cx="24" cy="14" rx="2.5" ry="4" fill="#3b82f6" opacity="0.85" />
      {/* Engine glow */}
      <ellipse cx="24" cy="62" rx="4" ry="3" fill="#f97316" opacity="0.5" />
      <ellipse cx="24" cy="64" rx="2.5" ry="2" fill="#fbbf24" opacity="0.7" />
    </svg>
  );
}

/* ─────── Banner flag trailing BELOW the plane ─────── */
function BannerFlag() {
  return (
    <svg
      width="120"
      height="36"
      viewBox="0 0 120 36"
      fill="none"
      className="drop-shadow-lg"
    >
      {/* Rope */}
      <line x1="60" y1="0" x2="60" y2="6" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
      {/* Flag body with wave */}
      <path
        d="M 10 6 L 110 6 Q 115 18, 110 30 L 10 30 Q 5 18, 10 6 Z"
        fill="#0f172a"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      {/* Accent stripe */}
      <rect x="10" y="6" width="4" height="24" fill="#3b82f6" rx="1" />
      {/* Text */}
      <text
        x="60"
        y="22"
        fill="#e2e8f0"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="bold"
        textAnchor="middle"
        letterSpacing="1"
      >
        ENGR YINKA
      </text>
    </svg>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ─── Plane vertical position ─── */
  // Plane flies from bottom (100%) to top (-10%) as scroll progresses 0 → 1
  const planeBottom = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);
  // Gentle horizontal wobble
  const planeWobbleX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, 6, -4, 8, -6, 5, -3, 0]
  );

  /* ─── Track revealed cards ─── */
  const [revealedCount, setRevealedCount] = useState(0);

  // The plane uncovers each card as it flies past its position
  // Cards are at approximately 18%, 36%, 54%, 72%, 90% from bottom
  const revealThresholds = [0.10, 0.28, 0.46, 0.64, 0.82];

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    let count = 0;
    for (const threshold of revealThresholds) {
      if (val >= threshold) count++;
    }
    setRevealedCount(count);
  });

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] border-t border-white/5">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black z-10 flex">
        {/* ─── Left Column: Heading + Plane flight path ─── */}
        <div className="relative w-24 md:w-36 lg:w-48 shrink-0 h-full">
          {/* Vertical flight path (dashed guide line) */}
          <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[1px] -translate-x-1/2">
            <div className="w-full h-full border-l border-dashed border-white/10" />
          </div>

          {/* Exhaust trail below plane */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[2px] bottom-[5%]"
            style={{
              height: planeBottom,
              background: "linear-gradient(to top, transparent, rgba(59,130,246,0.15), rgba(249,115,22,0.1), transparent)",
            }}
          />

          {/* Plane + Banner */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30"
            style={{ bottom: planeBottom, x: planeWobbleX }}
          >
            {/* Plane */}
            <PlaneUp />

            {/* Exhaust puffs */}
            <div className="flex flex-col items-center gap-1 mt-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-orange-400/40"
                  animate={{
                    scale: [0.8, 1.5, 0],
                    opacity: [0.6, 0.2, 0],
                    y: [0, 12 + i * 6],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Banner Flag dangling below */}
            <div className="mt-2">
              <BannerFlag />
            </div>
          </motion.div>
        </div>

        {/* ─── Right Column: Cards stacked vertically ─── */}
        <div className="flex-1 h-full flex flex-col py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
          {/* Section Heading */}
          <div className="mb-6 shrink-0">
            <p className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">
              Selected Works
            </p>
            <h2 className="font-sans text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white max-w-xl">
              Engineering intelligent products that solve real-world problems.
            </h2>
          </div>

          {/* Cards */}
          <div className="flex-1 flex flex-col gap-3 justify-center overflow-hidden">
            {projects.map((project, index) => {
              const isRevealed = revealedCount > index;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    opacity: isRevealed ? 1 : 0.08,
                    scale: isRevealed ? 1 : 0.98,
                    x: isRevealed ? 0 : 20,
                    filter: isRevealed ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative rounded-xl border overflow-hidden flex items-center gap-4 p-4 md:p-5 transition-colors duration-500"
                  style={{
                    borderColor: isRevealed ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                    background: isRevealed ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                  }}
                >
                  {/* Background image for featured */}
                  {project.image && (
                    <>
                      <div className="absolute inset-0 z-0 opacity-10">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />
                    </>
                  )}

                  {/* Icon */}
                  <div className="shrink-0 w-10 h-10 rounded-lg border border-white/10 bg-black/60 flex items-center justify-center text-white/60 z-10">
                    {project.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 z-10">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h4 className="font-sans text-sm md:text-base font-bold text-white truncate">
                        {project.title}
                      </h4>
                      <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase border border-white/10 rounded-full px-2 py-0.5 bg-black/40 shrink-0">
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="font-mono text-[9px] text-amber-300/80 bg-amber-500/10 rounded-full px-2 py-0.5 shrink-0">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-white/45 line-clamp-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex gap-4 shrink-0 z-10">
                    {project.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex flex-col items-end">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-white/35">
                          {stat.label}
                        </span>
                        <span className="font-mono text-xs font-bold text-white">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 w-7 h-7 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/50 z-10">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>

                  {/* Reveal flash */}
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        key={`flash-${index}`}
                        initial={{ opacity: 0.4, x: "-100%" }}
                        animate={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent pointer-events-none z-20"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Progress dots at bottom */}
          <div className="flex items-center justify-center gap-2 mt-4 shrink-0">
            {projects.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: revealedCount > i ? "18px" : "6px",
                  backgroundColor: revealedCount > i ? "#3b82f6" : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
            <span className="ml-3 font-mono text-[10px] text-white/30">
              {revealedCount}/{projects.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
