import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial animation
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set('.navbar', { clearProps: "all" });
        }
      }
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  // Handle menu animation
  useEffect(() => {
    if (isOpen) {
      gsap.to('.mobile-menu', {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  return (
    <nav className={`navbar fixed w-full z-40 transition-all duration-300 ${scrolled ? 'glass py-2' : 'bg-black/20 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">HB</span>
            </div>
            <span className="text-xl font-bold gradient-text">Harish B</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'home' ? 'text-accent' : ''}`}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'about' ? 'text-accent' : ''}`}
            >
              About
            </a>
            <a 
              href="#skills" 
              onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'skills' ? 'text-accent' : ''}`}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'projects' ? 'text-accent' : ''}`}
            >
              Projects
            </a>
            <a 
              href="#resume" 
              onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'resume' ? 'text-accent' : ''}`}
            >
              Resume
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className={`bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105`}
            >
              Contact Me
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {!isOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className="mobile-menu fixed top-0 right-0 h-full w-64 glass z-50 transform translate-x-full opacity-0 md:hidden">
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'home' ? 'text-accent' : ''}`}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'about' ? 'text-accent' : ''}`}
            >
              About
            </a>
            <a 
              href="#skills" 
              onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'skills' ? 'text-accent' : ''}`}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'projects' ? 'text-accent' : ''}`}
            >
              Projects
            </a>
            <a 
              href="#resume" 
              onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'resume' ? 'text-accent' : ''}`}
            >
              Resume
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className={`text-white hover:text-accent transition-colors duration-300 ${activeSection === 'contact' ? 'text-accent' : ''}`}
            >
              Contact
            </a>
          </div>
          <div className="mt-auto">
            <button className="w-full bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;