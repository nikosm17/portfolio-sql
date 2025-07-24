import * as THREE from 'https://cdn.skypack.dev/three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("webgl-clouds").appendChild(renderer.domElement);

// Soft fog for depth
scene.fog = new THREE.FogExp2(0x9ac9e9, 0.015);

const loader = new THREE.TextureLoader();
const cloudTexture = loader.load("cloud1.png");

const clouds = [];
for (let i = 0; i < 30; i++) {
  const geometry = new THREE.PlaneGeometry(
    10 + Math.random() * 10, 
    5 + Math.random() * 5
  );
  const material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.2 + Math.random() * 0.3,
    depthWrite: false
  });

  const cloud = new THREE.Mesh(geometry, material);
  cloud.position.set(
    Math.random() * 100 - 50,
    Math.random() * 50 - 25,
    Math.random() * -150
  );
  cloud.rotation.z = Math.random() * Math.PI * 2;

  // Unique speed per cloud
  cloud.userData = {
    speed: 0.01 + Math.random() * 0.02,
    rotationSpeed: (Math.random() - 0.5) * 0.001
  };

  scene.add(cloud);
  clouds.push(cloud);
}

camera.position.z = 5;

let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  clouds.forEach(cloud => {
    cloud.position.x += cloud.userData.speed * delta * 60;
    cloud.rotation.z += cloud.userData.rotationSpeed;

    if (cloud.position.x > 60) {
      cloud.position.x = -60;
      cloud.position.y = Math.random() * 50 - 25;
    }
  });

  renderer.render(scene, camera);
}
animate();

// Resize support
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});