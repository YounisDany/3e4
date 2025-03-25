import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.149/examples/jsm/controls/OrbitControls.js';
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create 3D Object (Simple Sphere as a Placeholder)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x2196f3, roughness: 0.5 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// Scroll Animation
window.addEventListener('scroll', () => {
    let scrollY = window.scrollY / window.innerHeight;
    gsap.to(sphere.rotation, { x: scrollY * Math.PI, y: scrollY * Math.PI * 2, duration: 1 });
    gsap.to(camera.position, { z: 5 - scrollY * 3, duration: 1 });
});

// Responsive Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Render Loop
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
