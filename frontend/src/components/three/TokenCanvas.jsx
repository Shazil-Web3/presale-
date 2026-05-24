"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TokenCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, 360);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 0);
    const material = new THREE.MeshStandardMaterial({
      color: "#CCFF00",
      emissive: "#00FF87",
      emissiveIntensity: 0.25,
      roughness: 0.22,
      metalness: 0.6,
    });
    const token = new THREE.Mesh(geometry, material);
    scene.add(token);

    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(2, 3, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    let frameId;
    const animate = () => {
      token.rotation.x += 0.008;
      token.rotation.y += 0.012;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const width = mount.clientWidth;
      camera.aspect = width / 360;
      camera.updateProjectionMatrix();
      renderer.setSize(width, 360);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-[360px] w-full overflow-hidden rounded-2xl" />;
}
