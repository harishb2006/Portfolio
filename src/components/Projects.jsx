import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        titleRef.current,
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animate projects
      gsap.fromTo(
        projectsRef.current.children,
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Parallax effect for decoration items
      gsap.to(".project-decor", {
        y: (i) => i * -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Hover animations for project cards
      const projectCards = projectsRef.current.children;
      Array.from(projectCards).forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            scale: 1.03,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            duration: 0.4
          });
          
          // Animate the image inside
          const img = card.querySelector('img');
          if (img) {
            gsap.to(img, {
              scale: 1.1,
              duration: 0.5
            });
          }
          
          // Animate the project-overlay
          const overlay = card.querySelector('.project-overlay');
          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.9,
              duration: 0.3
            });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            duration: 0.4
          });
          
          // Reset the image
          const img = card.querySelector('img');
          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.5
            });
          }
          
          // Reset the project-overlay
          const overlay = card.querySelector('.project-overlay');
          if (overlay) {
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.3
            });
          }
        });
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: "Cosmic Explorer",
      category: "3D Experience",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
      description: "An interactive cosmos exploration platform with WebGL and Three.js featuring realistic planet rendering."
    },
    {
      id: 2,
      title: "Digital Garden",
      category: "AR Application",
      image: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Augmented reality application that lets users grow and nurture virtual plants in real-world spaces."
    },
    {
      id: 3,
      title: "Sound Visualizer",
      category: "Audio Experience",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Dynamic audio visualization system that creates stunning visual representations of music in real-time."
    },
    {
      id: 4,
      title: "Neural Interface",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Futuristic user interface design system with animated micro-interactions and next-gen navigation patterns."
    },
    {
      id: 5,
      title: "Particle Simulator",
      category: "Physics Engine",
      image: "https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "GPU-accelerated particle physics simulator with real-time rendering of up to a million particles."
    },
    {
      id: 6,
      title: "Dreamscape VR",
      category: "Virtual Reality",
      image: "https://images.unsplash.com/photo-1617440168937-c6497888079a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Immersive virtual reality environment with procedurally generated dream-like landscapes."
    }
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="project-decor absolute top-20 left-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="project-decor absolute bottom-40 right-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="project-decor absolute top-1/2 left-1/4 w-20 h-20 border-2 border-accent/30 rounded-full"></div>
      <div className="project-decor absolute bottom-1/4 right-1/3 w-16 h-16 border-2 border-primary/20 rotate-45"></div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Explore our portfolio of innovative digital experiences that push the boundaries
            of web technology and interactive design.
          </p>
        </div>
        
        {/* Project Grid */}
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="glass rounded-xl overflow-hidden relative group cursor-pointer transition-all duration-500"
              style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-500"
                />
                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-dark to-primary/50 opacity-0 transition-opacity duration-300 flex items-end justify-start p-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 mb-2">
                      {project.category}
                    </span>
                    <p className="text-white text-sm max-w-xs">{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-transparent border-2 border-white/30 text-white rounded-full text-lg font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;