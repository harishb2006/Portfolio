import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      
      // Content blocks animation
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none"
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
      
      // Image animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      });
      
      // Decorative elements animation
      gsap.from(".about-decor", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        x: (index) => (index % 2 === 0 ? -100 : 100),
        y: -50,
        opacity: 0,
        rotation: (index) => (index % 2 === 0 ? -90 : 90),
        stagger: 0.2,
        duration: 1,
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 md:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="about-decor absolute top-20 left-10 w-24 h-24 border-2 border-primary/30 rounded-md rotate-12"></div>
      <div className="about-decor absolute bottom-40 right-20 w-32 h-32 border-2 border-accent/30 rounded-full"></div>
      <div className="about-decor absolute top-1/2 left-1/4 w-16 h-16 border-2 border-secondary/30 transform -rotate-15"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div ref={imageRef} className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-xl opacity-30 blur-lg"></div>
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Harish B" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
            </div>
          </div>
          
          {/* Content */}
          <div ref={contentRef} className="order-1 md:order-2">
            <h3 className="text-3xl font-bold mb-6">Web Developer & UI/UX Designer</h3>
            
            <div className="space-y-4">
              <p className="text-lg text-white/90">
                Hello! I'm Harish, a passionate web developer with expertise in creating dynamic, interactive web experiences. With over 5 years of experience, I specialize in modern JavaScript frameworks like React, animation libraries like GSAP, and 3D visualization with Three.js.
              </p>
              
              <p className="text-lg text-white/90">
                I focus on creating immersive digital experiences that combine beautiful design with cutting-edge technology. My goal is to build websites that not only look amazing but also provide exceptional user experiences.
              </p>
              
              <p className="text-lg text-white/90">
                When I'm not coding, you can find me exploring new design trends, experimenting with creative coding projects, or enjoying outdoor activities to recharge and find inspiration.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-accent font-semibold mb-2">Name</h4>
                <p>Harish B</p>
              </div>
              <div>
                <h4 className="text-accent font-semibold mb-2">Email</h4>
                <p>contact@harishb.com</p>
              </div>
              <div>
                <h4 className="text-accent font-semibold mb-2">Location</h4>
                <p>Bangalore, India</p>
              </div>
              <div>
                <h4 className="text-accent font-semibold mb-2">Availability</h4>
                <p>Freelance & Full-time</p>
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <a href="#contact" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
                Contact Me
              </a>
              <a href="#resume" className="px-6 py-2 bg-transparent border-2 border-white/20 text-white rounded-full hover:bg-white/10 transition-all duration-300">
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;