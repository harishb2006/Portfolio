import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

      // Animate the form
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the info section
      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate form inputs on focus
      const formInputs = formRef.current.querySelectorAll('input, textarea');
      formInputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            borderColor: '#4F46E5',
            boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.2)',
            duration: 0.3
          });
        });
        
        input.addEventListener('blur', () => {
          gsap.to(input, {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
            duration: 0.3
          });
        });
      });
      
      // Floating animation for info cards
      gsap.to('.info-card', {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });
      
      // Particles movement
      gsap.to('.contact-particle', {
        x: 'random(-20, 20)',
        y: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 6)',
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.1
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    gsap.to(formRef.current, {
      opacity: 0.5,
      pointerEvents: 'none',
      duration: 0.3
    });
    
    setTimeout(() => {
      // Simulate success
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form and animation
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      gsap.to(formRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3
      });
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="contact-particle absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full opacity-50"></div>
        <div className="contact-particle absolute top-1/3 left-2/3 w-2 h-2 bg-accent rounded-full opacity-40"></div>
        <div className="contact-particle absolute top-2/3 left-1/5 w-4 h-4 bg-secondary rounded-full opacity-30"></div>
        <div className="contact-particle absolute top-1/5 left-3/4 w-6 h-6 border border-primary rounded-full opacity-20"></div>
        <div className="contact-particle absolute top-3/4 left-1/3 w-5 h-5 border border-accent rounded-full opacity-30"></div>
      </div>
      
      {/* Glowing background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision to life.
            Fill out the form below and we'll get back to you soon.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef} className="glass rounded-2xl p-8 lg:p-10">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-white/80 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-white/80 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-all duration-300"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-white/80 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-all duration-300"
                  placeholder="Project Inquiry"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-white/80 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-all duration-300"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div ref={infoRef} className="flex flex-col justify-between">
            <div className="info-card glass rounded-2xl p-8 mb-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Email Us</h4>
                  <p className="text-white/70 mb-1">For general inquiries:</p>
                  <a href="mailto:info@immersive.com" className="text-white hover:text-accent transition-colors">info@immersive.com</a>
                  
                  <p className="text-white/70 mt-3 mb-1">For support:</p>
                  <a href="mailto:support@immersive.com" className="text-white hover:text-accent transition-colors">support@immersive.com</a>
                </div>
              </div>
            </div>
            
            <div className="info-card glass rounded-2xl p-8 mb-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Call Us</h4>
                  <p className="text-white/70 mb-1">Main Office:</p>
                  <a href="tel:+11234567890" className="text-white hover:text-accent transition-colors">+1 (123) 456-7890</a>
                  
                  <p className="text-white/70 mt-3 mb-1">Customer Service:</p>
                  <a href="tel:+10987654321" className="text-white hover:text-accent transition-colors">+1 (098) 765-4321</a>
                </div>
              </div>
            </div>
            
            <div className="info-card glass rounded-2xl p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Visit Us</h4>
                  <p className="text-white/70 mb-2">123 Innovation Drive</p>
                  <p className="text-white/70 mb-2">Creative District, CA 90210</p>
                  <p className="text-white/70">United States</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-8 flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16.539 7.27h0a4.807 4.807 0 00-.309-.012 5.54 5.54 0 00-.11.002l.419.01z" fill="none"></path>
                  <circle cx="12.043" cy="12.043" r="2.961"></circle>
                  <path d="M14.279 7.262h-4.473a2.784 2.784 0 00-2.784 2.784v4.473a2.784 2.784 0 002.784 2.784h4.473a2.784 2.784 0 002.784-2.784v-4.473a2.784 2.784 0 00-2.784-2.784zm-2.236 8.127a3.345 3.345 0 113.345-3.345 3.345 3.345 0 01-3.345 3.345zm3.477-6.02a.783.783 0 11.783-.783.783.783 0 01-.783.783z" fill="white"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;