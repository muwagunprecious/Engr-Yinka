"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const SWEEP_DURATION = 5000; // ms per full 360° rotation

const radarBlips = [
  {
    id: 0,
    label: "Embedded Systems Engineer",
    sublabel: "Custom firmware, PCB design & hardware prototyping",
    angle: 18,
    radius: 0.55,
    tag: "CORE SKILL",
  },
  {
    id: 1,
    label: "IoT Specialist",
    sublabel: "Low-power mesh networks & real-time environmental sensing",
    angle: 65,
    radius: 0.40,
    tag: "EXPERTISE",
  },
  {
    id: 2,
    label: "AI Developer",
    sublabel: "Edge AI & deep learning deployed on microcontrollers",
    angle: 112,
    radius: 0.70,
    tag: "EXPERTISE",
  },
  {
    id: 3,
    label: "MoyoCare-Her",
    sublabel: "🏆 Best Lovable Project — AI wellness companion for female students",
    angle: 158,
    radius: 0.48,
    tag: "PROJECT",
  },
  {
    id: 4,
    label: "NION Academy",
    sublabel: "EdTech Co-Founder building learning systems across Africa",
    angle: 205,
    radius: 0.63,
    tag: "VENTURE",
  },
  {
    id: 5,
    label: "APWEN President",
    sublabel: "Leading the OOU Collegiate Chapter, empowering women engineers",
    angle: 248,
    radius: 0.38,
    tag: "LEADERSHIP",
  },
  {
    id: 6,
    label: "STEM Advocate",
    sublabel: "5,000+ African students reached across hackathons & bootcamps",
    angle: 295,
    radius: 0.72,
    tag: "IMPACT",
  },
  {
    id: 7,
    label: "500+ Women Mentored",
    sublabel: "Through APWEN & community-led STEM outreach initiatives",
    angle: 338,
    radius: 0.52,
    tag: "IMPACT",
  },
];

const TAG_COLORS: Record<string, string> = {
  "CORE SKILL": "#4ade80",
  "EXPERTISE":  "#34d399",
  "PROJECT":    "#a78bfa",
  "VENTURE":    "#60a5fa",
  "LEADERSHIP": "#f472b6",
  "IMPACT":     "#fb923c",
};

const CENTER = 200;
const MAX_R  = 175;

type Blip = typeof radarBlips[0];

function polarToXY(angleDeg: number, radius: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: CENTER + MAX_R * radius * Math.cos(rad),
    y: CENTER + MAX_R * radius * Math.sin(rad),
  };
}

