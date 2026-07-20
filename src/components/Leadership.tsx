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
              Oyindamola is a multi-disciplinary leader dedicated to promoting STEM advocacy and empowering 
              the next generation of engineers across Africa. As a Certified Meta AI Academy Developer, 
              she bridges AI model deployment and hardware prototyping.
            </p>
            <p>
              Her focus lies in designing and building localized, Afro-centered robotics and IoT solutions 
              to address real-world challenges while actively mentoring peers and leading tech communities.
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

        {/* Speaking Engagements & Leadership Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pt-16 border-t border-white/5">
          {/* Leadership Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h4 className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase">
              Community Roles
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { role: "President", org: "Association of Professional Women Engineers of Nigeria (APWEN), OOU Chapter", desc: "Previously Vice-President; leading initiatives that empower and mentor women pursuing engineering and technology careers." },
                { role: "Assistant Team Lead", org: "OOU Tech Community", desc: "Previously Sub-Community Manager, Embedded Systems & IoT; training students and driving digital transformation." },
                { role: "Chapter Lead", org: "WAAW, OOU CEES Chapter", desc: "Leading workshops and outreach to encourage girls to pursue STEM careers." },
                { role: "Former Institution Lead", org: "Robotics and Artificial Intelligence Innovators Network (RAIN-INN)", desc: "Facilitating learning, workshops, and innovation in robotics and AI networks." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="flex-1">
                    <h5 className="font-sans text-sm font-bold text-white">{item.role}</h5>
                    <span className="font-mono text-[10px] text-blue-400">{item.org}</span>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Speaking Engagements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <h4 className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase">
              Speaking Engagements
            </h4>
            <div className="flex flex-col gap-4">
              {[
                {
                  event: "Rotaract District 9112 Collegiate Conference",
                  date: "April 2026",
                  topic: "Presented on 'The Digital Edge' - discussing digital transformation and tech opportunities.",
                },
                {
                  event: "OOU Future Tech Conference",
                  date: "March 2026",
                  topic: "Served as a Panelist & Speaker sharing insights on tech integration and career development.",
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <h5 className="font-sans text-sm font-bold text-white">{item.event}</h5>
                      <span className="font-mono text-[10px] text-white/30 whitespace-nowrap">{item.date}</span>
                    </div>
                    <p className="text-white/60 text-xs mt-2 leading-relaxed">{item.topic}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
