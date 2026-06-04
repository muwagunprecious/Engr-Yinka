"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Heart, Users, Calendar, Rocket, Compass, Globe } from "lucide-react";

interface StatItem {
  metric: string;
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    metric: "Women Mentored",
    value: 500,
    suffix: "+",
    label: "Through APWEN and STEM outreach initiatives.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    metric: "Tech Events Led",
    value: 35,
    suffix: "+",
    label: "Hackathons, technical panels, workshops, and STEM bootcamps.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    metric: "Projects Built",
    value: 25,
    suffix: "+",
    label: "Embedded devices, IoT applications, and AI integrations.",
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    metric: "Community Impact",
    value: 5000,
    suffix: "+",
    label: "African students reached with technology education & mentorship.",
    icon: <Users className="w-5 h-5" />,
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, count, value]);

  return (
    <span className="font-mono text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5 z-10"
    >
      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Three-Column Layout Header with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 md:mb-24 items-center">
          <div className="flex flex-col items-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase mb-4"
            >
              Leadership & Impact
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-3xl md:text-4xl font-bold tracking-tighter text-white"
            >
              Fostering the next generation of technological innovation.
            </motion.h3>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center text-white/60 text-sm leading-relaxed gap-4"
          >
            <p>
              As the Collegiate President of APWEN OOU and Co-Founder of NION Academy, 
              Oyindamola is dedicated to promoting STEM advocacy and empowering 
              women in engineering across Africa.
            </p>
            <p>
              Her work focuses on ethical AI development, Afro-centered AI innovation, 
              and creating hardware systems tailored to solving localized challenges in 
              agriculture, health, and education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full aspect-square rounded-2xl border border-white/10 overflow-hidden glass relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
            <img
              src="/mg_0440.jpeg"
              alt="Engineer Yinka Community Leadership"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                STEM Outreach & Advocacy
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col justify-between h-[220px] hover:border-white/20 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Card accent glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                  {stat.metric}
                </span>
                <div className="p-2 border border-white/10 rounded-lg bg-black text-white/60">
                  {stat.icon}
                </div>
              </div>
              
              <div className="flex flex-col mt-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-white/50 text-xs mt-2 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
