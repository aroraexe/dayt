"use client";

import React, { useMemo, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Image as DreiImage, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const vertexShader = `
uniform float uniSize;
uniform float uniTime;
uniform vec3 uniColor;
uniform vec3 uniColor2;
uniform float mixFactorUniColor1;
uniform float mixFactorRadiusUniColor2;
uniform float uniTransparency;
varying vec3 varyColor;
varying vec3 varyColor2;
varying vec3 varyPosition;
varying float varyMixFactorUniColor1;
varying float varyMixFactorRadiusUniColor2;
varying float varyTransparency;

attribute float attrScale;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float angle = atan(modelPosition.x, modelPosition.z);
  float distanceToCenter = distance(modelPosition.xyz, vec3(0.0));
  float angleOffset = 100.0 / distanceToCenter * uniTime; 
  angle += angleOffset;
  modelPosition.x += cos(angle) * 30.0;
  modelPosition.y += sin(angle) * 60.0;
  modelPosition.z += cos(angle) * 90.0;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  gl_PointSize = uniSize * attrScale;
  gl_PointSize *= 50.0;
  gl_PointSize *= ( 10.0 / - viewPosition.z );

  // varyColor = color; 
  varyColor = uniColor;
  varyColor2 = uniColor2;
  varyTransparency = uniTransparency;
  varyMixFactorUniColor1 = mixFactorUniColor1;
  varyMixFactorRadiusUniColor2 = mixFactorRadiusUniColor2;
  varyPosition = modelPosition.xyz;
}
`;

const fragmentShader = `
varying vec3 varyColor;
varying vec3 varyColor2;
varying vec3 varyPosition;
varying float varyMixFactorUniColor1;
varying float varyMixFactorRadiusUniColor2;
varying float varyTransparency;

void main() {
  float pointCoordDistance = distance(gl_PointCoord, vec2(0.5));
  float roundCut = step(pointCoordDistance, 0.5);
  vec3 blackAndWhiteBall = mix(vec3(0.0), vec3(1.0), roundCut);

  vec3 mixedColor2 = mix(blackAndWhiteBall, varyColor2, roundCut);
  vec3 mixedColor1 = mix(blackAndWhiteBall, varyColor, roundCut * varyMixFactorUniColor1);

  float distFromCenter = distance(vec3(0.0), varyPosition);
  vec3 radiusMixedColorBall = mix(
    mixedColor1,
    mixedColor2,
    distFromCenter * varyMixFactorRadiusUniColor2 / 10000.0
  );

  gl_FragColor = vec4(radiusMixedColorBall.xyz, varyTransparency * roundCut);
}
`;

const Galaxy = () => {
  const { gl } = useThree();
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  
  const parameters = {
    count: 36000,
    radius: 140,
    branches: 3,
    spin: 1.5,
    randomness: 0.5,
    randomnessPower: 3
  };

  const pointsScale = useMemo(() => {
    const scales = new Float32Array(parameters.count);
    for (let i = 0; i < scales.length; i++) {
      scales[i] = Math.random() * (1.2 - 0.3) + 0.3; // getRandomArbitrary(0.3, 1.2)
    }
    return scales;
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(parameters.count * 3);
    const col = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(1.0, 0.3765, 0.1882); // #ff6030
    const colorOutside = new THREE.Color(0.10588, 0.22353, 0.51765); // #1b3984

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    
    return [pos, col];
  }, []);

  const uniforms = useMemo(() => ({
    uniTime: { value: 0 },
    uniSize: { value: 2.0 * gl.getPixelRatio() },
    uniTransparency: { value: 1.0 },
    uniColor: { value: new THREE.Color(1.0, 0.3765, 0.1882) }, 
    uniColor2: { value: new THREE.Color(0.10588, 0.22353, 0.51765) }, 
    mixFactorUniColor1: { value: 1.0 },
    mixFactorRadiusUniColor2: { value: 200.0 },
  }), [gl]);

  useFrame(({ clock }) => {
    if(shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uniTime.value = clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={parameters.count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={parameters.count}
        />
        <bufferAttribute
          attach="attributes-attrScale"
          args={[pointsScale, 1]}
          count={parameters.count}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderMaterialRef}
        args={[{
          uniforms,
          vertexShader,
          fragmentShader,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
          transparent: true
        }]}
      />
    </points>
  );
};

const FloatingPictures = () => {
  const pics = [
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.00 PM.jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.01 PM.jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.02 PM (1).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.02 PM (2).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.02 PM.jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.03 PM (1).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.03 PM (2).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.03 PM.jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.04 PM (1).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.04 PM.jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.05 PM (1).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.05 PM (2).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.05 PM.jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.06 PM (1).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.06 PM (2).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.06 PM.jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.07 PM (1).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.07 PM.jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.08 PM (1).jpeg",
    "/images/us/WhatsApp Image 2026-07-31 at 10.43.08 PM.jpeg"
  ];

  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if(groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05; // slow spin with galaxy
    }
  });

  return (
    <group ref={groupRef}>
      {pics.map((src, i) => {
        const radius = 30 + Math.random() * 80;
        const angle = (i / pics.length) * Math.PI * 2 * 2; // spread across spirals
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 30; // up/down variation
        
        return (
          <group key={i} position={[x, y, z]}>
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
              <DreiImage 
                url={src} 
                transparent 
                opacity={0.9}
                scale={[12, 16]}
              />
            </Billboard>
          </group>
        );
      })}
    </group>
  );
};

export default function FinaleGalaxy() {
  return (
    <div className="absolute inset-0 w-full h-full bg-black z-0">
      <Canvas camera={{ position: [0, 80, 200], fov: 60 }}>
        <color attach="background" args={['#000000']} />
        
        <Suspense fallback={null}>
          <Galaxy />
          <FloatingPictures />
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={1.5} />
          </EffectComposer>
        </Suspense>
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          maxDistance={350}
          minDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
