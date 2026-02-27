import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal-wrapper");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((sec) => revealObserver.observe(sec));

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Highlight nav link
            const id = entry.target.getAttribute("id");
            if (id) {
              document.querySelectorAll(`header nav a`).forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                  link.classList.add("active");
                }
              });
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((sec) => activeObserver.observe(sec));

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="animated-bg"></div>
      <div className="grid-overlay"></div>
      <Header />
      <main className="container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
