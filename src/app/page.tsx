import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
