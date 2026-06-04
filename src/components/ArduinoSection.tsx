"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X, Cpu, Radio, Brain, Settings } from "lucide-react";
import React from "react";

/* ─── Project data tied to each pin ─────────────────────────────────── */
const PIN_PROJECTS = [
  {
    id: 0,
    pinLabel: "D13",
    title: "MoyoCare-Her",
    category: "AI • Wellness",
    badge: "🏆 Best Lovable Project",
    description:
      "An AI-powered wellness companion for female students with real-time conversations, personalized mental wellness guidance, and compassionate student-focused experiences.",
    image: "/moyocare.png",
    portrait: "/engr_yinka_1.jpeg",
    icon: <Brain className="w-5 h-5" />,
    stats: [
      { label: "Accuracy", value: "98.2%" },
      { label: "DAU", value: "1.2k+" },
    ],
    color: "#4ade80",
  },
  {
    id: 1,
    pinLabel: "D9",
    title: "IoT Solutions Network",
    category: "IoT • Wireless",
    badge: "🌐 Live Network",
    description:
      "Connected environmental sensing nodes deploying low-power mesh networks for real-time environmental monitoring across distributed locations.",
    image: null,
    portrait: "/mg_0434.jpeg",
    icon: <Radio className="w-5 h-5" />,
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Latency", value: "12ms" },
    ],
    color: "#38bdf8",
  },
  {
    id: 2,
    pinLabel: "D5",
    title: "Embedded Hardware Prototypes",
    category: "Embedded Systems",
    badge: "⚙️ Custom PCB",
    description:
      "Custom firmware development and PCB design for smart hardware monitoring and telemetry systems optimized for low power consumption.",
    image: null,
    portrait: "/engr_ykk.jpeg",
    icon: <Cpu className="w-5 h-5" />,
    stats: [
      { label: "Power Draw", value: "1.2mW" },
      { label: "Clock Speed", value: "168MHz" },
    ],
    color: "#f59e0b",
  },
  {
    id: 3,
    pinLabel: "A0",
    title: "Industrial Automation Systems",
    category: "Automation",
    badge: "🏭 Industry Grade",
    description:
      "PLC programming and SCADA configuration for automated process flows in modern manufacturing environments with near-zero failure rates.",
    image: null,
    portrait: "/mg_0440.jpeg",
    icon: <Settings className="w-5 h-5" />,
    stats: [
      { label: "Throughput", value: "+30%" },
      { label: "Failure Rate", value: "<0.01%" },
    ],
    color: "#c084fc",
  },
];

/* ─── Wire paths: each wire travels from outside → onto the Arduino board ─ */
/* Coordinates reference viewBox="0 0 900 500" */
const WIRES = [
  {
    id: 0,
    color: "#4ade80",
    // comes from left, enters top-row digital pin D13
    d: "M -20 90 L 120 90 L 120 110 L 290 110 L 290 90 L 400 90",
    pinHitX: 400,
    pinHitY: 90,
    duration: 3.5,
    delay: 0,
  },
  {
    id: 1,
    color: "#38bdf8",
    // comes from right, enters digital pin D9
    d: "M 920 140 L 780 140 L 780 110 L 600 110 L 600 140 L 500 140",
    pinHitX: 500,
    pinHitY: 140,
    duration: 3.8,
    delay: 1.2,
  },
  {
    id: 2,
    color: "#f59e0b",
    // comes from bottom-left, enters digital pin D5
    d: "M 60 520 L 60 380 L 150 380 L 150 340 L 320 340 L 320 300 L 430 300",
    pinHitX: 430,
    pinHitY: 300,
    duration: 4.2,
    delay: 2.5,
  },
  {
    id: 3,
    color: "#c084fc",
    // comes from bottom-right, enters analog pin A0
    d: "M 860 520 L 860 390 L 730 390 L 730 360 L 600 360 L 600 310 L 530 310",
    pinHitX: 530,
    pinHitY: 310,
    duration: 4.0,
    delay: 3.8,
  },
];

/* ─── Arduino pin rows (decorative) ──────────────────────────────────── */
const DIGITAL_PINS = Array.from({ length: 14 }, (_, i) => ({
  x: 408 + i * 28,
  y: 82,
  label: `D${13 - i}`,
}));
const ANALOG_PINS = Array.from({ length: 6 }, (_, i) => ({
  x: 408 + i * 28,
  y: 308,
  label: `A${i}`,
}));

