  const canvas = document.getElementById('spaceCanvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x0b0e1a, 0);

        camera.position.z = 300;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 2);
        pointLight.position.set(0, 0, 300);
        scene.add(pointLight);

        // Textures
        const textureLoader = new THREE.TextureLoader();
        const planetData = [
            { name: "Mercury", texture: "https://threejsfundamentals.org/threejs/resources/images/planets/mercury.jpg", radius: 40, size: 4 },
            { name: "Venus", texture: "https://threejsfundamentals.org/threejs/resources/images/planets/venus.jpg", radius: 60, size: 6 },
            { name: "Earth", texture: "https://threejsfundamentals.org/threejs/resources/images/planets/earth.jpg", radius: 0, size: 14 },
            { name: "Mars", texture: "https://threejsfundamentals.org/threejs/resources/images/planets/mars.jpg", radius: 80, size: 5 },
            { name: "Jupiter", texture: "https://threejsfundamentals.org/threejs/resources/images/planets/jupiter.jpg", radius: 100, size: 12 },
            { name: "Saturn", texture: "https://threejsfundamentals.org/threejs/resources/images/planets/saturn.jpg", radius: 130, size: 10 },
            { name: "Uranus", texture: "https://threejsfundamentals.org/threejs/resources/images/planets/uranus.jpg", radius: 160, size: 8 },
            { name: "Neptune", texture: "https://threejsfundamentals.org/threejs/resources/images/planets/neptune.jpg", radius: 190, size: 7 },
        ];

        const planets = [];

        planetData.forEach((planet, index) => {
            const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
            const material = new THREE.MeshStandardMaterial({ map: textureLoader.load(planet.texture) });
            const mesh = new THREE.Mesh(geometry, material);

            if (planet.radius === 0) {
                mesh.position.set(0, 0, 0); // Earth in center
            } else {
                mesh.position.set(planet.radius, 0, 0); // Initial orbit pos
            }

            scene.add(mesh);
            planets.push({ mesh, radius: planet.radius, angle: Math.random() * Math.PI * 2 });
        });

        // Stars
        const starGeo = new THREE.BufferGeometry();
        const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
        const starPos = [];
        for (let i = 0; i < 1000; i++) {
            starPos.push((Math.random() - 0.5) * 2000);
            starPos.push((Math.random() - 0.5) * 2000);
            starPos.push((Math.random() - 0.5) * 2000);
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
        scene.add(new THREE.Points(starGeo, starMat));

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);
        document.querySelectorAll('.section').forEach((section, index) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1
            });
        });

        // Orbit Animation
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            const elapsed = clock.getElapsedTime();

            planets.forEach(p => {
                // Orbit
                if (p.radius !== 0) {
                    p.angle += 0.001; // orbit speed
                    p.mesh.position.x = Math.cos(p.angle) * p.radius;
                    p.mesh.position.z = Math.sin(p.angle) * p.radius;
                }
                // Rotate
                p.mesh.rotation.y += 0.01;
            });

            renderer.render(scene, camera);
        }
        animate();

        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll
        document.querySelector('.scroll-down').addEventListener('click', () => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        });

        // Add this script inside your existing <script> tag at bottom
//certificates section//



// View All certificates functionality
  const modal = document.getElementById("certificateModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");

  // Open modal when any certificate image is clicked
  document.querySelectorAll(".certificate-image").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex"; // use flex to center content
      modalImg.src = img.src;
    });
  });

  // Close modal on close button
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Optional: Close when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

