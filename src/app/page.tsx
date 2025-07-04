import Hero from "../components/Hero";
import About from "../components/About";
import WorkHistory from "../components/WorkHistory";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WorkHistory/>
      <Projects />
      <Contact />
    </main>
  );
}
