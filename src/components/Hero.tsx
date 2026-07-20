"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import React, { useState } from "react";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6 md:px-12 lg:px-24 z-10"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full max-w-7xl mx-auto z-10 items-center">
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          <div className="flex items-center gap-3 mb-1">
            <img
              src="/logo.png"
              alt="Oyindamola Deji-Agboola Emblem"
              className="h-20 md:h-28 w-auto filter invert brightness-200 contrast-200 mix-blend-screen object-contain"
            />
          </div>

          <div className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur-md">
            <span className="font-mono text-xs font-medium tracking-widest text-white/80 uppercase">
              Embedded Systems & IoT • Machine Learning • Meta AI Developer
            </span>
          </div>

          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tighter text-white">
            <span className="block">OYINDAMOLA</span>
            <span className="block text-white/90">DEJI-AGBOOLA</span>
          </h1>

          <p className="max-w-xl text-lg text-white/60 font-medium leading-relaxed">
            Professional with multi-disciplinary expertise as an Embedded Systems and IoT Engineer,
            Machine Learning Engineer, and a Certified Meta AI Academy Developer. Highly skilled in
            Python, AI model deployment, and industrial automation. Passionate about applying robotics
            and AI solutions to real-world, Afro-centered challenges.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <a href="#projects" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3 font-medium text-black transition-all hover:bg-white/90">
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a href="#contact" className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-3 font-medium text-white transition-all hover:bg-white/5">
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Interactive Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative perspective-[1000px] w-full max-w-md mx-auto lg:ml-auto"
        >
          {/* Tilt Container */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY, // Handles mouse-tilt
              transformStyle: "preserve-3d",
            }}
            className="w-full aspect-[3/4] rounded-2xl"
          >
            {/* Flip Container */}
            <motion.div
              onClick={() => setIsFlipped(!isFlipped)}
              animate={{
                rotateY: isFlipped ? 180 : 0, // Handles click-flip
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{
                transformStyle: "preserve-3d",
                width: "100%",
                height: "100%",
              }}
              className="relative w-full h-full cursor-pointer"
            >
              {/* Front Card */}
              <div
                className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 glass overflow-hidden backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <img
                  src="/mg_0434.jpeg"
                  alt="Oyindamola Deji-Agboola Front Portrait"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Back Card */}
              <div
                className="absolute inset-0 rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
                <img
                   src="/engr_ykk.jpeg"
                   alt="Oyindamola Deji-Agboola – Engineer Yinka"
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center z-20">
                   <h3 className="text-xl font-bold mb-2 text-white">Engineer Yinka</h3>
                   <p className="text-sm text-white/70">Embedded Systems · IoT · AI</p>
                 </div>
              </div>
              
              {/* Gloss Reflection */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
