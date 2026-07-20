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
    title: "ADDEK Smart Speaker",
    category: "AI Hardware • Startup",
    description:
      "Engineering an AI-powered smart speaker featuring multilingual support specifically tailored for local African languages, bridging the gap between hardware prototyping and software integration.",
    badge: "🎙 Startup MVP",
    image: "/yinka_workspace.png",
    icon: <Radio className="w-5 h-5" />,
    stats: [
      { label: "Status", value: "MVP in Dev" },
      { label: "Focus", value: "African Lang" },
    ],
  },
  {
    title: "Dual-Axis Solar Tracker",
    category: "IoT • Embedded ML",
    description:
      "Designing and developing a dual-axis solar tracking system featuring Machine Learning optimization and IoT monitoring and control. Utilizing MG996R servo motors to maximize energy capture.",
    badge: "☀️ Final Year Project",
    image: "/engr_yinka_2.jpeg",
    icon: <Cpu className="w-5 h-5" />,
    stats: [
      { label: "Motors", value: "MG996R" },
      { label: "Optimization", value: "ML-Driven" },
    ],
  },
  {
    title: "SabiSales AI Sales Agent",
    category: "Agentic AI • Hackathon",
    description:
      "Secured 4th place in the Meta AI Developer Academy final hackathon by developing an intelligent, agentic AI sales solution.",
    badge: "🏆 4th Place Meta AI",
    image: "/mg_0440.jpeg",
    icon: <Brain className="w-5 h-5" />,
    stats: [
      { label: "Hackathon", value: "Meta AI" },
      { label: "Rank", value: "4th Place" },
    ],
  },
  {
    title: "MoyoCare-Her",
    category: "AI • Wellness",
    description:
      "Won the 'Best Lovable Project' award at the Lovable Women in AI Nigeria Hackathon (2025). An AI-powered wellness companion designed for female students featuring secure, real-time conversations.",
    badge: "🏆 Best Lovable Project Award",
    image: "/moyocare.png",
    icon: <Brain className="w-5 h-5" />,
    stats: [
      { label: "Hackathon", value: "Women in AI" },
      { label: "Year", value: "2025" },
    ],
  },
  {
    title: "Smart Energy Monitoring System",
    category: "IoT • Embedded Systems",
    description:
      "Developed an IoT-based energy monitoring solution to track and optimize power consumption using microcontroller architecture.",
    image: "/engr_yinka_1.jpeg",
    icon: <Cpu className="w-5 h-5" />,
    stats: [
      { label: "MCU", value: "ESP32/Arduino" },
      { label: "Target", value: "Power Opt" },
    ],
  },
  {
    title: "Predictive Model for Heart Disease",
    category: "Machine Learning • Python",
    description:
      "Built ML models to detect early risk factors using Python and real-world datasets. Addressed imbalanced data and overfitting via cross-validation and feature engineering.",
    badge: "📊 DSN Hackathon",
    image: "/mg_0434.jpeg",
    icon: <Settings className="w-5 h-5" />,
    stats: [
      { label: "Language", value: "Python" },
      { label: "Validation", value: "Cross-Val" },
    ],
  },
  {
    title: "Machine Translation (English Yoruba)",
    category: "NLP • Deep Learning",
    description:
      "Developed an NLP model for accurate translation of African languages. Fine-tuned pre-trained models to improve language-specific accuracy.",
    image: "/engr_ykk.jpeg",
    icon: <Brain className="w-5 h-5" />,
    stats: [
      { label: "Model", value: "Fine-tuned" },
      { label: "Languages", value: "Eng ↔ Yor" },
    ],
  },
  {
    title: "Obstacle Avoidance Robot",
    category: "Robotics • Control",
    description:
      "Developed a robot with an obstacle avoidance system using ultrasonic sensors and autonomous path planning.",
    image: "/mg_0434.jpeg",
    icon: <Cpu className="w-5 h-5" />,
    stats: [
      { label: "Platform", value: "Arduino" },
      { label: "Sensors", value: "Ultrasonic" },
    ],
  },
  {
    title: "Fingerprint Attendance System",
    category: "Embedded Systems • Security",
    description:
      "Developed an attendance system with a fingerprint sensor for secure biometric identification and access logging.",
    image: "/mg_0440.jpeg",
    icon: <Settings className="w-5 h-5" />,
    stats: [
      { label: "Sensor", value: "Biometric" },
      { label: "Interface", value: "LCD Display" },
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

  /* ─── Track scroll over the entire section ─── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* ─── Plane vertical position ─── */
  // Plane flies from bottom (5%) to top (95%) of the STICKY viewport as the section scrolls
  const planeBottom = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);
  // Gentle horizontal wobble
  const planeWobbleX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, 6, -4, 8, -6, 5, -3, 0]
  );

  return (
    <div ref={containerRef} className="relative w-full bg-black border-t border-white/5 flex">
      {/* ─── Left Column: Sticky Plane flight path ─── */}
      <div className="sticky top-0 h-screen w-24 md:w-36 lg:w-48 shrink-0 overflow-hidden">
        {/* Vertical flight path (dashed guide line) */}
        <div className="absolute left-1/2 top-[5%] bottom-[5%] w-[1px] -translate-x-1/2 z-0">
          <div className="w-full h-full border-l border-dashed border-white/10" />
        </div>

        {/* Exhaust trail below plane */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[2px] bottom-[5%] z-10"
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

      {/* ─── Right Column: Naturally scrolling cards ─── */}
      <div className="flex-1 py-24 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Section Heading */}
        <div className="mb-16 md:mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase mb-3"
          >
            Selected Works
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white max-w-2xl"
          >
            Engineering intelligent products that solve real-world problems.
          </motion.h2>
        </div>

        {/* Cards container */}
        <div className="flex flex-col gap-6 md:gap-10 max-w-4xl">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              variants={{
                hidden: { opacity: 0.3, scale: 0.95, y: 30, filter: "blur(4px)" },
                visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="group relative rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row items-center gap-6 p-5 md:p-6 transition-all duration-500 min-h-[140px] md:min-h-[200px] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            >
                  {/* Background hover shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Image container on the left */}
                  {project.image && (
                    <div className="shrink-0 w-full md:w-48 h-32 md:h-full rounded-xl overflow-hidden border border-white/10 relative z-10">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 p-1.5 rounded-lg bg-black/40 text-white/80 backdrop-blur-md border border-white/10">
                        {project.icon}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0 z-10 flex flex-col justify-center w-full">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="font-sans text-lg md:text-xl font-bold text-white truncate">
                        {project.title}
                      </h4>
                      <span className="font-mono text-[10px] tracking-wider text-blue-300/80 uppercase border border-blue-500/20 rounded-full px-2.5 py-0.5 bg-blue-500/10 shrink-0">
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="font-mono text-[10px] text-amber-300/90 bg-amber-500/15 border border-amber-500/20 rounded-full px-2.5 py-0.5 shrink-0">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm md:text-base text-white/60 line-clamp-2 md:line-clamp-3 mb-4 group-hover:text-white/80 transition-colors">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-6 shrink-0 mt-auto">
                      {project.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-0.5">
                            {stat.label}
                          </span>
                          <span className="font-mono text-sm md:text-base font-bold text-white/90">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 z-10 group-hover:bg-white/10 group-hover:text-white transition-all duration-300 self-start md:self-center absolute top-4 right-4 md:relative md:top-0 md:right-0">
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>

              </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