export default function RadarScan() {
  const [sweepAngle,  setSweepAngle]  = useState(0);
  const [activeBlip,  setActiveBlip]  = useState<Blip | null>(null);
  const [pingBlipId,  setPingBlipId]  = useState<number | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const frameRef     = useRef<number | null>(null);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pingTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === null) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const angle = (elapsed / SWEEP_DURATION) * 360 % 360;
    setSweepAngle(angle);
    // continue animation loop
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Start sweep animation
    frameRef.current = requestAnimationFrame(animate);
    // Cycle active blip every 5 seconds
    const cycleInterval = setInterval(() => {
      setActiveBlip(prev => {
        const nextIndex = (prev?.id ?? -1) + 1;
        const blip = radarBlips[nextIndex % radarBlips.length];
        setPingBlipId(blip.id);
        // clear ping after 1.5s
        if (pingTimerRef.current) clearTimeout(pingTimerRef.current);
        pingTimerRef.current = setTimeout(() => setPingBlipId(null), 1500);
        return blip;
      });
    }, 5000);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      clearInterval(cycleInterval);
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
      if (pingTimerRef.current) clearTimeout(pingTimerRef.current);
    };
  }, [animate]);

  // Build sweep wedge path
  const wedgeDeg = 70;
  const rad1 = ((sweepAngle - 90) * Math.PI) / 180;
  const rad2 = ((sweepAngle + wedgeDeg - 90) * Math.PI) / 180;
  const ex1  = CENTER + MAX_R * Math.cos(rad1);
  const ey1  = CENTER + MAX_R * Math.sin(rad1);
  const ex2  = CENTER + MAX_R * Math.cos(rad2);
  const ey2  = CENTER + MAX_R * Math.sin(rad2);
  const sweepPath = `M ${CENTER} ${CENTER} L ${ex2} ${ey2} A ${MAX_R} ${MAX_R} 0 0 0 ${ex1} ${ey1} Z`;

  const tagColor = activeBlip ? (TAG_COLORS[activeBlip.tag] ?? "#4ade80") : "#4ade80";
  const activePos = activeBlip ? polarToXY(activeBlip.angle, activeBlip.radius) : null;

  return (
    <section
      id="radar"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5 bg-[#020405]"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-green-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs font-semibold tracking-widest text-green-400/70 uppercase mb-4"
          >
            Signal Scan · Active
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-2xl"
          >
            Detecting all signals from Engineer Yinka.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-base mt-4 max-w-lg"
          >
            Watch the sweep reveal her expertise, projects, and impact — one signal at a time.
          </motion.p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">

          {/* ── Radar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 rounded-full bg-green-400/10 blur-3xl scale-110 pointer-events-none" />

            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="relative drop-shadow-[0_0_40px_rgba(74,222,128,0.2)]"
            >
              <defs>
                <radialGradient id="radar-bg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(0,22,10,0.97)" />
                  <stop offset="100%" stopColor="rgba(0,6,2,0.99)" />
                </radialGradient>
                <clipPath id="radar-clip">
                  <circle cx={CENTER} cy={CENTER} r={MAX_R} />
                </clipPath>
              </defs>

              {/* BG disc */}
              <circle cx={CENTER} cy={CENTER} r={MAX_R} fill="url(#radar-bg)" />

              {/* Concentric rings */}
              {[0.25, 0.5, 0.75, 1].map((r) => (
                <circle
                  key={r}
                  cx={CENTER} cy={CENTER}
                  r={MAX_R * r}
                  fill="none"
                  stroke="rgba(74,222,128,0.13)"
                  strokeWidth={r === 1 ? 1.5 : 1}
                />
              ))}

              {/* Crosshair lines */}
              {[0, 45, 90, 135].map((deg) => {
                const r = ((deg - 90) * Math.PI) / 180;
                return (
                  <line key={deg}
                    x1={CENTER + MAX_R * Math.cos(r)} y1={CENTER + MAX_R * Math.sin(r)}
                    x2={CENTER - MAX_R * Math.cos(r)} y2={CENTER - MAX_R * Math.sin(r)}
                    stroke="rgba(74,222,128,0.07)" strokeWidth="1"
                  />
                );
              })}

              {/* Sweep wedge */}
              <g clipPath="url(#radar-clip)">
                <defs>
                  <radialGradient id="sweep-fill" cx="0%" cy="0%" r="100%">
                    <stop offset="0%"   stopColor="rgba(74,222,128,0.40)" />
                    <stop offset="100%" stopColor="rgba(74,222,128,0.00)" />
                  </radialGradient>
                </defs>
                <path d={sweepPath} fill="url(#sweep-fill)" />
                <line
                  x1={CENTER} y1={CENTER}
                  x2={ex1} y2={ey1}
                  stroke="rgba(74,222,128,0.9)" strokeWidth="1.5"
                />
              </g>

              {/* Blips */}
              {radarBlips.map((blip) => {
                const { x, y } = polarToXY(blip.angle, blip.radius);
                const isPinging = pingBlipId === blip.id;
                const color = TAG_COLORS[blip.tag] ?? "#4ade80";

                return (
                  <g key={blip.id}>
                    {isPinging && (
                      <circle cx={x} cy={y} r="5" fill="none" stroke={color} strokeWidth="1.5">
                        <animate attributeName="r"       values="5;26;5"    dur="1.2s" repeatCount="2" />
                        <animate attributeName="opacity" values="1;0;1"     dur="1.2s" repeatCount="2" />
                      </circle>
                    )}
                    <circle
                      cx={x} cy={y}
                      r={isPinging ? 5.5 : 3.5}
                      fill={isPinging ? color : "rgba(74,222,128,0.45)"}
                      style={{ transition: "r 0.15s, fill 0.15s" }}
                    />
                  </g>
                );
              })}

              {/* Center */}
              <circle cx={CENTER} cy={CENTER} r="4"  fill="#4ade80" />
              <circle cx={CENTER} cy={CENTER} r="9"  fill="none" stroke="rgba(74,222,128,0.25)" strokeWidth="1" />
              <circle cx={CENTER} cy={CENTER} r="16" fill="none" stroke="rgba(74,222,128,0.1)"  strokeWidth="1" />

              {/* HUD labels */}
              <text x="8"         y="16"            fill="rgba(74,222,128,0.35)" fontSize="7.5" fontFamily="monospace">SCAN</text>
              <text x={MAX_R*2-8} y="16"            fill="rgba(74,222,128,0.35)" fontSize="7.5" fontFamily="monospace" textAnchor="end">ENG-YINKA</text>
              <text x="8"         y={MAX_R*2-6}     fill="rgba(74,222,128,0.35)" fontSize="7.5" fontFamily="monospace">ACTIVE</text>
              <text x={MAX_R*2-8} y={MAX_R*2-6}     fill="rgba(74,222,128,0.35)" fontSize="7.5" fontFamily="monospace" textAnchor="end">360°</text>
            </svg>
          </motion.div>

          {/* ── Signal Display: single card pops up / down ── */}
          <div className="w-full max-w-md min-h-[240px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {activeBlip ? (
                <motion.div
                  key={activeBlip.id}
                  initial={{ opacity: 0, scale: 0.82, y: 30 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{   opacity: 0, scale: 0.88,  y: -20 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="w-full rounded-2xl overflow-hidden relative"
                  style={{
                    border:     `1px solid ${tagColor}50`,
                    background: `radial-gradient(ellipse at 20% 30%, ${tagColor}12, transparent 65%), rgba(8,12,10,0.85)`,
                    boxShadow:  `0 0 40px ${tagColor}20, 0 0 80px ${tagColor}08`,
                  }}
                >
                  {/* Top bar */}
                  <div
                    className="flex items-center gap-3 px-6 py-3 border-b"
                    style={{ borderColor: `${tagColor}25`, background: `${tagColor}0a` }}
                  >
                    {/* Blinking dot */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: tagColor }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{ backgroundColor: tagColor }}
                      />
                    </span>
                    <span
                      className="font-mono text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: tagColor }}
                    >
                      {activeBlip.tag}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-white/25 tracking-wider">
                      SIG·{String(activeBlip.id + 1).padStart(2, "0")} DETECTED
                    </span>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-7">
                    <h3 className="font-sans text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                      {activeBlip.label}
                    </h3>
                    <p className="font-sans text-white/60 text-sm md:text-base leading-relaxed">
                      {activeBlip.sublabel}
                    </p>
                  </div>

                  {/* Progress bar that drains over 3.2s */}
                  <div className="h-[2px] w-full bg-white/5">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: tagColor }}
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  {/* Idle pulse */}
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <span className="animate-ping absolute w-8 h-8 rounded-full bg-green-400/20" />
                    <span className="w-3 h-3 rounded-full bg-green-400/40" />
                  </div>
                  <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
                    Scanning…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
