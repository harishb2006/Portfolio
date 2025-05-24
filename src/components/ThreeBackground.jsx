import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x4F46E5, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x10B981, 2, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0xEC4899, 2, 100);
    pointLight3.position.set(0, 10, -10);
    scene.add(pointLight3);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    for (let i = 0; i < particlesCount; i++) {
      scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // 3D Objects
    const torusGeometry = new THREE.TorusKnotGeometry(8, 2, 100, 16);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4F46E5,
      wireframe: true,
      emissive: 0x4F46E5,
      emissiveIntensity: 0.2
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    torusKnot.position.set(-15, -5, -10);
    scene.add(torusKnot);
    
    const icosahedronGeometry = new THREE.IcosahedronGeometry(5, 0);
    const icosahedronMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x10B981,
      wireframe: true,
      emissive: 0x10B981,
      emissiveIntensity: 0.2
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(15, 8, -15);
    scene.add(icosahedron);
    
    const octahedronGeometry = new THREE.OctahedronGeometry(4, 0);
    const octahedronMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xEC4899,
      wireframe: true,
      emissive: 0xEC4899,
      emissiveIntensity: 0.2
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(0, -12, -8);
    scene.add(octahedron);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle scroll effect
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY / 500;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.003;
      torusKnot.position.x = Math.sin(Date.now() * 0.0005) * 5;
      
      icosahedron.rotation.x -= 0.004;
      icosahedron.rotation.y -= 0.004;
      icosahedron.position.y = Math.cos(Date.now() * 0.0003) * 5;
      
      octahedron.rotation.x += 0.003;
      octahedron.rotation.z += 0.003;
      octahedron.position.z = Math.sin(Date.now() * 0.0004) * 5 - 8;
      
      // Apply mouse and scroll effects
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
      scene.rotation.y = scrollY * 0.3;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  
  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeBackground;