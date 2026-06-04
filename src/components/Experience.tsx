"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

interface TimelineItem {
  company: string;
  role: string;
  period: string;
  description: string;
  icon: React.ReactNode;
}

const experiences: TimelineItem[] = [
  {
    company: "APWEN OOU",
    role: "President",
    period: "Leadership Chapter",
    description: "Association of Professional Women Engineers of Nigeria (APWEN), OOU Collegiate Chapter. Leading initiatives that empower and mentor women pursuing engineering and technology careers.",
    icon: <Award className="w-5 h-5 text-white" />,
  },
  {
    company: "Nestlé",
    role: "Automation Experience",
    period: "Industrial Practice",
    description: "Worked on industrial automation systems, gaining practical experience in engineering operations, automation workflows, and modern industrial technologies.",
    icon: <Briefcase className="w-5 h-5 text-white" />,
  },
  {
    company: "NION Academy",
    role: "Co-Founder",
    period: "EdTech Venture",
    description: "Helping create educational opportunities through innovative EdTech solutions designed to improve learning outcomes for students.",
    icon: <GraduationCap className="w-5 h-5 text-white" />,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
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
            className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-2xl"
          >
            Building innovative solutions across AI, Embedded Systems, IoT, and STEM leadership.
          </motion.h3>
        </div>

        {/* Side by side layout for Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Her Image (Sticky on larger screens) */}
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
                Field Operations
              </span>
              <h4 className="font-sans text-lg font-bold text-white mt-1">
                Oyindamola Deji-Agboola
              </h4>
            </div>
          </motion.div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-7 relative border-l border-white/10 pl-8 ml-4 lg:ml-8">
            {/* Animated scrolling vertical progress line */}
            <motion.div
              className="absolute left-0 top-0 w-[1px] bg-white origin-top"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline marker */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center z-10 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                  {exp.icon}
                </div>

                {/* Card content */}
                <div className="glass hover:border-white/20 p-6 md:p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="font-mono text-xs text-white/50 tracking-wider mb-2 block">
                    {exp.period}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                    <h4 className="font-sans text-2xl font-bold text-white">
                      {exp.company}
                    </h4>
                    <span className="font-mono text-sm text-white/80 font-medium md:ml-2">
                      {exp.role}
                    </span>
                  </div>
                  <p className="text-white/60 text-base leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
