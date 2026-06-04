import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RadarScan from "@/components/RadarScan";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <RadarScan />
      <Experience />
      <Projects />
      <Leadership />
      <Contact />
    </main>
  );
}