/* ─── Component ──────────────────────────────────────────────────────── */
export default function ArduinoSection() {
  const [activeProject, setActiveProject] = useState<(typeof PIN_PROJECTS)[0] | null>(null);
  const [firedWires, setFiredWires] = useState<Set<number>>(new Set());
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* Cycle through wires automatically, triggering popups */
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    WIRES.forEach((wire) => {
      const t = setTimeout(() => {
        setFiredWires((prev) => new Set([...prev, wire.id]));
        setActiveProject(PIN_PROJECTS[wire.id]);
      }, (wire.delay + wire.duration) * 1000);
      timersRef.current.push(t);
    });

    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  /* Auto-dismiss popup after 4s, then continue cycling */
  useEffect(() => {
    if (!activeProject) return;
    const t = setTimeout(() => setActiveProject(null), 4500);
    return () => clearTimeout(t);
  }, [activeProject]);

  return (
    <section
      id="arduino"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5 z-10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase mb-4"
          >
            Hardware Showcase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-3xl"
          >
            Projects wired into every pin.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/50 max-w-xl text-sm md:text-base"
          >
            Watch as each wire flows through the Arduino board — every connection
            powers a real project built by Engineer Yinka.
          </motion.p>
        </div>

        {/* Arduino SVG Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <svg
            viewBox="0 0 900 500"
            className="w-full max-w-4xl mx-auto block"
            aria-label="Interactive Arduino board with project wires"
          >
            <defs>
              {/* Board PCB texture gradient */}
              <linearGradient id="boardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a3a5c" />
                <stop offset="50%" stopColor="#0e2a45" />
                <stop offset="100%" stopColor="#091e30" />
              </linearGradient>

              {/* Silkscreen overlay */}
              <linearGradient id="silkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e4976" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0a2d4a" stopOpacity="0.1" />
              </linearGradient>

              {WIRES.map((w) => (
                <filter key={w.id} id={`glow-${w.id}`}>
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {/* ── PCB Board body ──────────────────────────────── */}
            <rect x="250" y="60" width="500" height="380" rx="12" fill="url(#boardGrad)" />
            <rect x="250" y="60" width="500" height="380" rx="12" fill="url(#silkGrad)" />
            {/* Board outline / copper edge */}
            <rect x="250" y="60" width="500" height="380" rx="12" fill="none" stroke="#1e5f8a" strokeWidth="2" />

            {/* ── Mounting holes ───────────────────────────────── */}
            {[[268,78],[732,78],[268,422],[732,422]].map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="8" fill="#0a1f33" stroke="#1e5f8a" strokeWidth="1.5" />
                <circle cx={cx} cy={cy} r="3" fill="#0a1f33" stroke="#2a7fc0" strokeWidth="1" />
              </g>
            ))}

            {/* ── USB connector (left side) ─────────────────── */}
            <rect x="240" y="140" width="26" height="50" rx="3" fill="#888" stroke="#aaa" strokeWidth="1" />
            <rect x="248" y="148" width="12" height="34" rx="1" fill="#333" />

            {/* ── DC Power jack ─────────────────────────────── */}
            <rect x="240" y="340" width="30" height="36" rx="3" fill="#222" stroke="#555" strokeWidth="1" />
            <circle cx="255" cy="358" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            <circle cx="255" cy="358" r="3" fill="#333" />

            {/* ── ATmega328P chip ───────────────────────────── */}
            <rect x="430" y="200" width="100" height="120" rx="4" fill="#111" stroke="#2a7fc0" strokeWidth="1.5" />
            {/* Chip legs left */}
            {Array.from({length:7},(_,i)=>(
              <rect key={`cl${i}`} x="418" y={210+i*14} width="12" height="6" rx="1" fill="#aaa" />
            ))}
            {/* Chip legs right */}
            {Array.from({length:7},(_,i)=>(
              <rect key={`cr${i}`} x="530" y={210+i*14} width="12" height="6" rx="1" fill="#aaa" />
            ))}
            {/* Chip label */}
            <text x="480" y="255" textAnchor="middle" fill="#3a9fd5" fontSize="8" fontFamily="monospace">ATmega328P</text>
            <text x="480" y="267" textAnchor="middle" fill="#2a7fc0" fontSize="6" fontFamily="monospace">MICROCONTROLLER</text>

            {/* ── Crystal oscillator ────────────────────────── */}
            <rect x="380" y="232" width="30" height="14" rx="3" fill="#c8a000" stroke="#a07800" strokeWidth="1" />
            <text x="395" y="243" textAnchor="middle" fill="#fff8" fontSize="6" fontFamily="monospace">16MHz</text>

            {/* ── ICSP header ───────────────────────────────── */}
            <rect x="550" y="200" width="36" height="24" rx="2" fill="#111" stroke="#444" strokeWidth="1" />
            {[[558,210],[566,210],[574,210],[582,210],[558,218],[566,218]].map(([px,py],i)=>(
              <circle key={i} cx={px} cy={py} r="2.5" fill="#c0c0c0" />
            ))}

            {/* ── Voltage regulator ─────────────────────────── */}
            <rect x="310" y="340" width="20" height="30" rx="2" fill="#444" />
            <rect x="306" y="354" width="28" height="8" rx="1" fill="#333" />

            {/* ── LEDs ──────────────────────────────────────── */}
            <circle cx="390" cy="130" r="5" fill={firedWires.has(0) ? "#4ade80" : "#0a3a0a"} style={{filter: firedWires.has(0) ? "drop-shadow(0 0 6px #4ade80)" : "none"}} />
            <circle cx="405" cy="130" r="5" fill={firedWires.has(1) ? "#38bdf8" : "#0a1a2a"} style={{filter: firedWires.has(1) ? "drop-shadow(0 0 6px #38bdf8)" : "none"}} />
            <circle cx="420" cy="130" r="5" fill="#f59e0b" opacity="0.3" />
            <circle cx="435" cy="130" r="5" fill="#ef4444" opacity="0.3" />

            {/* ── Digital pin header labels ──────────────────── */}
            <text x="500" y="75" textAnchor="middle" fill="#3a9fd5" fontSize="7" fontFamily="monospace">DIGITAL (PWM~)</text>
            {DIGITAL_PINS.map((pin) => (
              <g key={pin.label}>
                <rect x={pin.x - 5} y={pin.y - 6} width="10" height="16" rx="2" fill="#1a1a1a" stroke="#2a7fc0" strokeWidth="1" />
                <circle cx={pin.x} cy={pin.y + 2} r="2.5" fill="#c0c0c0" />
                <text x={pin.x} y={pin.y + 22} textAnchor="middle" fill="#3a9fd5" fontSize="5.5" fontFamily="monospace">{pin.label}</text>
              </g>
            ))}

            {/* ── Analog pin header labels ───────────────────── */}
            <text x="462" y="328" textAnchor="middle" fill="#3a9fd5" fontSize="7" fontFamily="monospace">ANALOG IN</text>
            {ANALOG_PINS.map((pin) => (
              <g key={pin.label}>
                <rect x={pin.x - 5} y={pin.y - 6} width="10" height="16" rx="2" fill="#1a1a1a" stroke="#2a7fc0" strokeWidth="1" />
                <circle cx={pin.x} cy={pin.y + 2} r="2.5" fill="#c0c0c0" />
                <text x={pin.x} y={pin.y + 22} textAnchor="middle" fill="#3a9fd5" fontSize="5.5" fontFamily="monospace">{pin.label}</text>
              </g>
            ))}

            {/* ── Power pin header ───────────────────────────── */}
            <text x="328" y="75" textAnchor="middle" fill="#3a9fd5" fontSize="7" fontFamily="monospace">POWER</text>
            {["VIN","GND","GND","5V","3.3V","RESET"].map((lbl,i)=>(
              <g key={lbl+i}>
                <rect x={264+i*18} y={76} width="10" height="16" rx="2" fill="#1a1a1a" stroke="#2a7fc0" strokeWidth="1" />
                <circle cx={269+i*18} cy={84} r="2.5" fill="#c0c0c0" />
                <text x={269+i*18} y={100} textAnchor="middle" fill="#3a9fd5" fontSize="4.5" fontFamily="monospace">{lbl}</text>
              </g>
            ))}

            {/* ── Arduino logo / silkscreen text ─────────────── */}
            <text x="480" y="170" textAnchor="middle" fill="#1a6fa8" fontSize="22" fontFamily="sans-serif" fontWeight="bold" opacity="0.5">Arduino</text>
            <text x="600" y="170" textAnchor="middle" fill="#1a6fa8" fontSize="14" fontFamily="sans-serif" fontWeight="bold" opacity="0.5">UNO</text>

            {/* ── PCB trace lines ────────────────────────────── */}
            {[
              "M 390 84 L 390 200",
              "M 450 84 L 450 200",
              "M 510 84 L 510 200",
              "M 480 310 L 480 330",
              "M 450 310 L 450 330",
              "M 310 340 L 310 310 L 350 310",
            ].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#1e5f8a" strokeWidth="1" opacity="0.5" />
            ))}

            {/* ── Animated Wires ────────────────────────────── */}
            {WIRES.map((wire) => (
              <g key={wire.id}>
                {/* Static wire track (dim) */}
                <path
                  d={wire.d}
                  fill="none"
                  stroke={wire.color}
                  strokeWidth="2.5"
                  strokeOpacity="0.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Animated current pulse */}
                <path
                  d={wire.d}
                  fill="none"
                  stroke={wire.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={`url(#glow-${wire.id})`}
                  style={{
                    strokeDasharray: "40 300",
                    animation: `circuitFlow ${wire.duration}s linear infinite`,
                    animationDelay: `${wire.delay}s`,
                  }}
                />
                {/* Pin hit flash dot */}
                {firedWires.has(wire.id) && (
                  <circle
                    cx={wire.pinHitX}
                    cy={wire.pinHitY}
                    r="6"
                    fill={wire.color}
                    opacity="0.9"
                    style={{ filter: `drop-shadow(0 0 8px ${wire.color})` }}
                  >
                    <animate attributeName="r" values="4;10;4" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* ── Project Popup Card ──────────────────────────────────────── */}
          <AnimatePresence>
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="pointer-events-auto relative w-full max-w-md rounded-2xl border overflow-hidden shadow-2xl"
                  style={{
                    borderColor: `${activeProject.color}40`,
                    background: "rgba(5, 12, 20, 0.96)",
                    backdropFilter: "blur(20px)",
                    boxShadow: `0 0 60px ${activeProject.color}25, 0 20px 60px rgba(0,0,0,0.8)`,
                  }}
                >
                  {/* Glow top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${activeProject.color}, transparent)` }}
                  />

                  {/* Close button */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20"
                  >
                    <X className="w-3.5 h-3.5 text-white/70" />
                  </button>

                  <div className="flex gap-0">
                    {/* Portrait */}
                    <div className="w-36 h-48 flex-shrink-0 relative">
                      <img
                        src={activeProject.portrait}
                        alt="Engineer Yinka"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to right, transparent 60%, rgba(5,12,20,0.95))`,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        {/* Pin label + category */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full border"
                            style={{ color: activeProject.color, borderColor: `${activeProject.color}50`, background: `${activeProject.color}15` }}
                          >
                            PIN {activeProject.pinLabel}
                          </span>
                          <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">
                            {activeProject.category}
                          </span>
                        </div>

                        {/* Badge */}
                        <span className="inline-block text-[10px] font-mono bg-white/10 rounded-full px-2 py-0.5 mb-2 text-white/80">
                          {activeProject.badge}
                        </span>

                        {/* Title */}
                        <h3 className="font-sans text-base font-bold text-white leading-tight mb-2">
                          {activeProject.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-white/55 leading-relaxed line-clamp-3">
                          {activeProject.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-4 pt-3 border-t mt-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        {activeProject.stats.map((s, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">
                              {s.label}
                            </span>
                            <span className="font-mono text-xs font-bold" style={{ color: activeProject.color }}>
                              {s.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar — auto-dismiss timer */}
                  <div className="relative h-0.5 bg-white/5">
                    <motion.div
                      className="h-full"
                      style={{ background: activeProject.color }}
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Pin legend ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {PIN_PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105"
              style={{
                borderColor: `${p.color}40`,
                background: `${p.color}10`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
              />
              <span className="font-mono text-xs text-white/70">
                {p.pinLabel} — {p.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
