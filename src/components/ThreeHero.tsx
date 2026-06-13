
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Geometry - A complex wireframe vertex structure
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x4DE0FF, 
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    
    const ico = new THREE.Mesh(geometry, material);
    scene.add(ico);

    // Inner core
    const coreGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x4D70D6 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Lights
    const pointLight = new THREE.PointLight(0x4DE0FF, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      ico.rotation.x += 0.002;
      ico.rotation.y += 0.002;
      
      core.rotation.x -= 0.01;
      core.rotation.y -= 0.01;

      // Smoothed mouse rotation
      ico.rotation.x += mouseY * 0.05;
      ico.rotation.y += mouseX * 0.05;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 opacity-60" />
  );
}
