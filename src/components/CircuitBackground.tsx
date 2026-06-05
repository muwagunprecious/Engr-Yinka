"use client";
import React, { useMemo } from 'react';

export default function CircuitBackground() {
  // Generate circuit paths programmatically to keep it clean and highly customizable
  const buses = useMemo(() => {
    return [
      // Top Left Bus (4 parallel lines)
      {
        id: 'top-left',
        count: 4,
        spacing: 12,
        delay: '0s',
        duration: '7s',
        points: (offset: number) => 
          `M ${-50} ${100 + offset} 
           L ${200 + offset * 0.7} ${100 + offset} 
           L ${350 + offset * 0.7} ${250 + offset} 
           L ${350 + offset * 0.7} ${450 + offset} 
           L ${500 + offset * 0.7} ${600 + offset} 
           L ${900} ${600 + offset}`
      },
      // Bottom Right Bus (5 parallel lines)
      {
        id: 'bottom-right',
        count: 5,
        spacing: 14,
        delay: '1.5s',
        duration: '9s',
        points: (offset: number) => 
          `M ${1250} ${700 + offset} 
           L ${900 + offset * 0.7} ${700 + offset} 
           L ${750 + offset * 0.7} ${550 + offset} 
           L ${600 + offset * 0.7} ${550 + offset} 
           L ${400 + offset * 0.7} ${350 + offset} 
           L ${-50} ${350 + offset}`
      },
      // Top Right Bus (3 parallel lines)
      {
        id: 'top-right',
        count: 3,
        spacing: 15,
        delay: '3s',
        duration: '8s',
        points: (offset: number) => 
          `M ${1250} ${150 + offset} 
           L ${1000 + offset} ${150 + offset} 
           L ${800 + offset} ${350 + offset} 
           L ${800 + offset} ${550 + offset} 
           L ${650 + offset} ${700 + offset} 
           L ${200} ${700 + offset}`
      },
      // Central branching single traces
      {
        id: 'center-branch-1',
        count: 1,
        spacing: 0,
        delay: '0.5s',
        duration: '5s',
        points: () => 'M 450 150 L 550 150 L 600 200 L 600 350 L 650 400 L 800 400'
      },
      {
        id: 'center-branch-2',
        count: 1,
        spacing: 0,
        delay: '2.5s',
        duration: '6s',
        points: () => 'M 300 650 L 400 650 L 450 600 L 450 450 L 500 400 L 700 400'
      },
      {
        id: 'side-branch-3',
        count: 1,
        spacing: 0,
        delay: '4s',
        duration: '5.5s',
        points: () => 'M 100 800 L 100 600 L 200 500 L 200 300 L 150 250 L -50 250'
      }
    ];
  }, []);

  return (
    <div className="circuit-bg" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="opacity-20"
      >
        <defs>
          {/* Radial gradient for the background glow to match the premium dark vibe */}
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          {/* Glow filter for the moving current */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow */}
        <rect width="1200" height="800" fill="url(#bgGlow)" />

        {/* Render traces and current pulses */}
        {buses.map((bus) => {
          return [...Array(bus.count)].map((_, index) => {
            const offset = (index - (bus.count - 1) / 2) * bus.spacing;
            const pathData = bus.points(offset);

            return (
              <g key={`${bus.id}-${index}`}>
                {/* Background trace line (static PCB wire) */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1.2"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Animated current pulse (Thick glowing background stroke) */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeOpacity="0.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: '30 200',
                    animation: `circuitFlow ${bus.duration} linear infinite`,
                    animationDelay: bus.delay,
                    willChange: 'stroke-dashoffset',
                  }}
                  className="current-path"
                />

                {/* Animated current pulse (Sharp core stroke) */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeOpacity="0.95"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: '30 200',
                    animation: `circuitFlow ${bus.duration} linear infinite`,
                    animationDelay: bus.delay,
                    willChange: 'stroke-dashoffset',
                  }}
                  className="current-path"
                />

                {/* Pad/terminal dots at start and end of paths */}
                {index === 0 && (
                  <>
                    <circle cx={100} cy={100} r="3" fill="#475569" opacity="0.5" />
                    <circle cx={900} cy={600} r="3" fill="#475569" opacity="0.5" />
                  </>
                )}
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
}
