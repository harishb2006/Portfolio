import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline();
      
      heroTl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 2.5,
        ease: "power4.out"
      });
      
      heroTl.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");
      
      heroTl.from(ctaRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.6");

      // Scroll animations for cards
      gsap.from(cardsRef.current.children, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top bottom-=100",
          end: "bottom center",
          scrub: 1
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
      });

      // Parallax effect
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", 
          end: "bottom top",
          scrub: true
        },
        y: (i, el) => -ScrollTrigger.maxScroll(window) * el.dataset.speed,
        ease: "none"
      });

      // Rotating elements
      gsap.to(".rotating-element", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: 0.5
        },
        rotation: 360,
        ease: "none"
      });
      
      // Scale effect on scroll
      gsap.to(".scale-on-scroll", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center bottom",
          end: "center center",
          scrub: true
        },
        scale: 1.2,
        ease: "power1.inOut"
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="min-h-screen relative overflow-hidden">
      {/* Content same as before */}
      {/* Decorative elements with parallax */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl parallax-bg" data-speed="0.2"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/30 rounded-full blur-3xl parallax-bg" data-speed="0.3"></div>
      <div className="absolute bottom-40 left-1/4 w-60 h-60 bg-accent/30 rounded-full blur-3xl parallax-bg" data-speed="0.15"></div>
      
      {/* Rotating geometric shapes */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-primary/50 rotating-element"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border-2 border-accent/50 rounded-full rotating-element"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-secondary/50 rounded-md rotating-element"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-36 md:pt-40 lg:pt-48 pb-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            ref={titleRef} 
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 gradient-text"
          >
            Harish B <span className="block">Web Developer</span>
          </h1>
          
          <p 
            ref={subtitleRef} 
            className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto"
          >
            Crafting immersive web experiences with cutting-edge technologies and creative design solutions.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 scale-on-scroll">
              Get in Touch
            </button>
            <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-transparent border-2 border-white/30 text-white rounded-full text-lg font-medium hover:bg-white/10 transition-all duration-300">
              View Projects
            </button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {/* Card 1 */}
          <div className="glass rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Web Development</h3>
            <p className="text-white/80">Creating responsive, modern websites with the latest technologies and best practices.</p>
          </div>
          
          {/* Card 2 */}
          <div className="glass rounded-2xl p-8 hover:shadow-xl hover:shadow-secondary/20 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">UI/UX Design</h3>
            <p className="text-white/80">Designing beautiful, intuitive interfaces that provide exceptional user experiences.</p>
          </div>
          
          {/* Card 3 */}
          <div className="glass rounded-2xl p-8 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Interactive Experiences</h3>
            <p className="text-white/80">Building dynamic web applications with engaging animations and 3D elements.</p>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Home;