import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse rotation
    const group = new THREE.Group();
    scene.add(group);

    // Abstract Geometry 1: Wireframe TorusKnot
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.45, 120, 16);
    
    // Wireframe Material
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    group.add(wireframeMesh);

    // Inner Core Geometry: Smooth Metallic Glass Icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.0, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 3.5, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x2563eb, 2.5, 100);
    pointLight2.position.set(-5, -5, -2);
    scene.add(pointLight2);

    // Theme Color Updater for Light / Dark Mode Contrast
    const updateThemeColors = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      if (isDarkMode) {
        // Bright metallic silver wireframe for dark obsidian background
        wireframeMaterial.color.setHex(0xf3f3f3);
        wireframeMaterial.opacity = 0.65;
        
        // Vibrant glowing core in dark mode
        coreMaterial.color.setHex(0x3b82f6);
        coreMaterial.emissive.setHex(0x1d4ed8);
        coreMaterial.emissiveIntensity = 0.35;
        
        pointLight1.intensity = 5.0;
        pointLight2.color.setHex(0x60a5fa);
        pointLight2.intensity = 4.0;
      } else {
        // Crisp dark charcoal wireframe for light off-white background
        wireframeMaterial.color.setHex(0x111111);
        wireframeMaterial.opacity = 0.35;
        
        coreMaterial.color.setHex(0x222222);
        coreMaterial.emissive.setHex(0x000000);
        coreMaterial.emissiveIntensity = 0;
        
        pointLight1.intensity = 3.5;
        pointLight2.color.setHex(0x2563eb);
        pointLight2.intensity = 2.5;
      }
    };

    // Initial theme color check
    updateThemeColors();

    // Observe dark class changes on <html> element
    const observer = new MutationObserver(() => {
      updateThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Mouse Parallax Interaction
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 1.5;
      targetY = (y / rect.height) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation
      group.rotation.x = elapsedTime * 0.18;
      group.rotation.y = elapsedTime * 0.25;

      // Smooth lerp mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y += mouseX * 0.5;
      group.rotation.x += mouseY * 0.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      coreGeometry.dispose();
      wireframeMaterial.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[360px] sm:h-[480px] lg:h-[560px] relative flex items-center justify-center pointer-events-none"
    />
  );
};

export default Hero3DCanvas;
