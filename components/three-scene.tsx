'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005
      particlesRef.current.rotation.y += 0.0008
    }
  })

  // Create particle geometry
  const particleCount = 500
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 8
    positions[i + 1] = (Math.random() - 0.5) * 8
    positions[i + 2] = (Math.random() - 0.5) * 8
  }

  return (
    <>
      {/* Main Cube with Gradient */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.3}
          wireframe={false}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe Cube */}
      <mesh>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial wireframe color="#a855f7" transparent opacity={0.3} />
      </mesh>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={particleCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#00d9ff" sizeAttenuation transparent opacity={0.6} />
      </points>

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d9ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#a855f7" />
    </>
  )
}

export function ThreeScene() {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <RotatingCube />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  )
}
