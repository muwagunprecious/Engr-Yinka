"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import React from "react";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "APWEN OOU",
    role: "President",
    period: "Leadership Chapter",
    description: "Association of Professional Women Engineers of Nigeria (APWEN), OOU Collegiate Chapter. Leading initiatives that empower and mentor women pursuing engineering and technology careers.",
    icon: <Award className="w-5 h-5" />,
    color: "#10b981", // Emerald green
    badge: "🏆 Leadership",
  },
  {
    id: 2,
    company: "Nestlé",
    role: "Automation Experience",
    period: "Industrial Practice",
    description: "Worked on industrial automation systems, gaining practical experience in engineering operations, automation workflows, and modern industrial technologies.",
    icon: <Briefcase className="w-5 h-5" />,
    color: "#3b82f6", // Blue
    badge: "🏭 Automation",
  },
  {
    id: 3,
    company: "NION Academy",
    role: "Co-Founder",
    period: "EdTech Venture",
    description: "Helping create educational opportunities through innovative EdTech solutions designed to improve learning outcomes for students.",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "#c084fc", // Purple
    badge: "🎓 EdTech",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Steps based on scroll position:
  // 0: Initial (no connection)
  // 1: APWEN connected (at scrollYProgress > 0.25)
  // 2: Nestlé connected (at scrollYProgress > 0.5)
  // 3: NION connected (at scrollYProgress > 0.75)
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((val) => {
      if (val < 0.28) {
        setActiveStep(0);
      } else if (val < 0.52) {
        setActiveStep(1);
      } else if (val < 0.76) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    });
  }, [scrollYProgress]);

  // Transform scroll positions into wire-end coordinates to simulate plugging in!
  // Wire 1 (Green): Plugs in between 0.15 and 0.28 progress.
  const greenWireX = useTransform(scrollYProgress, [0.12, 0.28], [50, 110]);
  const greenWireY = useTransform(scrollYProgress, [0.12, 0.28], [240, 100]);

  // Wire 2 (Blue): Plugs in between 0.40 and 0.52 progress.
  const blueWireX = useTransform(scrollYProgress, [0.36, 0.52], [350, 190]);
  const blueWireY = useTransform(scrollYProgress, [0.36, 0.52], [240, 180]);

  // Wire 3 (Purple): Plugs in between 0.62 and 0.76 progress.
  const purpleWireX = useTransform(scrollYProgress, [0.58, 0.76], [50, 110]);
  const purpleWireY = useTransform(scrollYProgress, [0.58, 0.76], [330, 260]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5 z-10"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase mb-4"
          >
            Experience & Journey
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-3xl"
          >
            Building innovative solutions across AI, Embedded Systems, IoT, and STEM leadership.
          </motion.h3>
        </div>

        {/* Layout: Sticky left image, Breadboard + Interactive timeline on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Her Image (Sticky) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-32 w-full aspect-[4/5] rounded-2xl border border-white/10 overflow-hidden glass relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
            <img
              src="/engr_yinka_1.jpeg"
              alt="Engineer Yinka Working"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                Working Field Operations
              </span>
              <h4 className="font-sans text-lg font-bold text-white mt-1">
                Oyindamola Deji-Agboola
              </h4>
            </div>
          </motion.div>

          {/* Right Column: Breadboard + Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Interactive Breadboard Header */}
            <div className="glass border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                  Interactive Breadboard Wiring Stage
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white/70">
                  {activeStep === 0 ? "Disconnected" : `${activeStep}/3 Connected`}
                </span>
              </div>

              {/* Breadboard SVG */}
              <svg viewBox="0 0 400 360" className="w-full max-w-md mx-auto block overflow-visible">
                <defs>
                  {/* Outer shadow */}
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
                  </filter>
                  {/* Glow effect */}
                  <filter id="glow-led">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Breadboard Board Body */}
                <rect x="30" y="20" width="340" height="320" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2.5" filter="url(#shadow)" />
                <rect x="35" y="25" width="330" height="310" rx="6" fill="#0f172a" />

                {/* Power Rails (Vertical Red/Blue stripes on left) */}
                <line x1="55" y1="40" x2="55" y2="320" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
                <line x1="70" y1="40" x2="70" y2="320" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
                
                {/* Power Rails (Vertical Red/Blue stripes on right) */}
                <line x1="330" y1="40" x2="330" y2="320" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
                <line x1="345" y1="40" x2="345" y2="320" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />

                {/* Draw Tie-Point Hole Rows */}
                {Array.from({ length: 15 }).map((_, r) => {
                  const rowY = 50 + r * 18;
                  return (
                    <g key={r} opacity="0.6">
                      {/* Left Block pins (a, b, c, d, e) */}
                      {Array.from({ length: 5 }).map((_, c) => (
                        <circle key={`l-${c}`} cx={110 + c * 16} cy={rowY} r="2.5" fill="#334155" />
                      ))}
                      {/* Center divide */}
                      <rect x="198" y={rowY - 8} width="4" height="16" fill="#1e293b" rx="0.5" />
                      {/* Right Block pins (f, g, h, i, j) */}
                      {Array.from({ length: 5 }).map((_, c) => (
                        <circle key={`r-${c}`} cx={226 + c * 16} cy={rowY} r="2.5" fill="#334155" />
                      ))}
                      {/* Row Label */}
                      <text x="94" y={rowY + 3} fill="#475569" fontSize="7" fontFamily="monospace" textAnchor="middle">{r * 2 + 1}</text>
                    </g>
                  );
                })}

                {/* Connection Terminals (Highlight destinations) */}
                {/* APWEN destination hole: Row 3, column C (142, 86) */}
                <circle cx="142" cy="86" r="4.5" fill="none" stroke="#10b981" strokeWidth="1.2" className="animate-pulse" />
                <circle cx="142" cy="86" r="2" fill="#10b981" />

                {/* Nestlé destination hole: Row 8, column H (258, 176) */}
                <circle cx="258" cy="176" r="4.5" fill="none" stroke="#3b82f6" strokeWidth="1.2" className="animate-pulse" />
                <circle cx="258" cy="176" r="2" fill="#3b82f6" />

                {/* NION Academy destination hole: Row 13, column C (142, 266) */}
                <circle cx="142" cy="266" r="4.5" fill="none" stroke="#c084fc" strokeWidth="1.2" className="animate-pulse" />
                <circle cx="142" cy="266" r="2" fill="#c084fc" />

                {/* Status LEDs on Breadboard */}
                {/* Green LED (APWEN) */}
                <circle cx="200" cy="50" r="6" fill={activeStep >= 1 ? "#10b981" : "#1e293b"} style={{ filter: activeStep >= 1 ? "url(#glow-led)" : "none", transition: "all 0.3s" }} />
                {/* Blue LED (Nestle) */}
                <circle cx="200" cy="140" r="6" fill={activeStep >= 2 ? "#3b82f6" : "#1e293b"} style={{ filter: activeStep >= 2 ? "url(#glow-led)" : "none", transition: "all 0.3s" }} />
                {/* Purple LED (NION) */}
                <circle cx="200" cy="230" r="6" fill={activeStep >= 3 ? "#c084fc" : "#1e293b"} style={{ filter: activeStep >= 3 ? "url(#glow-led)" : "none", transition: "all 0.3s" }} />

                {/* Wires */}
                {/* Wire 1: APWEN (Green) */}
                <g>
                  <motion.path
                    d={useTransform(
                      [greenWireX, greenWireY],
                      ([wx, wy]) => `M 55 100 C 65 180, ${Number(wx) - 40} ${Number(wy) + 30}, ${wx} ${wy}`
                    )}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Glow core */}
                  <motion.path
                    d={useTransform(
                      [greenWireX, greenWireY],
                      ([wx, wy]) => `M 55 100 C 65 180, ${Number(wx) - 40} ${Number(wy) + 30}, ${wx} ${wy}`
                    )}
                    fill="none"
                    stroke="#a7f3d0"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>

                {/* Wire 2: Nestlé (Blue) */}
                <g>
                  <motion.path
                    d={useTransform(
                      [blueWireX, blueWireY],
                      ([wx, wy]) => `M 345 190 C 320 280, ${Number(wx) + 40} ${Number(wy) + 20}, ${wx} ${wy}`
                    )}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d={useTransform(
                      [blueWireX, blueWireY],
                      ([wx, wy]) => `M 345 190 C 320 280, ${Number(wx) + 40} ${Number(wy) + 20}, ${wx} ${wy}`
                    )}
                    fill="none"
                    stroke="#93c5fd"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>

                {/* Wire 3: NION Academy (Purple) */}
                <g>
                  <motion.path
                    d={useTransform(
                      [purpleWireX, purpleWireY],
                      ([wx, wy]) => `M 55 280 C 75 350, ${Number(wx) - 40} ${Number(wy) + 30}, ${wx} ${wy}`
                    )}
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d={useTransform(
                      [purpleWireX, purpleWireY],
                      ([wx, wy]) => `M 55 280 C 75 350, ${Number(wx) - 40} ${Number(wy) + 30}, ${wx} ${wy}`
                    )}
                    fill="none"
                    stroke="#e9d5ff"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>
              </svg>
            </div>

            {/* Scrolling Timeline/Info Cards */}
            <div className="flex flex-col gap-6 relative">
              {experiences.map((exp) => {
                const isConnected = activeStep >= exp.id;
                
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0.3, y: 20 }}
                    animate={{ 
                      opacity: isConnected ? 1 : 0.25, 
                      scale: isConnected ? 1 : 0.98,
                      y: 0
                    }}
                    transition={{ duration: 0.4 }}
                    className="glass border rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300"
                    style={{ 
                      borderColor: isConnected ? `${exp.color}40` : "rgba(255, 255, 255, 0.05)",
                      boxShadow: isConnected ? `0 0 25px ${exp.color}10` : "none"
                    }}
                  >
                    {/* Background glow when active */}
                    <div 
                      className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 pointer-events-none"
                      style={{ 
                        background: exp.color,
                        opacity: isConnected ? 0.15 : 0 
                      }} 
                    />

                    {/* Timeline Marker Row */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-10 h-10 rounded-xl flex items-center justify-center border font-semibold transition-colors"
                          style={{ 
                            color: isConnected ? exp.color : "rgba(255, 255, 255, 0.4)",
                            borderColor: isConnected ? `${exp.color}50` : "rgba(255, 255, 255, 0.1)",
                            backgroundColor: isConnected ? `${exp.color}10` : "transparent"
                          }}
                        >
                          {exp.icon}
                        </span>
                        <div>
                          <span className="font-mono text-xs text-white/40 block">
                            {exp.period}
                          </span>
                          <span className="font-mono text-[10px] uppercase font-bold tracking-wider mt-0.5 block" style={{ color: isConnected ? exp.color : "rgba(255, 255, 255, 0.4)" }}>
                            {exp.badge}
                          </span>
                        </div>
                      </div>
                      
                      <span className="font-mono text-xs text-white/30">
                        {isConnected ? "CONNECTED" : "DISCONNECTED"}
                      </span>
                    </div>

                    {/* Content */}
                    <h4 className="font-sans text-2xl font-bold text-white mb-1">
                      {exp.company}
                    </h4>
                    <p className="font-mono text-sm text-white/70 mb-4">
                      {exp.role}
                    </p>
                    <p className="text-white/60 text-base leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
