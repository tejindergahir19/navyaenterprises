import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Maximize2, 
  Flame, 
  Layers, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PRODUCTS } from '../data/products';
import { SleeveProduct } from '../types';

interface Sleeve3DViewerProps {
  initialProductId?: string;
  onSelectForQuote?: (product: SleeveProduct, sizeCode?: string) => void;
}

export const Sleeve3DViewer: React.FC<Sleeve3DViewerProps> = ({ 
  initialProductId = 'open-sleeves',
  onSelectForQuote 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProductId);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(2); // Default to middle standard size
  const [viewMode, setViewMode] = useState<'solid' | 'cutaway' | 'thermal'>('solid');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // Available 3D models (the 6 sleeve types)
  const sleeveModels = PRODUCTS.filter(p => p.category !== 'powder');
  const currentProduct = sleeveModels.find(p => p.id === selectedProductId) || sleeveModels[0];
  const currentSize = currentProduct.sizes[selectedSizeIndex] || currentProduct.sizes[0] || {
    code: 'NX-STD',
    innerDiameter: 70,
    outerDiameter: 104,
    height: 100,
    modulus: 1.76,
    volumeDm3: 0.385
  };

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const clippingPlaneRef = useRef<THREE.Plane | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Mouse / Touch interaction state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update selected product from prop if changed from external component
  useEffect(() => {
    if (initialProductId && initialProductId !== selectedProductId) {
      setSelectedProductId(initialProductId);
      setSelectedSizeIndex(0);
    }
  }, [initialProductId]);

  // Three.js Canvas Lifecycle
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    sceneRef.current = scene;

    // 2. Camera - centered with slight natural 10-degree top tilt
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer with local clipping support
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Foundry Lights
    const ambientLight = new THREE.AmbientLight(0xd4d4d8, 1.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    keyLight.position.set(15, 25, 20);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimWarmLight = new THREE.DirectionalLight(0xf97316, 2.0);
    rimWarmLight.position.set(-20, 8, -15);
    scene.add(rimWarmLight);

    const bottomGlow = new THREE.PointLight(0xea580c, 1.0, 30);
    bottomGlow.position.set(0, -6, 0);
    scene.add(bottomGlow);

    // Subtle stage circular shadow ring at base (y = -4.5)
    const shadowGeo = new THREE.RingGeometry(0.1, 7.5, 32);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x18181b, transparent: true, opacity: 0.8 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -4.6;
    scene.add(shadowMesh);

    // 5. Model Container Group - centered at (0, 0, 0)
    const modelGroup = new THREE.Group();
    modelGroup.position.set(0, 0, 0);
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Clipping plane for cutaway (slices through X=0)
    const clipPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
    clippingPlaneRef.current = clipPlane;

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (modelGroupRef.current) {
        if (isAutoRotating && !isDraggingRef.current) {
          modelGroupRef.current.rotation.y += 0.008;
        } else if (!isDraggingRef.current) {
          // Smooth inertia damping
          modelGroupRef.current.rotation.y += rotationVelocityRef.current.y;
          modelGroupRef.current.rotation.x += rotationVelocityRef.current.x;
          rotationVelocityRef.current.y *= 0.92;
          rotationVelocityRef.current.x *= 0.92;
        }
      }

      // Animate molten metal heat sparks if in thermal mode
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += Math.sin(elapsedTime * 4 + i) * 0.03;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Re-build 3D Model when product, size, or view mode changes
  useEffect(() => {
    if (!modelGroupRef.current || !sceneRef.current) return;
    const group = modelGroupRef.current;

    // Clean previous children
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      group.remove(child);
    }
    particlesRef.current = null;

    // Procedural Refractory Exothermic Material Texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = currentProduct.category === 'insulating' ? '#e2e8f0' : '#b8a086';
    ctx.fillRect(0, 0, 256, 256);

    // Add refractory grains & aluminum powder specks
    for (let i = 0; i < 450; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const r = Math.random() * 2.2 + 0.5;
      ctx.fillStyle = Math.random() > 0.6 ? '#6b543d' : (Math.random() > 0.4 ? '#ffffff' : '#453526');
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const refractoryTexture = new THREE.CanvasTexture(canvas);
    refractoryTexture.wrapS = THREE.RepeatWrapping;
    refractoryTexture.wrapT = THREE.RepeatWrapping;
    refractoryTexture.repeat.set(2, 2);

    const isCutaway = viewMode === 'cutaway';
    const isThermal = viewMode === 'thermal';

    // Refractory sleeve material
    const sleeveMaterial = new THREE.MeshStandardMaterial({
      map: refractoryTexture,
      roughness: 0.85,
      metalness: 0.1,
      color: currentProduct.category === 'insulating' ? 0xe2e8f0 : 0xb8a086,
      side: THREE.DoubleSide,
      clippingPlanes: isCutaway && clippingPlaneRef.current ? [clippingPlaneRef.current] : [],
      clipShadows: true,
    });

    // Scale dimensions normalized for 3D stage (height approx 8 units, radii 2.5 - 4.5 units)
    const scaleRatio = 0.08;
    const rInner = Math.max(1.8, Math.min(4.5, (currentSize.innerDiameter / 2) * scaleRatio));
    const rOuter = Math.max(2.8, Math.min(6.0, (currentSize.outerDiameter / 2) * scaleRatio));
    const height = Math.max(5.5, Math.min(9.5, currentSize.height * scaleRatio));

    const modelType = currentProduct.modelType;

    // 1. OPEN SLEEVES: Classic cylinder open top and bottom
    if (modelType === 'open') {
      const points: THREE.Vector2[] = [];
      points.push(new THREE.Vector2(rInner, -height / 2));
      points.push(new THREE.Vector2(rOuter, -height / 2));
      points.push(new THREE.Vector2(rOuter, height / 2 - 0.2));
      points.push(new THREE.Vector2(rOuter - 0.2, height / 2));
      points.push(new THREE.Vector2(rInner, height / 2));
      points.push(new THREE.Vector2(rInner, -height / 2));

      const latheGeom = new THREE.LatheGeometry(points, 48);
      const sleeveMesh = new THREE.Mesh(latheGeom, sleeveMaterial);
      sleeveMesh.castShadow = true;
      sleeveMesh.receiveShadow = true;
      group.add(sleeveMesh);

    // 2. NECK-DOWN SLEEVES: Tapered lower base with breaker core notch
    } else if (modelType === 'neckdown') {
      const neckHeight = height * 0.26;
      const neckInner = rInner * 0.55;
      const neckOuter = rInner * 0.85;

      const points: THREE.Vector2[] = [];
      points.push(new THREE.Vector2(neckInner, -height / 2));
      points.push(new THREE.Vector2(neckOuter, -height / 2));
      points.push(new THREE.Vector2(neckOuter + 0.3, -height / 2 + neckHeight * 0.6));
      points.push(new THREE.Vector2(rOuter, -height / 2 + neckHeight));
      points.push(new THREE.Vector2(rOuter, height / 2));
      points.push(new THREE.Vector2(rInner, height / 2));
      points.push(new THREE.Vector2(rInner, -height / 2 + neckHeight));
      points.push(new THREE.Vector2(neckInner, -height / 2));

      const latheGeom = new THREE.LatheGeometry(points, 48);
      const sleeveMesh = new THREE.Mesh(latheGeom, sleeveMaterial);
      sleeveMesh.castShadow = true;
      sleeveMesh.receiveShadow = true;
      group.add(sleeveMesh);

    // 3. BLIND SLEEVES: Hemispherical dome closed top + atmospheric pin
    } else if (modelType === 'blind') {
      const bodyH = height * 0.75;
      const domeR = rOuter;
      const points: THREE.Vector2[] = [];

      points.push(new THREE.Vector2(rInner, -height / 2));
      points.push(new THREE.Vector2(rOuter, -height / 2));
      points.push(new THREE.Vector2(rOuter, -height / 2 + bodyH));

      // Dome curvature
      for (let i = 0; i <= 10; i++) {
        const theta = (i / 10) * (Math.PI / 2);
        const x = rOuter * Math.cos(theta);
        const y = -height / 2 + bodyH + (height - bodyH) * Math.sin(theta);
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(0, height / 2));
      points.push(new THREE.Vector2(0, height / 2 - 0.5));

      for (let i = 10; i >= 0; i--) {
        const theta = (i / 10) * (Math.PI / 2);
        const x = rInner * Math.cos(theta);
        const y = -height / 2 + bodyH + (height - bodyH - 0.5) * Math.sin(theta);
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(rInner, -height / 2));

      const latheGeom = new THREE.LatheGeometry(points, 48);
      const sleeveMesh = new THREE.Mesh(latheGeom, sleeveMaterial);
      sleeveMesh.castShadow = true;
      sleeveMesh.receiveShadow = true;
      group.add(sleeveMesh);

      // Atmospheric Williams Core Breather Pin
      const pinGeom = new THREE.CylinderGeometry(0.18, 0.18, 1.8, 16);
      pinGeom.translate(0, height / 2 + 0.6, 0);
      const pinMat = new THREE.MeshStandardMaterial({ 
        color: 0xf59e0b, 
        metalness: 0.6, 
        roughness: 0.3,
        clippingPlanes: isCutaway && clippingPlaneRef.current ? [clippingPlaneRef.current] : []
      });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      group.add(pinMesh);

    // 4. OVAL SLEEVES: Elliptical cross-section
    } else if (modelType === 'oval') {
      const ovalShape = new THREE.Shape();
      const a = rOuter * 1.35; // Major axis
      const b = rOuter * 0.85; // Minor axis
      const aIn = rInner * 1.35;
      const bIn = rInner * 0.85;

      ovalShape.ellipse(0, 0, a, b, 0, Math.PI * 2, false, 0);
      const holePath = new THREE.Path();
      holePath.ellipse(0, 0, aIn, bIn, 0, Math.PI * 2, true, 0);
      ovalShape.holes.push(holePath);

      const extrudeSettings = {
        depth: height,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.15,
        bevelThickness: 0.15,
      };

      const extrudeGeom = new THREE.ExtrudeGeometry(ovalShape, extrudeSettings);
      extrudeGeom.rotateX(Math.PI / 2);
      extrudeGeom.translate(0, height / 2, 0);

      const sleeveMesh = new THREE.Mesh(extrudeGeom, sleeveMaterial);
      sleeveMesh.castShadow = true;
      sleeveMesh.receiveShadow = true;
      group.add(sleeveMesh);

    // 5. DIRECT POUR SLEEVES: Pouring funnel cup + ceramic filter seat
    } else if (modelType === 'directpour') {
      const basinH = height * 0.35;
      const rCup = rOuter * 1.45;
      const points: THREE.Vector2[] = [];

      points.push(new THREE.Vector2(rInner, -height / 2));
      points.push(new THREE.Vector2(rOuter, -height / 2));
      points.push(new THREE.Vector2(rOuter, height / 2 - basinH));
      points.push(new THREE.Vector2(rCup, height / 2));
      points.push(new THREE.Vector2(rCup - 0.7, height / 2));
      points.push(new THREE.Vector2(rInner + 0.6, height / 2 - basinH + 0.4)); // Filter seat step
      points.push(new THREE.Vector2(rInner, height / 2 - basinH));
      points.push(new THREE.Vector2(rInner, -height / 2));

      const latheGeom = new THREE.LatheGeometry(points, 48);
      const sleeveMesh = new THREE.Mesh(latheGeom, sleeveMaterial);
      sleeveMesh.castShadow = true;
      sleeveMesh.receiveShadow = true;
      group.add(sleeveMesh);

      // Ceramic Foam Filter Disc
      const filterGeom = new THREE.CylinderGeometry(rInner + 0.4, rInner + 0.4, 0.6, 32);
      filterGeom.translate(0, height / 2 - basinH + 0.4, 0);
      const filterMat = new THREE.MeshStandardMaterial({ 
        color: 0x78716c, 
        wireframe: true,
        clippingPlanes: isCutaway && clippingPlaneRef.current ? [clippingPlaneRef.current] : []
      });
      const filterMesh = new THREE.Mesh(filterGeom, filterMat);
      group.add(filterMesh);

    // Standard Insulating or Open
    } else {
      const points: THREE.Vector2[] = [];
      points.push(new THREE.Vector2(rInner, -height / 2));
      points.push(new THREE.Vector2(rOuter, -height / 2));
      points.push(new THREE.Vector2(rOuter, height / 2));
      points.push(new THREE.Vector2(rInner, height / 2));
      points.push(new THREE.Vector2(rInner, -height / 2));

      const latheGeom = new THREE.LatheGeometry(points, 48);
      const sleeveMesh = new THREE.Mesh(latheGeom, sleeveMaterial);
      sleeveMesh.castShadow = true;
      sleeveMesh.receiveShadow = true;
      group.add(sleeveMesh);
    }

    // THERMAL / MOLTEN METAL VIEW: Liquid molten metal inside feeder
    if (isThermal) {
      const metalLiquidGeom = new THREE.CylinderGeometry(
        rInner * 0.94, 
        rInner * 0.94, 
        height * 0.85, 
        32
      );
      metalLiquidGeom.translate(0, -height * 0.04, 0);

      const moltenMaterial = new THREE.MeshStandardMaterial({
        color: 0xff7b00,
        emissive: 0xff5500,
        emissiveIntensity: 1.8,
        roughness: 0.2,
        metalness: 0.8,
        clippingPlanes: isCutaway && clippingPlaneRef.current ? [clippingPlaneRef.current] : [],
      });

      const moltenMesh = new THREE.Mesh(metalLiquidGeom, moltenMaterial);
      group.add(moltenMesh);

      // Fiery heat sparks rising
      const particleCount = 40;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let p = 0; p < particleCount; p++) {
        particlePositions[p * 3] = (Math.random() - 0.5) * (rInner * 1.5);
        particlePositions[p * 3 + 1] = height / 2 + Math.random() * 3.5;
        particlePositions[p * 3 + 2] = (Math.random() - 0.5) * (rInner * 1.5);
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffa500,
        size: 0.35,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      group.add(particles);
      particlesRef.current = particles;
    }

  }, [selectedProductId, selectedSizeIndex, viewMode, currentProduct, currentSize]);

  // Drag & Rotate Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    modelGroupRef.current.rotation.y += deltaX * 0.012;
    modelGroupRef.current.rotation.x += deltaY * 0.012;

    rotationVelocityRef.current = { x: deltaY * 0.005, y: deltaX * 0.005 };
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !modelGroupRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    modelGroupRef.current.rotation.y += deltaX * 0.015;
    modelGroupRef.current.rotation.x += deltaY * 0.015;

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const resetCamera = () => {
    if (cameraRef.current && modelGroupRef.current) {
      cameraRef.current.position.set(0, 2.5, 20);
      cameraRef.current.lookAt(0, 0, 0);
      modelGroupRef.current.rotation.set(0, 0, 0);
      rotationVelocityRef.current = { x: 0, y: 0 };
    }
  };

  // Handle WhatsApp quick order trigger
  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Navexo (Navya Enterprises),\n` +
      `I would like to order / get pricing for:\n` +
      `*${currentProduct.name}*\n` +
      `Size: ${currentSize.code} (Ø${currentSize.innerDiameter}mm ID × H${currentSize.height}mm)\n` +
      `Modulus: ${currentSize.modulus} cm | Liquid Volume: ${currentSize.volumeDm3} dm³\n` +
      `Please share best factory price per piece, MOQ, and sample trial availability.`
    );
    window.open(`https://wa.me/918288875986?text=${text}`, '_blank');
  };

  return (
    <div id="studio-3d" className="w-full bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Studio Header */}
      <div className="p-5 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
              3D Product Inspection
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Rotate & Inspect in 3D
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            See the exact shape, breaker core neck, and interior before placing your order.
          </p>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('solid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'solid'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Shape</span>
          </button>

          {/* Cutaway (Inside) option - disabled for now, can be re-enabled later
          <button
            onClick={() => setViewMode('cutaway')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'cutaway'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cutaway (Inside)</span>
          </button>
          */}

          <button
            onClick={() => setViewMode('thermal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'thermal'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>Molten Heat</span>
          </button>
        </div>
      </div>

      {/* Model Selector Ribbon - Clean Horizontal Pills at Top of Canvas */}
      <div className="px-4 py-3 bg-neutral-950/90 border-b border-neutral-800/80 overflow-x-auto scrollbar-none flex items-center gap-2">
        {sleeveModels.map((p) => {
          const isSelected = p.id === selectedProductId;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                setSelectedSizeIndex(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
              }`}
            >
              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>{p.name.replace('Exothermic ', '')}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Canvas Stage - DEAD CENTER */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] bg-gradient-to-b from-[#090b0e] via-[#0d1017] to-[#090b0e] overflow-hidden flex items-center justify-center">
        {/* Interaction Helper Prompt */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 bg-neutral-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 text-[11px] text-neutral-300">
          <Sliders className="w-3 h-3 text-amber-400" />
          <span>Touch & drag to rotate • Pinch to zoom</span>
        </div>

        {/* Quick Utility Buttons on Canvas (Top-Right) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
              onClick={resetCamera}
            // onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-lg border text-xs transition-colors backdrop-blur-md cursor-pointer ${
              isAutoRotating 
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                : 'bg-neutral-900/80 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Auto 360° Rotation"
          >
            <RotateCw className="w-4 h-4" />
          </button>
{/* 
          <button
            onClick={resetCamera}
            className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-700 text-neutral-400 hover:text-white text-xs backdrop-blur-md cursor-pointer"
            title="Reset View Position"
          >
            <Maximize2 className="w-4 h-4" />
          </button> */}
        </div>

        {/* The WebGL Canvas */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        />

        {/* Size Badge Overlay (Bottom Left of Canvas) */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-neutral-950/90 backdrop-blur-md p-1.5 pr-3 rounded-xl border border-neutral-800 text-xs">
          <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-neutral-900 text-amber-400 font-bold">
            Size
          </span>
          <select
            value={selectedSizeIndex}
            onChange={(e) => setSelectedSizeIndex(Number(e.target.value))}
            className="bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer pr-2"
          >
            {currentProduct.sizes.map((s, idx) => (
              <option key={s.code} value={idx} className="bg-neutral-900 text-white">
                {s.code} (Ø{s.innerDiameter} × H{s.height}mm)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Direct Commercial Action Bar Below 3D Canvas */}
      <div className="p-5 sm:p-6 bg-neutral-950 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Quick specs summary */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-base font-bold text-white">
              {currentProduct.name}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              Ready Stock in Ludhiana
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            Cuts riser scrap weight by 50% to 70% • Lowers fettling & grinding labor • Zero shrinkage defects
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            id="3d-order-whatsapp-btn"
            onClick={handleWhatsAppInquiry}
            className="flex-1 md:flex-none py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer hover:scale-102 active:scale-98 whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
            <span>Order on WhatsApp (+91 82888 75986)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
