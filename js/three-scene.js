// ============================================================
// THREE.JS 3D SCENES — HIGH TECH DEVELOPER EDITION
// Hero: Interactive 3D Quantum Cyber Core + Orbital Tech Rings + Starfield
// Contact: Interactive 3D Tech Globe with Bengaluru Glowing Pin & HUD Sign
// ============================================================

(function () {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded — 3D scenes skipped.');
    return;
  }

  // ── TECH COLOR PALETTE ─────────────────────────────────────
  const CYAN        = new THREE.Color('#00f0ff');
  const CYAN_LT     = new THREE.Color('#67e8f9');
  const CYAN_DIM    = new THREE.Color('#0284c7');
  const NEON_GREEN  = new THREE.Color('#00ff9d');
  const PURPLE      = new THREE.Color('#818cf8');
  const WHITE       = new THREE.Color('#f0f6fc');
  const BG_COLOR    = new THREE.Color('#030712');

  // ============================================================
  // 1. HERO SCENE — Interactive 3D Quantum Cyber Core
  // ============================================================
  (function initHeroScene() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    camera.position.set(0, 0, 5.5);

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // Master Group for the Hero 3D Model
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // ── A. CENTRAL GEODESIC ICOSAHEDRON CORE ──────────────────
    // Outer wireframe geodesic cage
    const icoGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: CYAN,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireCore = new THREE.Mesh(icoGeo, wireMat);
    coreGroup.add(wireCore);

    // Inner translucent faceted crystal core
    const innerIcoGeo = new THREE.IcosahedronGeometry(1.25, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#04182b'),
      emissive: new THREE.Color('#01253d'),
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: 0.75,
      flatShading: true,
    });
    const crystalCore = new THREE.Mesh(innerIcoGeo, crystalMat);
    coreGroup.add(crystalCore);

    // Glowing Inner Energy Singularity (Plasma Sphere)
    const plasmaGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: CYAN_LT,
      transparent: true,
      opacity: 0.9,
    });
    const plasmaCore = new THREE.Mesh(plasmaGeo, plasmaMat);
    coreGroup.add(plasmaCore);

    // ── B. GYROSCOPIC ORBITAL TECH RINGS ──────────────────────
    const ringsGroup = new THREE.Group();
    coreGroup.add(ringsGroup);

    // Ring 1 — Horizontal primary ring
    const ring1Geo = new THREE.TorusGeometry(2.15, 0.016, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ringsGroup.add(ring1);

    // Orbiting data nodes on Ring 1
    const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: NEON_GREEN });
    const ring1Nodes = [];
    for (let i = 0; i < 3; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      ringsGroup.add(node);
      ring1Nodes.push({ mesh: node, angle: (i * Math.PI * 2) / 3, r: 2.15 });
    }

    // Ring 2 — Tilted tech ring with secondary accent
    const ring2Geo = new THREE.TorusGeometry(2.45, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ringsGroup.add(ring2);

    // Ring 3 — Outer dashed tech orbit
    const ring3Geo = new THREE.TorusGeometry(2.75, 0.009, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: CYAN_DIM, transparent: true, opacity: 0.4 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    ring3.rotation.x = Math.PI / 6;
    ringsGroup.add(ring3);

    // ── C. DYNAMIC DATA PARTICLES ────────────────────────────
    const particleCount = 450;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pInitial = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pPos[i * 3]     = x;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = z;

      pInitial[i * 3]     = x;
      pInitial[i * 3 + 1] = y;
      pInitial[i * 3 + 2] = z;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: CYAN,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    coreGroup.add(particles);

    // ── D. STARFIELD BACKGROUND ──────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 110;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 110;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 110;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: WHITE,
      size: 0.065,
      transparent: true,
      opacity: 0.35,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── E. LIGHTING ──────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0a1c2e, 0.8));

    const cyanLight = new THREE.PointLight(CYAN, 3.5, 16);
    cyanLight.position.set(3.5, 2.5, 3.5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(PURPLE, 2.8, 14);
    purpleLight.position.set(-3.5, -2, 2.5);
    scene.add(purpleLight);

    const coreLight = new THREE.PointLight(CYAN_LT, 2.0, 6);
    coreGroup.add(coreLight);

    // ── F. INTERACTIVE MOUSE & CLICK SHOCKWAVE ───────────────
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let shockwavePower = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Click anywhere on hero to trigger a shockwave burst
    canvas.addEventListener('click', () => {
      shockwavePower = 1.4;
    });

    // ── G. ANIMATION LOOP ────────────────────────────────────
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX * 0.45 - targetX) * 0.05;
      targetY += (mouseY * 0.35 - targetY) * 0.05;

      // Rotate inner crystal and outer wireframe in opposite directions
      wireCore.rotation.x = t * 0.2 + targetY * 0.3;
      wireCore.rotation.y = t * 0.25 + targetX * 0.3;

      crystalCore.rotation.x = -t * 0.15 + targetY * 0.2;
      crystalCore.rotation.y = -t * 0.18 + targetX * 0.2;

      // Pulsing plasma core & light
      const pulse = 1 + Math.sin(t * 3.2) * 0.12;
      plasmaCore.scale.setScalar(pulse);
      coreLight.intensity = 2.0 + Math.sin(t * 4) * 0.8;

      // Rotate gyroscopic rings
      ring1.rotation.z = t * 0.35;
      ring2.rotation.y = -t * 0.28;
      ring2.rotation.z = t * 0.2;
      ring3.rotation.x = t * 0.18;
      ring3.rotation.z = -t * 0.22;

      // Move orbiting data nodes on ring 1
      ring1Nodes.forEach(item => {
        const curAngle = item.angle + t * 0.6;
        item.mesh.position.set(
          Math.cos(curAngle) * item.r,
          Math.sin(curAngle) * item.r,
          0
        );
      });

      // Shockwave dissipation
      if (shockwavePower > 0.01) {
        shockwavePower *= 0.94;
      } else {
        shockwavePower = 0;
      }

      // Particle physics: gentle breathe + shockwave expansion
      const posAttr = pGeo.attributes.position;
      const positions = posAttr.array;
      const expand = 1 + shockwavePower * 0.8 + Math.sin(t * 1.8) * 0.04;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3]     = pInitial[i * 3] * expand;
        positions[i * 3 + 1] = pInitial[i * 3 + 1] * expand;
        positions[i * 3 + 2] = pInitial[i * 3 + 2] * expand;
      }
      posAttr.needsUpdate = true;

      particles.rotation.y = t * 0.08;
      particles.rotation.x = t * 0.04;

      // Twinkling starfield drift
      stars.rotation.y = t * 0.008;
      stars.rotation.x = t * 0.004;

      // Dynamic light movement
      cyanLight.position.x = Math.cos(t * 0.7) * 4.5;
      cyanLight.position.z = Math.sin(t * 0.7) * 4.5;

      // Parallax camera tilt
      camera.position.x += (targetX * 0.35 - camera.position.x) * 0.03;
      camera.position.y += (-targetY * 0.25 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  })();

  // ============================================================
  // 2. CONTACT SECTION — 3D Globe with Glowing Bengaluru Pin & Sign
  // ============================================================
  (function initGlobeScene() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3.4);

    function resize() {
      const w = canvas.clientWidth || 340;
      const h = canvas.clientHeight || 340;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // MASTER GLOBE GROUP — everything attaches here so rotation moves all elements together
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // ── A. GLOBE BASE SPHERE ─────────────────────────────────
    const globeRadius = 1.0;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#050c18'),
      metalness: 0.3,
      roughness: 0.6,
      transparent: true,
      opacity: 0.95,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // ── B. LAT/LON WIREFRAME TECH GRID ───────────────────────
    const gridGeo = new THREE.SphereGeometry(globeRadius * 1.008, 36, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: CYAN_DIM,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    globeGroup.add(grid);

    // Outer orbital tech ring
    const orbitRingGeo = new THREE.TorusGeometry(1.22, 0.007, 8, 100);
    const orbitRingMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.45 });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.2;
    globeGroup.add(orbitRing);

    // ── C. CONTINENT DOT MATRIX ──────────────────────────────
    // Helper: Convert Lat/Lon to 3D Cartesian coordinates
    function latLonToVec3(lat, lon, r = globeRadius) {
      const phi   = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta)
      );
    }

    // Key continental sample clusters (India, Asia, Europe, Africa, Americas)
    const continentClusters = [
      // India & South Asia (dense highlight)
      { lat: 12.97, lon: 77.59, radius: 10, count: 65 },  // Bengaluru / South India
      { lat: 19.07, lon: 72.87, radius: 8, count: 45 },   // Mumbai / West India
      { lat: 28.61, lon: 77.20, radius: 9, count: 50 },   // Delhi / North India
      { lat: 22.57, lon: 88.36, radius: 8, count: 40 },   // East India
      // Rest of Asia
      { lat: 35.67, lon: 139.65, radius: 12, count: 50 }, // Japan
      { lat: 31.23, lon: 121.47, radius: 16, count: 70 }, // China
      { lat: 1.35,  lon: 103.81, radius: 10, count: 40 }, // Southeast Asia
      { lat: 25.20, lon: 55.27, radius: 10, count: 35 },  // Middle East
      // Europe
      { lat: 51.50, lon: -0.12, radius: 14, count: 60 },  // UK & West Europe
      { lat: 48.85, lon: 2.35, radius: 14, count: 50 },   // Central Europe
      // Africa
      { lat: 0.0,   lon: 20.0, radius: 22, count: 75 },   // Central Africa
      { lat: 30.0,  lon: 31.0, radius: 12, count: 40 },   // North Africa
      // Americas
      { lat: 40.71, lon: -74.00, radius: 18, count: 70 }, // US East Coast
      { lat: 37.77, lon: -122.41, radius: 16, count: 50 },// US West Coast
      { lat: -15.79, lon: -47.88, radius: 20, count: 60 },// South America
      // Australia
      { lat: -25.27, lon: 133.77, radius: 18, count: 50 } // Australia
    ];

    const continentPoints = [];
    continentClusters.forEach(cluster => {
      for (let i = 0; i < cluster.count; i++) {
        const dLat = (Math.random() - 0.5) * cluster.radius;
        const dLon = (Math.random() - 0.5) * cluster.radius;
        const pt = latLonToVec3(cluster.lat + dLat, cluster.lon + dLon, globeRadius * 1.012);
        continentPoints.push(pt.x, pt.y, pt.z);
      }
    });

    const cGeo = new THREE.BufferGeometry();
    cGeo.setAttribute('position', new THREE.Float32BufferAttribute(continentPoints, 3));
    const cMat = new THREE.PointsMaterial({
      color: CYAN,
      size: 0.022,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const continentMesh = new THREE.Points(cGeo, cMat);
    globeGroup.add(continentMesh);

    // ── D. BENGALURU GLOWING PIN & BEACON ────────────────────
    // Coordinates: Bengaluru, Karnataka, India
    const BLR_LAT = 12.9716;
    const BLR_LON = 77.5946;

    const blrSurfacePos = latLonToVec3(BLR_LAT, BLR_LON, globeRadius * 1.01);
    const blrTipPos     = latLonToVec3(BLR_LAT, BLR_LON, globeRadius * 1.22);
    const blrSignPos    = latLonToVec3(BLR_LAT, BLR_LON, globeRadius * 1.48);

    // 1. Beacon Needle (3D line extending outwards from Bengaluru)
    const pinStickGeo = new THREE.CylinderGeometry(0.008, 0.003, 0.22, 12);
    const pinStickMat = new THREE.MeshBasicMaterial({ color: CYAN_LT });
    const pinStick = new THREE.Mesh(pinStickGeo, pinStickMat);
    // Orient pin stick to point radially outward
    const midPos = latLonToVec3(BLR_LAT, BLR_LON, globeRadius * 1.11);
    pinStick.position.copy(midPos);
    pinStick.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), blrSurfacePos.clone().normalize());
    globeGroup.add(pinStick);

    // 2. High-intensity Beacon Glowing Sphere
    const beaconSphereGeo = new THREE.SphereGeometry(0.042, 16, 16);
    const beaconSphereMat = new THREE.MeshBasicMaterial({ color: CYAN });
    const beaconSphere = new THREE.Mesh(beaconSphereGeo, beaconSphereMat);
    beaconSphere.position.copy(blrTipPos);
    globeGroup.add(beaconSphere);

    // Dedicated Point Light on Bengaluru Beacon
    const blrLight = new THREE.PointLight(CYAN, 2.5, 3.5);
    blrLight.position.copy(blrTipPos);
    globeGroup.add(blrLight);

    // 3. Animated Concentric Radar Pulse Rings at Bengaluru surface
    const radarRings = [];
    for (let r = 1; r <= 3; r++) {
      const ringGeo = new THREE.RingGeometry(0.02 * r, 0.03 * r, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: CYAN,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7 / r,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(blrSurfacePos);
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), blrSurfacePos.clone().normalize());
      ringMesh.userData = { baseScale: r, speed: 0.8 + r * 0.2 };
      globeGroup.add(ringMesh);
      radarRings.push(ringMesh);
    }

    // 4. Vertical Holographic Light Beam shooting into space
    const beamGeo = new THREE.CylinderGeometry(0.003, 0.012, 0.6, 12);
    const beamMat = new THREE.MeshBasicMaterial({
      color: CYAN_LT,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    const beamMid = latLonToVec3(BLR_LAT, BLR_LON, globeRadius * 1.32);
    beam.position.copy(beamMid);
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), blrSurfacePos.clone().normalize());
    globeGroup.add(beam);

    // 5. 3D Floating HUD Billboard Sign: "📍 BENGALURU, INDIA"
    function createHUDTexture() {
      const hudCanvas = document.createElement('canvas');
      hudCanvas.width = 512;
      hudCanvas.height = 160;
      const ctx = hudCanvas.getContext('2d');

      // Rounded HUD badge background
      ctx.fillStyle = 'rgba(7, 15, 30, 0.92)';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 140, 16);
      ctx.fill();
      ctx.stroke();

      // Top title
      ctx.font = 'bold 36px "Inter", sans-serif';
      ctx.fillStyle = '#00f0ff';
      ctx.textAlign = 'center';
      ctx.fillText('📍 BENGALURU, INDIA', 256, 60);

      // Subtitle / Coordinates
      ctx.font = '24px "Fira Code", monospace';
      ctx.fillStyle = '#67e8f9';
      ctx.fillText('12.97° N, 77.59° E  // BASE', 256, 102);

      // Active beacon indicator line
      ctx.fillStyle = '#00ff9d';
      ctx.fillRect(80, 122, 352, 4);

      return new THREE.CanvasTexture(hudCanvas);
    }

    const hudTexture = createHUDTexture();
    const hudMat = new THREE.SpriteMaterial({
      map: hudTexture,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
    });
    const hudSprite = new THREE.Sprite(hudMat);
    hudSprite.scale.set(0.85, 0.28, 1);
    hudSprite.position.copy(blrSignPos);
    globeGroup.add(hudSprite);

    // ── E. LIGHTING ──────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const mainLight = new THREE.PointLight(CYAN_LT, 2.5, 12);
    mainLight.position.set(4, 3, 4);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(PURPLE, 1.8, 10);
    rimLight.position.set(-4, -2, -2);
    scene.add(rimLight);

    // Initial orientation: Orient Bengaluru to face user directly
    let rotX = 0.22;
    let rotY = -Math.PI * 0.42;

    // ── F. INTERACTIVE DRAG TO ROTATE ────────────────────────
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;
    let velX = 0, velY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });
    canvas.addEventListener('touchstart', (e) => {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('mouseup',  () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      velX = (e.clientX - prevMouseX) * 0.005;
      velY = (e.clientY - prevMouseY) * 0.003;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      velX = (e.touches[0].clientX - prevMouseX) * 0.005;
      velY = (e.touches[0].clientY - prevMouseY) * 0.003;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    // ── G. GLOBE ANIMATION LOOP ──────────────────────────────
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Inertia and gentle idle auto-drift
      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        rotY += 0.0025; // gentle rotation
      }
      rotX += velY;
      rotY += velX;
      velX *= 0.88;
      velY *= 0.88;

      // Restrict vertical pitch to prevent flipping upside down
      rotX = Math.max(-0.8, Math.min(0.8, rotX));

      globeGroup.rotation.x = rotX;
      globeGroup.rotation.y = rotY;

      // Pulse the Bengaluru Beacon sphere & light
      const beaconPulse = 1 + Math.sin(t * 3.5) * 0.25;
      beaconSphere.scale.setScalar(beaconPulse);
      blrLight.intensity = 2.0 + Math.sin(t * 4) * 1.0;

      // Animate radar pulse rings expanding outward from Bengaluru
      radarRings.forEach((ring, idx) => {
        const ringTime = (t * 0.8 + idx * 0.33) % 1;
        const scale = 0.6 + ringTime * 2.2;
        ring.scale.set(scale, scale, 1);
        ring.material.opacity = (1 - ringTime) * 0.65;
      });

      // Subtle pulse on HUD sprite
      hudSprite.material.opacity = 0.85 + Math.sin(t * 2) * 0.15;

      // Orbit ring slow spin
      orbitRing.rotation.z = t * 0.2;

      renderer.render(scene, camera);
    }
    animate();
  })();

})();
