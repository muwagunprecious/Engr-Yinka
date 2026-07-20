"use client";

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Briefcase, GraduationCap, Link2 } from "lucide-react";
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
  heading: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Nestlé Nigeria Plc",
    role: "Electrical & Automation Intern",
    period: "Apr 2025 - Oct 2025",
    badge: "🏭 Automation",
    heading: "Nestlé Nigeria",
    description: "Assisted in electrical maintenance, automation troubleshooting, and production line optimization. Supported PLC diagnostics, sensor calibration, and industrial control systems monitoring while gaining hands-on experience with manufacturing safety procedures.",
    icon: <Briefcase className="w-4 h-4" />,
    color: "#10b981", // Emerald green
  },
  {
    id: 2,
    company: "NION Academy",
    role: "Chief Operation Officer & AI/Robotics Lead Facilitator",
    period: "COO & AI Lead",
    badge: "🤖 Robotics & AI",
    heading: "NION Academy",
    description: "Led and managed cross-functional teams to oversee the operation of the organization and execute strategy. Trained students on Artificial intelligence and robotics fundamentals.",
    icon: <Award className="w-4 h-4" />,
    color: "#3b82f6", // Blue
  },
  {
    id: 3,
    company: "Data Science Nigeria (DSN)",
    role: "Sub-Tutor",
    period: "Feb 2024 - Mar 2024",
    badge: "📊 ML Education",
    heading: "DSN Sub-Tutor",
    description: "Proffered direct assistance in the use of software tools, and materials needed for student success. Directed students in completing assignments and projects related to machine learning, and assisted the main tutor.",
    icon: <GraduationCap className="w-4 h-4" />,
    color: "#c084fc", // Purple
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire section height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate current active step based on scroll
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    if (val < 0.28) {
      setActiveStep(0);
    } else if (val < 0.60) {
      setActiveStep(1);
    } else if (val < 0.88) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  });

  // Pin destinations
  // Green pin: (132, 76) — APWEN
  // Blue pin:  (248, 166) — Nestlé
  // Purple pin:(132, 256) — NION

  // Each wire tip starts 22px ABOVE the pin and drops DOWN into it as scroll progresses.
  // The wire body is a fixed straight line from a top anchor to just above the pin.
  // Only the final Y tip moves: from (pinY - 22) to pinY over the scroll window.

  // Green Wire tip Y: drops from 54 → 76 as scroll goes 0.05 → 0.28
  const greenTipY = useTransform(scrollYProgress, [0.05, 0.28], [54, 76]);

  // Blue Wire tip Y: drops from 144 → 166 as scroll goes 0.35 → 0.60
  const blueTipY = useTransform(scrollYProgress, [0.35, 0.60], [144, 166]);

  // Purple Wire tip Y: drops from 234 → 256 as scroll goes 0.65 → 0.88
  const purpleTipY = useTransform(scrollYProgress, [0.65, 0.88], [234, 256]);

  return (
    // Tall container for scroll pinning. This pins the section during scrolling.
    <div ref={containerRef} className="relative w-full h-[350vh] border-t border-white/5">
      
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black z-10">
        
        {/* Dynamic decorative grids */}
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 z-10 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Her Image */}
            <div className="lg:col-span-5 w-full aspect-[4/5] rounded-2xl border border-white/10 overflow-hidden glass relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              <img
                src="/engr_yinka_1.jpeg"
                alt="Engineer Yinka Working"
                className="w-full h-full object-cover filter grayscale"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                  OOU B.Eng. Electrical & Electronics
                </span>
                <h4 className="font-sans text-lg font-bold text-white mt-1">
                  Oyindamola Deji-Agboola
                </h4>
                <p className="font-mono text-[10px] text-white/60 mt-1">
                  CGPA: 4.52 / 5.00 (Ranked 5th in Dept) • Expected 2026
                </p>
              </div>
            </div>

            {/* Right Column: Breadboard + Pinned Experience Details */}
            <div className="lg:col-span-7 flex flex-col items-center relative">
              
              {/* Heading */}
              <div className="text-center mb-8 w-full">
                <h2 className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">
                  Experience & Journey
                </h2>
                <p className="text-white/60 text-xs font-mono">
                  Scroll to plug in jumper wires and power each milestone.
                </p>
              </div>

              {/* Breadboard Visual Container */}
              <div className="relative w-full max-w-lg glass border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl">
                
                {/* SVG Breadboard */}
                <svg viewBox="0 0 400 360" className="w-full mx-auto block overflow-visible">
                  <defs>
                    <filter id="wire-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="2" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
                    </filter>
                    <filter id="led-glow">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* Plastic board shell */}
                  <rect x="20" y="10" width="360" height="340" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <rect x="26" y="16" width="348" height="328" rx="10" fill="#090d16" />

                  {/* Power bus rails */}
                  <line x1="45" y1="30" x2="45" y2="330" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5 3" />
                  <line x1="60" y1="30" x2="60" y2="330" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5 3" />
                  <line x1="340" y1="30" x2="340" y2="330" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5 3" />
                  <line x1="355" y1="30" x2="355" y2="330" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5 3" />

                  {/* Tiny pin hole arrays */}
                  {Array.from({ length: 16 }).map((_, r) => {
                    const rowY = 40 + r * 18;
                    return (
                      <g key={r} opacity="0.5">
                        {Array.from({ length: 5 }).map((_, c) => (
                          <circle key={`l-${c}`} cx={100 + c * 16} cy={rowY} r="2.2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
                        ))}
                        <rect x="188" y={rowY - 8} width="4" height="16" fill="#1e293b" opacity="0.8" />
                        {Array.from({ length: 5 }).map((_, c) => (
                          <circle key={`r-${c}`} cx={216 + c * 16} cy={rowY} r="2.2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
                        ))}
                        <text x="82" y={rowY + 2.5} fill="#475569" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{r * 2 + 1}</text>
                      </g>
                    );
                  })}

                  {/* Metallic plug targets */}
                  {/* APWEN destination: Row 3, column C (132, 76) */}
                  <circle cx="132" cy="76" r="4" fill="none" stroke="#10b981" strokeWidth="1" className="animate-pulse" />
                  <circle cx="132" cy="76" r="1.5" fill="#10b981" />

                  {/* Nestlé destination: Row 8, column H (248, 166) */}
                  <circle cx="248" cy="166" r="4" fill="none" stroke="#3b82f6" strokeWidth="1" className="animate-pulse" />
                  <circle cx="248" cy="166" r="1.5" fill="#3b82f6" />

                  {/* NION destination: Row 13, column C (132, 256) */}
                  <circle cx="132" cy="256" r="4" fill="none" stroke="#c084fc" strokeWidth="1" className="animate-pulse" />
                  <circle cx="132" cy="256" r="1.5" fill="#c084fc" />

                  {/* LEDs */}
                  <circle cx="190" cy="40" r="5" fill={activeStep >= 1 ? "#10b981" : "#1e293b"} style={{ filter: activeStep >= 1 ? "url(#led-glow)" : "none", transition: "all 0.3s" }} />
                  <circle cx="190" cy="130" r="5" fill={activeStep >= 2 ? "#3b82f6" : "#1e293b"} style={{ filter: activeStep >= 2 ? "url(#led-glow)" : "none", transition: "all 0.3s" }} />
                  <circle cx="190" cy="220" r="5" fill={activeStep >= 3 ? "#c084fc" : "#1e293b"} style={{ filter: activeStep >= 3 ? "url(#led-glow)" : "none", transition: "all 0.3s" }} />

                  {/* ── WIRE 1 (Green) — straight from top edge down to APWEN pin (132, 76) ── */}
                  <g>
                    {/* Fixed straight body from top of board down to just above the hole */}
                    <line x1="132" y1="10" x2="132" y2="54" stroke="#000" strokeWidth="5" strokeOpacity="0.3" />
                    <line x1="132" y1="10" x2="132" y2="54" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="132" y1="10" x2="132" y2="54" stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
                    {/* Plastic insulation sleeve at top */}
                    <rect x="128" y="8" width="8" height="10" fill="#166534" rx="2" />
                    {/* Animated plug tip dropping into hole */}
                    <motion.line
                      x1="132" x2="132"
                      y1={54}
                      y2={greenTipY}
                      stroke="#10b981" strokeWidth="3.5" strokeLinecap="round"
                    />
                    <motion.line
                      x1="132" x2="132"
                      y1={54}
                      y2={greenTipY}
                      stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"
                    />
                    {/* Metal pin tip */}
                    <motion.rect
                      x={129.5} y={useTransform(greenTipY, (y) => Number(y) - 4)}
                      width="5" height="5" fill="#94a3b8" rx="0.5"
                    />
                  </g>

                  {/* ── WIRE 2 (Blue) — straight from right edge in to Nestlé pin (248, 166) ── */}
                  <g>
                    {/* Fixed horizontal body from right of board to just before hole */}
                    <line x1="370" y1="166" x2="270" y2="166" stroke="#000" strokeWidth="5" strokeOpacity="0.3" />
                    <line x1="370" y1="166" x2="270" y2="166" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="370" y1="166" x2="270" y2="166" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
                    {/* Sleeve */}
                    <rect x="362" y="162" width="10" height="8" fill="#1e3a8a" rx="2" />
                    {/* Animated plug tip sliding left into hole */}
                    <motion.line
                      y1="166" y2="166"
                      x1={270}
                      x2={useTransform(blueTipY, (y) => {
                        // Reuse blueTipY as a 0–1 progress indicator mapped to x: 270 → 248
                        const progress = (Number(y) - 144) / (166 - 144);
                        return 270 - progress * 22;
                      })}
                      stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"
                    />
                    <motion.line
                      y1="166" y2="166"
                      x1={270}
                      x2={useTransform(blueTipY, (y) => {
                        const progress = (Number(y) - 144) / (166 - 144);
                        return 270 - progress * 22;
                      })}
                      stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"
                    />
                    {/* Metal pin tip */}
                    <motion.rect
                      y={163}
                      x={useTransform(blueTipY, (y) => {
                        const progress = (Number(y) - 144) / (166 - 144);
                        return (270 - progress * 22) - 5;
                      })}
                      width="5" height="6" fill="#94a3b8" rx="0.5"
                    />
                  </g>

                  {/* ── WIRE 3 (Purple) — straight from bottom edge up to NION pin (132, 256) ── */}
                  <g>
                    {/* Fixed straight body from bottom of board up to just below hole */}
                    <line x1="132" y1="350" x2="132" y2="278" stroke="#000" strokeWidth="5" strokeOpacity="0.3" />
                    <line x1="132" y1="350" x2="132" y2="278" stroke="#c084fc" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="132" y1="350" x2="132" y2="278" stroke="#e9d5ff" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
                    {/* Sleeve */}
                    <rect x="128" y="344" width="8" height="10" fill="#581c87" rx="2" />
                    {/* Animated plug tip moving UP into hole */}
                    <motion.line
                      x1="132" x2="132"
                      y1={278}
                      y2={purpleTipY}
                      stroke="#c084fc" strokeWidth="3.5" strokeLinecap="round"
                    />
                    <motion.line
                      x1="132" x2="132"
                      y1={278}
                      y2={purpleTipY}
                      stroke="#e9d5ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"
                    />
                    {/* Metal pin tip */}
                    <motion.rect
                      x={129.5} y={useTransform(purpleTipY, (y) => Number(y) - 1)}
                      width="5" height="5" fill="#94a3b8" rx="0.5"
                    />
                  </g>

                </svg>

                {/* Overlaid Floating Popup Cards directly on top of Breadboard */}
                <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
                  <AnimatePresence mode="wait">
                    {activeStep > 0 && activeStep <= experiences.length && (
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.85, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: -15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="pointer-events-auto w-full max-w-sm rounded-2xl border p-5 md:p-6 backdrop-blur-xl"
                        style={{
                          background: "rgba(9, 13, 22, 0.95)",
                          borderColor: `${experiences[activeStep - 1].color}50`,
                          boxShadow: `0 0 35px ${experiences[activeStep - 1].color}20, 0 10px 30px rgba(0,0,0,0.8)`,
                        }}
                      >
                        {/* Top Accent line */}
                        <div 
                          className="h-1 w-20 rounded-full mb-4" 
                          style={{ backgroundColor: experiences[activeStep - 1].color }} 
                        />
                        
                        {/* Metadata Tag */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                            {experiences[activeStep - 1].heading}
                          </span>
                          <span 
                            className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border"
                            style={{ 
                              color: experiences[activeStep - 1].color, 
                              borderColor: `${experiences[activeStep - 1].color}40`,
                              backgroundColor: `${experiences[activeStep - 1].color}10`
                            }}
                          >
                            {experiences[activeStep - 1].badge}
                          </span>
                        </div>

                        {/* Title Info */}
                        <h4 className="font-sans text-xl font-bold text-white leading-tight">
                          {experiences[activeStep - 1].company}
                        </h4>
                        <p className="font-mono text-xs text-white/80 mt-1 mb-4 flex items-center gap-1.5">
                          <Link2 className="w-3.5 h-3.5 opacity-60" style={{ color: experiences[activeStep - 1].color }} />
                          {experiences[activeStep - 1].role}
                        </p>

                        {/* Description */}
                        <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                          {experiences[activeStep - 1].description}
                        </p>
                        
                        {/* Status bar */}
                        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/40">
                          <span>SYSTEM PORT: COM{activeStep}</span>
                          <span className="font-bold uppercase tracking-wider" style={{ color: experiences[activeStep - 1].color }}>CONNECTED</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
