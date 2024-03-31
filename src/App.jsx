import './App.css';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'; // Import CSS2DRenderer
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'; // Import CSS3DRenderer

function App() {
  useEffect(() => {
    // Set up WebGLRenderer
    const webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(webGLRenderer.domElement);

    // Set up CSS2DRenderer
    const css2DRenderer = new CSS2DRenderer();
    css2DRenderer.setSize(window.innerWidth, window.innerHeight);
    css2DRenderer.domElement.style.position = 'absolute';
    css2DRenderer.domElement.style.top = 0;
    document.body.appendChild(css2DRenderer.domElement);

    // Set up CSS3DRenderer
    const css3DRenderer = new CSS3DRenderer();
    css3DRenderer.setSize(window.innerWidth, window.innerHeight);
    css3DRenderer.domElement.style.position = 'absolute';
    css3DRenderer.domElement.style.top = 0;
    document.body.appendChild(css3DRenderer.domElement);

    // Set up camera and scene for all renderers
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    const scene = new THREE.Scene();
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(0, 10, 0),
      new THREE.Vector3(10, 0, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      webGLRenderer.render(scene, camera);
      css2DRenderer.render(scene, camera);
      css3DRenderer.render(scene, camera);
    }

    animate();

    // Cleanup function
    return () => {
      // Cleanup renderers on unmount
      document.body.removeChild(webGLRenderer.domElement);
      document.body.removeChild(css2DRenderer.domElement);
      document.body.removeChild(css3DRenderer.domElement);
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <div style={{ color: "white" }} id="info">Description</div>
  );
}

export default App;
