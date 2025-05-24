import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const skillsRef = useRef(null);
  const progressRefs = useRef([]);
  
  const [isVisible, setIsVisible] = useState(false);
  
  const skillsData = [
    { name: "Three.js / WebGL", percentage: 90, color: "#4F46E5" },
    { name: "GSAP Animations", percentage: 95, color: "#10B981" },
    { name: "React Development", percentage: 85, color: "#EC4899" },
    { name: "UI/UX Design", percentage: 80, color: "#8B5CF6" },
    { name: "WebXR / AR / VR", percentage: 75, color: "#F59E0B" },
    { name: "Creative Coding", percentage: 88, color: "#06B6D4" },
  ];
  
  const techStack = [
    { 
      name: "Front-End", 
      techs: [
        { name: "React", icon: "react" },
        { name: "Three.js", icon: "threejs" },
        { name: "GSAP", icon: "gsap" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "WebGL", icon: "webgl" }
      ]
    },
    {
      name: "Tools & Libraries",
      techs: [
        { name: "Blender", icon: "blender" },
        { name: "WebXR", icon: "webxr" },
        { name: "Canvas API", icon: "canvas" },
        { name: "Shader Programming", icon: "shader" },
        { name: "Motion Design", icon: "motion" }
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section title
      gsap.fromTo(
        titleRef.current, 
        { y: 100, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Create a scroll trigger for the skills section
      const skillsTrigger = ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top center+=100",
        onEnter: () => setIsVisible(true),
        once: true
      });

      // Animate the tech stack items
      gsap.fromTo(
        ".tech-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tech-stack",
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the skills cards on hover
      const skillCards = document.querySelectorAll(".skill-card");
      skillCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.03,
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
            duration: 0.3
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.3
          });
        });
      });

      // Rotating background element
      gsap.to(".skills-rotating-bg", {
        rotation: 360,
        duration: 100,
        repeat: -1,
        ease: "none"
      });

      return () => {
        skillsTrigger.kill();
      };
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isVisible) {
      progressRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          { width: "0%" },
          {
            width: `${skillsData[index].percentage}%`,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.2
          }
        );
      });
    }
  }, [isVisible, skillsData]);

  return (
    <section ref={sectionRef} id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 border-2 border-primary/20 rounded-full skills-rotating-bg opacity-30"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 border-2 border-secondary/20 rounded-full skills-rotating-bg opacity-30" style={{ animationDelay: "-20s" }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Expertise</h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            We combine technical proficiency with creative innovation to deliver
            cutting-edge digital experiences.
          </p>
        </div>

        {/* Skills & Progress Bars */}
        <div ref={skillsRef} className="max-w-3xl mx-auto mb-20">
          {skillsData.map((skill, index) => (
            <div key={index} className="mb-8">
              <div className="flex justify-between mb-2">
                <h3 className="text-white font-medium">{skill.name}</h3>
                <span className="text-white/70">{skill.percentage}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={el => progressRefs.current[index] = el}
                  className="h-full rounded-full"
                  style={{ 
                    width: isVisible ? `${skill.percentage}%` : '0%',
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}CC)`,
                    transition: 'width 1.5s ease-out'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="tech-stack grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {techStack.map((stack, stackIndex) => (
            <div key={stackIndex} className="skill-card glass p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-center text-white">{stack.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stack.techs.map((tech, techIndex) => (
                  <div 
                    key={techIndex} 
                    className="tech-item flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30">
                      <span className="text-xl">
                        {/* Icons would go here in a real implementation */}
                        {tech.icon.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white/90 text-sm text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Banner */}
        <div className="mt-20 py-10 px-8 glass rounded-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent/30 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Ready to bring your ideas to life?</h3>
              <p className="text-white/80">Let's collaborate and create something extraordinary together.</p>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105">
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;