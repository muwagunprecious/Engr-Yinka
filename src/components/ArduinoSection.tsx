"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
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
    description: "AI-powered wellness companion for female students with real-time guidance.",
    portrait: "/engr_yinka_1.jpeg",
    icon: <Brain className="w-4 h-4" />,
    stats: [{ label: "Accuracy", value: "98.2%" }, { label: "DAU", value: "1.2k+" }],
    color: "#4ade80",
  },
  {
    id: 1,
    pinLabel: "D9",
    title: "IoT Solutions Network",
    category: "IoT • Wireless",
    badge: "🌐 Live Network",
    description: "Low-power mesh networks for real-time environmental monitoring.",
    portrait: "/mg_0434.jpeg",
    icon: <Radio className="w-4 h-4" />,
    stats: [{ label: "Uptime", value: "99.99%" }, { label: "Latency", value: "12ms" }],
    color: "#38bdf8",
  },
  {
    id: 2,
    pinLabel: "D5",
    title: "Embedded Prototypes",
    category: "Embedded Systems",
    badge: "⚙️ Custom PCB",
    description: "Custom firmware & PCB design for smart hardware telemetry.",
    portrait: "/engr_ykk.jpeg",
    icon: <Cpu className="w-4 h-4" />,
    stats: [{ label: "Power", value: "1.2mW" }, { label: "Clock", value: "168MHz" }],
    color: "#f59e0b",
  },
  {
    id: 3,
    pinLabel: "A0",
    title: "Industrial Automation",
    category: "Automation",
    badge: "🏭 Industry Grade",
    description: "PLC programming & SCADA for automated manufacturing workflows.",
    portrait: "/mg_0440.jpeg",
    icon: <Settings className="w-4 h-4" />,
    stats: [{ label: "Throughput", value: "+30%" }, { label: "Fail Rate", value: "<0.01%" }],
    color: "#c084fc",
  },
];

const POPUP_DURATION = 3200; // ms each popup stays visible

/* ─── Wire paths ─────────────────────────────────────────────────────── */
const WIRES = [
  { id: 0, color: "#4ade80", d: "M -20 90 L 120 90 L 120 110 L 290 110 L 290 90 L 400 90", pinHitX: 400, pinHitY: 90, duration: 3.5, delay: 0 },
  { id: 1, color: "#38bdf8", d: "M 920 140 L 780 140 L 780 110 L 600 110 L 600 140 L 500 140", pinHitX: 500, pinHitY: 140, duration: 3.8, delay: 0.4 },
  { id: 2, color: "#f59e0b", d: "M 60 520 L 60 380 L 150 380 L 150 340 L 320 340 L 320 300 L 430 300", pinHitX: 430, pinHitY: 300, duration: 4.2, delay: 0.8 },
  { id: 3, color: "#c084fc", d: "M 860 520 L 860 390 L 730 390 L 730 360 L 600 360 L 600 310 L 530 310", pinHitX: 530, pinHitY: 310, duration: 4.0, delay: 1.2 },
];

const DIGITAL_PINS = Array.from({ length: 14 }, (_, i) => ({ x: 408 + i * 28, y: 82, label: `D${13 - i}` }));
const ANALOG_PINS  = Array.from({ length: 6  }, (_, i) => ({ x: 408 + i * 28, y: 308, label: `A${i}` }));

