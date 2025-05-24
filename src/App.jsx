import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ThreeBackground from './components/ThreeBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const appRef = useRef(null);

  useEffect(() => {
    // Simulate loading time - reduced to ensure quicker display
    setTimeout(() => setLoading(false), 1500);
    
    // Initial animations
    const ctx = gsap.context(() => {
      gsap.to('.loader', {
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          // Ensure loader is removed from the DOM flow after animation
          gsap.set('.loader', { display: 'none' });
        }
      });
      
      // Content fade-in after loader is gone
      gsap.from('.fade-in', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        delay: 1.8
      });
    }, appRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="relative min-h-screen overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Loader */}
      {loading && (
        <div className="loader fixed inset-0 z-50 flex items-center justify-center bg-dark">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent mb-4"></div>
            <h2 className="text-xl font-semibold gradient-text">Creating Experience...</h2>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Home />
        <Projects />
        <Skills />
        <Contact />
        
        {/* Footer */}
        <footer className="py-8 text-center text-white/70">
          <div className="container mx-auto px-4">
            <p>© 2025 Immersive Experience. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;