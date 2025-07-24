import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Customer } from "@shared/schema";

interface ScatterChart3DProps {
  customers: Customer[];
}

export function ScatterChart3D({ customers }: ScatterChart3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current || customers.length === 0) return;

    try {
      setError(null);

      // Clean up previous scene
      if (rendererRef.current) {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (mountRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(50, 50, 100);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0.1);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Cluster colors
    const clusterColors = {
      0: 0xef4444, // Red
      1: 0xf59e0b, // Amber
      2: 0x10b981, // Emerald
      3: 0x06b6d4, // Cyan
      4: 0x8b5cf6  // Violet
    };

    // Create points
    const geometry = new THREE.SphereGeometry(0.8, 8, 8);
    const points: THREE.Mesh[] = [];

    customers.forEach((customer) => {
      const material = new THREE.MeshBasicMaterial({
        color: clusterColors[customer.cluster as keyof typeof clusterColors] || 0xffffff,
        transparent: true,
        opacity: 0.8
      });

      const point = new THREE.Mesh(geometry, material);
      
      // Position points based on data (normalized to fit in scene)
      point.position.x = (customer.annualIncome - 50) * 0.8;
      point.position.y = (customer.spendingScore - 50) * 0.8;
      point.position.z = (customer.age - 40) * 0.8;

      scene.add(point);
      points.push(point);
    });

    // Add axes
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // Add grid
    const gridHelper = new THREE.GridHelper(100, 20, 0x404040, 0x404040);
    scene.add(gridHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.005;
      
      // Rotate camera around the scene
      camera.position.x = Math.cos(time) * 120;
      camera.position.z = Math.sin(time) * 120;
      camera.lookAt(0, 0, 0);

      // Subtle animation for points
      points.forEach((point, index) => {
        point.position.y += Math.sin(time + index * 0.1) * 0.02;
      });

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (rendererRef.current && mountRef.current) {
          try {
            mountRef.current.removeChild(rendererRef.current.domElement);
          } catch (e) {
            console.warn('Error removing renderer element:', e);
          }
          rendererRef.current.dispose();
        }
      };
    } catch (error) {
      console.error('Error initializing 3D visualization:', error);
      setError('Failed to initialize 3D visualization. Your browser may not support WebGL.');
    }
  }, [customers]);

  if (error) {
    return (
      <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-red-500 mb-2">3D Visualization Error</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mountRef} 
        className="w-full h-full min-h-[400px] rounded-lg overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}
      />
      <div className="absolute top-4 left-4 text-white/80 text-sm">
        <p>🎯 3D Customer Segmentation</p>
        <p className="text-xs mt-1">X: Income • Y: Spending • Z: Age</p>
      </div>
    </div>
  );
}