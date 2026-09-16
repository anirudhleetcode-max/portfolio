"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

/**
 * The portfolio's hero object: a slowly turning icosahedral lattice with a
 * glowing core, wrapped in a drifting particle field.
 *
 * Everything is a three.js primitive and every light is local — there is no
 * HDR environment fetch, so the scene renders identically offline and can
 * never take the page down waiting on a CDN.
 */

const ELECTRIC = "#6c5cff";
const CYAN = "#3ddbd9";
const AMBER = "#ffb547";

type Pointer = React.RefObject<{ x: number; y: number }>;

function Lattice({ pointer, quality }: { pointer: Pointer; quality: "high" | "low" }) {
  const group = React.useRef<THREE.Group>(null);
  const core = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x += delta * 0.05;

    const target = pointer.current ?? { x: 0, y: 0 };
    // Tilt toward the cursor rather than snapping to it.
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, target.x * 0.24, 0.045);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, target.x * 0.4, 0.045);
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      -target.y * 0.3 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08,
      0.045,
    );

    if (core.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      {/* Outer wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[2.1, quality === "high" ? 2 : 1]} />
        <meshBasicMaterial color={ELECTRIC} wireframe transparent opacity={0.34} />
      </mesh>

      {/* Mid shell, counter-tinted so the two cages read as separate layers */}
      <mesh rotation={[0.4, 0.8, 0.2]}>
        <icosahedronGeometry args={[1.58, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.22} />
      </mesh>

      {/* Solid core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.84, quality === "high" ? 4 : 2]} />
        <meshStandardMaterial
          color="#0d0e1c"
          roughness={0.28}
          metalness={0.9}
          emissive={ELECTRIC}
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Equatorial ring, tipped off-axis */}
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[2.72, 0.014, 8, quality === "high" ? 128 : 64]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, -0.5, 0.6]}>
        <torusGeometry args={[3.15, 0.01, 8, quality === "high" ? 128 : 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

function Field({ count }: { count: number }) {
  const points = React.useRef<THREE.Points>(null);

  const geometry = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Spherical shell so the field surrounds the object instead of filling a box.
      const r = 4.2 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y -= delta * 0.035;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.032}
        color={CYAN}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function PointerTracker({ pointer }: { pointer: Pointer }) {
  const { size } = useThree();
  React.useEffect(() => {
    const handle = (event: PointerEvent) => {
      if (!pointer.current) return;
      pointer.current.x = (event.clientX / size.width) * 2 - 1;
      pointer.current.y = (event.clientY / size.height) * 2 - 1;
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, [pointer, size.width, size.height]);
  return null;
}

/** Pushes the camera back gently as the hero scrolls away. */
function ScrollDolly() {
  const { camera } = useThree();
  const progress = React.useRef(0);

  React.useEffect(() => {
    const read = () => {
      const limit = Math.max(window.innerHeight, 1);
      progress.current = Math.min(window.scrollY / limit, 1);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);

  useFrame(() => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.6 + progress.current * 3.2, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, progress.current * 1.4, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene({ quality = "high" }: { quality?: "high" | "low" }) {
  const pointer = React.useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.75] : 1}
      camera={{ position: [0, 0, 8.6], fov: 38 }}
      gl={{ antialias: quality === "high", powerPreference: "high-performance", alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      {/* Local lighting only — no HDR/CDN fetch, so the scene works offline. */}
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#6c5cff", "#07070a", 0.7]} />
      <directionalLight position={[4, 5, 6]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={26} distance={16} color={CYAN} />
      <pointLight position={[3, 3, -4]} intensity={20} distance={16} color={ELECTRIC} />

      <Lattice pointer={pointer} quality={quality} />
      <Field count={quality === "high" ? 900 : 320} />

      <PointerTracker pointer={pointer} />
      <ScrollDolly />
    </Canvas>
  );
}
