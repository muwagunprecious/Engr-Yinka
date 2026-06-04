"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Radio, Brain, Settings, Shield } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  badge?: string;
  image?: string;
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
  sizeClass: string;
}

const projects: Project[] = [
  {
    title: "MoyoCare-Her",
    category: "AI • Wellness",
    description: "An AI-powered wellness companion designed for female students. Featuring secure, real-time AI conversations, personalized mental wellness guidance, resources, and a student-focused compassionate experience.",
    badge: "🏆 Best Lovable Project Award",
    image: "/moyocare.png",
    icon: <Brain className="w-5 h-5" />,
    stats: [
      { label: "Accuracy", value: "98.2%" },
      { label: "Daily Active Users", value: "1.2k+" },
      { label: "Response Time", value: "<200ms" },
    ],
    sizeClass: "col-span-1 lg:col-span-2 row-span-2",
  },
  {
    title: "IoT Solutions Network",
    category: "IoT • Wireless",
    description: "Connected environmental sensing nodes deploying low-power mesh networks for real-time monitoring.",
    icon: <Radio className="w-5 h-5" />,
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Latency", value: "12ms" },
    ],
    sizeClass: "col-span-1 row-span-1",
  },
  {
    title: "Embedded Hardware Prototypes",
    category: "Embedded Systems",
    description: "Custom firmware development and PCB design for smart hardware monitoring and telemetry systems.",
    icon: <Cpu className="w-5 h-5" />,
    stats: [
      { label: "Power Draw", value: "1.2mW" },
      { label: "Clock Speed", value: "168MHz" },
    ],
    sizeClass: "col-span-1 row-span-1",
  },
  {
    title: "Industrial Automation Systems",
    category: "Automation",
    description: "PLC programming and SCADA configuration for automated process flows in modern manufacturing.",
    icon: <Settings className="w-5 h-5" />,
    stats: [
      { label: "Throughput", value: "+30%" },
      { label: "Failure Rate", value: "<0.01%" },
    ],
    sizeClass: "col-span-1 row-span-1",
  },
  {
    title: "Edge AI Applications",
    category: "AI • Deep Learning",
    description: "Deploying lightweight object detection models on low-power microcontrollers at the edge.",
    icon: <Brain className="w-5 h-5" />,
    stats: [
      { label: "Model Size", value: "140KB" },
      { label: "FPS", value: "45" },
    ],
    sizeClass: "col-span-1 row-span-1",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
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
            Selected Works
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-2xl"
          >
            Engineering intelligent products that solve real-world problems.
          </motion.h3>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`group relative rounded-2xl border border-white/10 overflow-hidden bg-white/5 flex flex-col justify-between p-6 transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] ${project.sizeClass}`}
            >
              {/* Background gradient/reflection overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
              
              {/* Project Image for Featured (MoyoCare-Her) */}
              {project.image && (
                <>
                  <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />
                </>
              )}

              {/* Top Row: Category badge & Icon */}
              <div className="flex justify-between items-start z-10">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase border border-white/10 rounded-full px-3 py-1 bg-black/40 backdrop-blur-md">
                  {project.category}
                </span>
                <div className="p-2 border border-white/10 rounded-lg bg-black/40 text-white/70 group-hover:text-white transition-colors duration-300">
                  {project.icon}
                </div>
              </div>

              {/* Middle Row: Content */}
              <div className="z-10 mt-4">
                {project.badge && (
                  <span className="inline-block text-[11px] font-mono text-white bg-white/10 rounded-full px-3 py-1 mb-3">
                    {project.badge}
                  </span>
                )}
                <h4 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
                  {project.title}
                </h4>
                <p className="font-sans text-sm text-white/50 mt-2 line-clamp-3 group-hover:text-white/70 transition-colors">
                  {project.description}
                </p>
              </div>

              {/* Bottom Row: Stats & Action Arrow */}
              <div className="flex items-end justify-between z-10 pt-4 border-t border-white/5 mt-auto">
                <div className="flex gap-4">
                  {project.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex flex-col">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                        {stat.label}
                      </span>
                      <span className="font-mono text-xs font-bold text-white">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="w-8 h-8 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