/* ─── Component ──────────────────────────────────────────────────────── */
export default function ArduinoSection() {
  const [activeIdx, setActiveIdx]     = useState<number | null>(null);
  const [firedWires, setFiredWires]   = useState<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Fire LED dots when wires first reach their pins */
  useEffect(() => {
    const timers = WIRES.map((wire) =>
      setTimeout(() => {
        setFiredWires((prev) => new Set([...prev, wire.id]));
      }, (wire.delay + wire.duration) * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Continuously cycle through projects */
  const startCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIdx(0);
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % PIN_PROJECTS.length;
      setActiveIdx(idx);
    }, POPUP_DURATION);
  }, []);

  /* Start cycling after wires have had time to reach the board */
  useEffect(() => {
    const t = setTimeout(startCycle, 3800);
    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startCycle]);

  const [bulbOn, setBulbOn] = useState(false);

  useEffect(() => {
    const bulbInterval = setInterval(() => {
      setBulbOn((prev) => !prev);
    }, 1500);
    return () => clearInterval(bulbInterval);
  }, []);

  const activeProject = activeIdx !== null ? PIN_PROJECTS[activeIdx] : null;

  return (
    <section
      id="arduino"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5 z-10"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Heading ────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase mb-4"
          >
            Hardware Showcase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-3xl"
          >
            Projects wired into every pin.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/50 max-w-xl text-sm"
          >
            Every wire that reaches the board powers a real project by Engineer Yinka.
          </motion.p>
        </div>

        {/* ── Arduino + Popup stage ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {/* SVG Arduino Board */}
          <svg viewBox="0 0 900 500" className="w-full max-w-4xl mx-auto block" aria-label="Interactive Arduino board">
            <defs>
              <linearGradient id="boardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#1a3a5c" />
                <stop offset="50%"  stopColor="#0e2a45" />
                <stop offset="100%" stopColor="#091e30" />
              </linearGradient>
              <linearGradient id="silkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#1e4976" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0a2d4a" stopOpacity="0.1" />
              </linearGradient>
              {WIRES.map((w) => (
                <filter key={w.id} id={`glow-${w.id}`}>
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              ))}
              <filter id="glow-bulb">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Board */}
            <rect x="250" y="60" width="500" height="380" rx="12" fill="url(#boardGrad)" />
            <rect x="250" y="60" width="500" height="380" rx="12" fill="url(#silkGrad)" />
            <rect x="250" y="60" width="500" height="380" rx="12" fill="none" stroke="#1e5f8a" strokeWidth="2" />

            {/* Mounting holes */}
            {([[268,78],[732,78],[268,422],[732,422]] as [number,number][]).map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="8" fill="#0a1f33" stroke="#1e5f8a" strokeWidth="1.5" />
                <circle cx={cx} cy={cy} r="3" fill="#0a1f33" stroke="#2a7fc0" strokeWidth="1" />
              </g>
            ))}

            {/* USB */}
            <rect x="240" y="140" width="26" height="50" rx="3" fill="#888" stroke="#aaa" strokeWidth="1" />
            <rect x="248" y="148" width="12" height="34" rx="1" fill="#333" />

            {/* DC Jack */}
            <rect x="240" y="340" width="30" height="36" rx="3" fill="#222" stroke="#555" strokeWidth="1" />
            <circle cx="255" cy="358" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            <circle cx="255" cy="358" r="3" fill="#333" />

            {/* ATmega328P chip */}
            <rect x="430" y="200" width="100" height="120" rx="4" fill="#111" stroke="#2a7fc0" strokeWidth="1.5" />
            {Array.from({length:7},(_,i)=><rect key={`cl${i}`} x="418" y={210+i*14} width="12" height="6" rx="1" fill="#aaa" />)}
            {Array.from({length:7},(_,i)=><rect key={`cr${i}`} x="530" y={210+i*14} width="12" height="6" rx="1" fill="#aaa" />)}
            <text x="480" y="255" textAnchor="middle" fill="#3a9fd5" fontSize="8" fontFamily="monospace">ATmega328P</text>
            <text x="480" y="267" textAnchor="middle" fill="#2a7fc0" fontSize="6" fontFamily="monospace">MICROCONTROLLER</text>

            {/* Crystal */}
            <rect x="380" y="232" width="30" height="14" rx="3" fill="#c8a000" stroke="#a07800" strokeWidth="1" />
            <text x="395" y="243" textAnchor="middle" fill="#fff8" fontSize="6" fontFamily="monospace">16MHz</text>

            {/* ICSP */}
            <rect x="550" y="200" width="36" height="24" rx="2" fill="#111" stroke="#444" strokeWidth="1" />
            {([[558,210],[566,210],[574,210],[582,210],[558,218],[566,218]] as [number,number][]).map(([px,py],i)=>(
              <circle key={i} cx={px} cy={py} r="2.5" fill="#c0c0c0" />
            ))}

            {/* Voltage regulator */}
            <rect x="310" y="340" width="20" height="30" rx="2" fill="#444" />
            <rect x="306" y="354" width="28" height="8"  rx="1" fill="#333" />

            {/* LEDs — light up when wire fires */}
            {PIN_PROJECTS.map((p, i) => (
              <circle
                key={p.id}
                cx={390 + i * 15} cy={130} r="5"
                fill={firedWires.has(i) ? p.color : "#0a1a2a"}
                style={{ filter: firedWires.has(i) ? `drop-shadow(0 0 6px ${p.color})` : "none", transition: "fill 0.4s" }}
              />
            ))}

            {/* Digital pins */}
            <text x="500" y="75" textAnchor="middle" fill="#3a9fd5" fontSize="7" fontFamily="monospace">DIGITAL (PWM~)</text>
            {DIGITAL_PINS.map((pin) => (
              <g key={pin.label}>
                <rect x={pin.x-5} y={pin.y-6} width="10" height="16" rx="2" fill="#1a1a1a" stroke="#2a7fc0" strokeWidth="1" />
                <circle cx={pin.x} cy={pin.y+2} r="2.5" fill="#c0c0c0" />
                <text x={pin.x} y={pin.y+22} textAnchor="middle" fill="#3a9fd5" fontSize="5.5" fontFamily="monospace">{pin.label}</text>
              </g>
            ))}

            {/* Analog pins */}
            <text x="462" y="328" textAnchor="middle" fill="#3a9fd5" fontSize="7" fontFamily="monospace">ANALOG IN</text>
            {ANALOG_PINS.map((pin) => (
              <g key={pin.label}>
                <rect x={pin.x-5} y={pin.y-6} width="10" height="16" rx="2" fill="#1a1a1a" stroke="#2a7fc0" strokeWidth="1" />
                <circle cx={pin.x} cy={pin.y+2} r="2.5" fill="#c0c0c0" />
                <text x={pin.x} y={pin.y+22} textAnchor="middle" fill="#3a9fd5" fontSize="5.5" fontFamily="monospace">{pin.label}</text>
              </g>
            ))}

            {/* Power pins */}
            <text x="328" y="75" textAnchor="middle" fill="#3a9fd5" fontSize="7" fontFamily="monospace">POWER</text>
            {["VIN","GND","GND","5V","3.3V","RST"].map((lbl,i)=>(
              <g key={lbl+i}>
                <rect x={264+i*18} y={76} width="10" height="16" rx="2" fill="#1a1a1a" stroke="#2a7fc0" strokeWidth="1" />
                <circle cx={269+i*18} cy={84} r="2.5" fill="#c0c0c0" />
                <text x={269+i*18} y={100} textAnchor="middle" fill="#3a9fd5" fontSize="4.5" fontFamily="monospace">{lbl}</text>
              </g>
            ))}

            {/* Silkscreen text */}
            <text x="480" y="170" textAnchor="middle" fill="#1a6fa8" fontSize="22" fontFamily="sans-serif" fontWeight="bold" opacity="0.5">Arduino</text>
            <text x="600" y="170" textAnchor="middle" fill="#1a6fa8" fontSize="14" fontFamily="sans-serif" fontWeight="bold" opacity="0.5">UNO</text>

            {/* PCB traces */}
            {["M 390 84 L 390 200","M 450 84 L 450 200","M 510 84 L 510 200","M 480 310 L 480 330","M 450 310 L 450 330","M 310 340 L 310 310 L 350 310"].map((d,i)=>(
              <path key={i} d={d} fill="none" stroke="#1e5f8a" strokeWidth="1" opacity="0.5" />
            ))}

            {/* Animated Wires */}
            {WIRES.map((wire) => (
              <g key={wire.id}>
                <path d={wire.d} fill="none" stroke={wire.color} strokeWidth="2.5" strokeOpacity="0.12" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d={wire.d} fill="none" stroke={wire.color} strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round"
                  filter={`url(#glow-${wire.id})`}
                  style={{ strokeDasharray: "40 300", animation: `circuitFlow ${wire.duration}s linear infinite`, animationDelay: `${wire.delay}s` }}
                />
                {firedWires.has(wire.id) && (
                  <circle cx={wire.pinHitX} cy={wire.pinHitY} r="6" fill={wire.color} opacity="0.9" style={{ filter: `drop-shadow(0 0 8px ${wire.color})` }}>
                    <animate attributeName="r" values="4;9;4" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}

            {/* Smart Bulb Wire & Bulb */}
            <path d="M 688 82 L 688 25 L 810 25 L 810 179" fill="none" stroke="#eab308" strokeWidth="2.5" strokeOpacity="0.15" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M 688 82 L 688 25 L 810 25 L 810 179" fill="none" stroke="#fbbf24" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              filter="url(#glow-bulb)"
              style={{ strokeDasharray: "30 200", animation: "circuitFlow 1.5s linear infinite" }}
            />

            <g transform="translate(785, 120)">
              {/* Connection point dot */}
              <circle cx="25" cy="59" r="3" fill="#fbbf24" style={{ filter: bulbOn ? "drop-shadow(0 0 5px #fbbf24)" : "none" }} />
              
              {/* Screw base */}
              <rect x="15" y="42" width="20" height="6" fill="#4b5563" rx="1.5" />
              <rect x="17" y="48" width="16" height="6" fill="#374151" rx="1" />
              <rect x="19" y="54" width="12" height="5" fill="#1f2937" rx="0.8" />

              {/* Bulb body/collar */}
              <path d="M 12 25 L 38 25 L 35 42 L 15 42 Z" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="0.5" />
              <rect x="15" y="28" width="20" height="3" fill="#cbd5e1" />

              {/* Filament inside (visible when ON) */}
              {bulbOn && (
                <path d="M 20 22 L 23 15 L 27 15 L 30 22" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 4px #fbbf24)" }} />
              )}

              {/* Glass dome */}
              <circle 
                cx="25" 
                cy="14" 
                r="20" 
                fill={bulbOn ? "rgba(253, 224, 71, 0.25)" : "rgba(39, 39, 42, 0.8)"} 
                stroke={bulbOn ? "#eab308" : "#4b5563"} 
                strokeWidth="2.5" 
                style={{ 
                  filter: bulbOn ? "url(#glow-bulb)" : "none",
                  transition: "all 0.3s ease-in-out" 
                }} 
              />

              {/* Smart Bulb Wi-Fi Wave Icon */}
              <g opacity={bulbOn ? 0.9 : 0.4} style={{ transition: "opacity 0.3s ease" }}>
                <path d="M 21 11 A 5 5 0 0 1 29 11" fill="none" stroke={bulbOn ? "#fef08a" : "#9ca3af"} strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 17 7 A 10 10 0 0 1 33 7" fill="none" stroke={bulbOn ? "#fef08a" : "#9ca3af"} strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="25" cy="15" r="1.5" fill={bulbOn ? "#fef08a" : "#9ca3af"} />
              </g>
            </g>
          </svg>

          {/* ── Popup — centred over the Arduino, emerges from the middle ── */}
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1,   y: 0  }}
                exit={{   opacity: 0, scale: 0.7,  y: -16 }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                /* Absolute centre of the SVG stage */
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 20 }}
              >
                <div
                  className="pointer-events-auto relative rounded-xl border overflow-hidden shadow-2xl"
                  style={{
                    width: 280,
                    borderColor: `${activeProject.color}50`,
                    background: "rgba(4, 10, 18, 0.97)",
                    backdropFilter: "blur(24px)",
                    boxShadow: `0 0 40px ${activeProject.color}30, 0 12px 40px rgba(0,0,0,0.9)`,
                  }}
                >
                  {/* Colour top bar */}
                  <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${activeProject.color}, transparent)` }} />

                  {/* Close */}
                  <button
                    onClick={() => { setActiveIdx(null); if (intervalRef.current) clearInterval(intervalRef.current); }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-20 transition-colors"
                  >
                    <X className="w-3 h-3 text-white/60" />
                  </button>

                  {/* Row: portrait + info */}
                  <div className="flex">
                    {/* Portrait */}
                    <div className="relative w-24 h-28 flex-shrink-0">
                      <img src={activeProject.portrait} alt="Engineer Yinka" className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 55%, rgba(4,10,18,0.97))" }} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-3 flex flex-col justify-center gap-1">
                      {/* PIN tag */}
                      <span
                        className="font-mono text-[8px] tracking-widest px-1.5 py-0.5 rounded-full border w-fit"
                        style={{ color: activeProject.color, borderColor: `${activeProject.color}50`, background: `${activeProject.color}15` }}
                      >
                        PIN {activeProject.pinLabel}
                      </span>

                      {/* Badge */}
                      <span className="text-[9px] font-mono text-white/60">{activeProject.badge}</span>

                      {/* Title */}
                      <h3 className="font-sans text-xs font-bold text-white leading-snug">{activeProject.title}</h3>

                      {/* Description */}
                      <p className="text-[9px] text-white/50 leading-relaxed line-clamp-2">{activeProject.description}</p>

                      {/* Stats */}
                      <div className="flex gap-3 pt-1.5 border-t mt-1" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        {activeProject.stats.map((s, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="font-mono text-[7px] uppercase tracking-wider text-white/40">{s.label}</span>
                            <span className="font-mono text-[10px] font-bold" style={{ color: activeProject.color }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-px bg-white/5">
                    <motion.div
                      className="h-full"
                      style={{ background: activeProject.color }}
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: POPUP_DURATION / 1000, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Pin legend ─────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {PIN_PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setActiveIdx(i);
                let idx = i;
                intervalRef.current = setInterval(() => {
                  idx = (idx + 1) % PIN_PROJECTS.length;
                  setActiveIdx(idx);
                }, POPUP_DURATION);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all duration-300 hover:scale-105"
              style={{ borderColor: `${p.color}40`, background: `${p.color}10` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.color, boxShadow: `0 0 5px ${p.color}` }} />
              <span className="font-mono text-white/60">{p.pinLabel} — {p.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
