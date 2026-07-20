"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Twitter, Send, Phone, MapPin } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", organization: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5 z-10"
    >
      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Contact copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-6"
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase">
              Get in touch
            </span>
            <h3 className="font-sans text-4xl md:text-6xl font-bold tracking-tighter text-white">
              Let's Build The Future Together.
            </h3>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
              Whether you are looking to collaborate on cutting-edge hardware/AI projects, 
              invite me to speak at STEM conferences, partner with NION Academy, or discuss engineering internships — 
              let's connect and design impactful systems.
            </p>

            <div className="flex flex-col gap-4 mt-6 font-mono text-sm text-white/70">
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <a href="mailto:omotoyosiagboola74@gmail.com" className="hover:text-white transition-colors">
                  omotoyosiagboola74@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <a href="tel:+2348154744802" className="hover:text-white transition-colors">
                  +234 815 474 4802
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span>Ogun State, Nigeria</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass p-8 md:p-10 rounded-2xl flex flex-col gap-6 w-full max-w-lg mx-auto"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-xs text-white/50 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Ada Lovelace"
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-sans text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-xs text-white/50 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="ada@example.com"
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-sans text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="organization" className="font-mono text-xs text-white/50 uppercase tracking-wider">
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  value={formState.organization}
                  onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                  placeholder="NextTech Labs"
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-sans text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs text-white/50 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Let's build a smart environmental grid..."
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-sans text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3.5 font-medium text-black transition-all hover:bg-white/90 disabled:opacity-50 mt-2 cursor-pointer"
              >
                {status === "sending" ? (
                  <span>Sending...</span>
                ) : status === "success" ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer/Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-24 pt-8 border-t border-white/5 gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-6 w-auto filter invert brightness-200 contrast-200 mix-blend-screen opacity-70"
            />
            <span className="font-mono text-xs text-white/30">
              © {new Date().getFullYear()} Oyindamola Deji-Agboola. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/oyindamola-deji-agboola-engr-yinka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors p-2 border border-white/5 rounded-full bg-white/5 hover:border-white/20"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors p-2 border border-white/5 rounded-full bg-white/5 hover:border-white/20"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:omotoyosiagboola74@gmail.com"
              className="text-white/40 hover:text-white transition-colors p-2 border border-white/5 rounded-full bg-white/5 hover:border-white/20"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors p-2 border border-white/5 rounded-full bg-white/5 hover:border-white/20"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
