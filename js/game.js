// ============================================================
// CODE CATCHER — Mini Game
// Catch correct code blocks (green), dodge bugs (red)
// Controls: Arrow Left/Right or A/D or on-screen buttons
// ============================================================

(function() {

  const canvas   = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx      = canvas.getContext('2d');

  // ── CONFIG ──────────────────────────────────────────────────
  const W = canvas.width  = 700;
  const H = canvas.height = 380;

  const PLAYER_W  = 70;
  const PLAYER_H  = 16;
  const PLAYER_Y  = H - 50;
  const BLOCK_W   = 64;
  const BLOCK_H   = 32;
  const GOOD_WORDS = ['<div>', 'const', 'API', 'async', 'func()', '⚡', 'git', 'npm', 'AI', 'ML', 'IoT'];
  const BAD_WORDS  = ['bug', '404', 'null', 'error', 'crash', '☠', 'NaN', 'void*'];

  const COLORS = {
    bg      : '#030712',
    grid    : 'rgba(0, 240, 255, 0.05)',
    player  : '#00f0ff',
    glow    : 'rgba(0, 240, 255, 0.8)',
    good    : '#00ff9d',
    goodBg  : 'rgba(0, 255, 157, 0.12)',
    bad     : '#ff3b5c',
    badBg   : 'rgba(255, 59, 92, 0.12)',
    text    : '#f0f6fc',
    muted   : '#8494ab',
    accent  : '#00f0ff',
  };

  // ── STATE ───────────────────────────────────────────────────
  let player, blocks, score, lives, level, gameOver, running, paused, raf;
  let spawnTimer = 0, spawnInterval = 90, speedMult = 1, frameCount = 0;
  let particles = [];

  function initState() {
    player = { x: W / 2 - PLAYER_W / 2, speed: 8, trail: [] };
    blocks  = [];
    score   = 0;
    lives   = 3;
    level   = 1;
    gameOver= false;
    running = false;
    paused  = false;
    spawnTimer    = 0;
    spawnInterval = 90;
    speedMult     = 1;
    frameCount    = 0;
    particles     = [];
    updateHUD();
  }

  // ── INPUT ────────────────────────────────────────────────────
  const keys = {};
  document.addEventListener('keydown', e => { keys[e.key] = true; });
  document.addEventListener('keyup',   e => { keys[e.key] = false; });

  // On-screen controls
  document.getElementById('btnLeft').addEventListener('mousedown',  () => { keys['ArrowLeft']  = true;  });
  document.getElementById('btnLeft').addEventListener('mouseup',    () => { keys['ArrowLeft']  = false; });
  document.getElementById('btnLeft').addEventListener('touchstart', () => { keys['ArrowLeft']  = true;  });
  document.getElementById('btnLeft').addEventListener('touchend',   () => { keys['ArrowLeft']  = false; });
  document.getElementById('btnRight').addEventListener('mousedown',  () => { keys['ArrowRight'] = true;  });
  document.getElementById('btnRight').addEventListener('mouseup',    () => { keys['ArrowRight'] = false; });
  document.getElementById('btnRight').addEventListener('touchstart', () => { keys['ArrowRight'] = true;  });
  document.getElementById('btnRight').addEventListener('touchend',   () => { keys['ArrowRight'] = false; });

  document.getElementById('btnStart').addEventListener('click', startGame);
  document.getElementById('btnPause').addEventListener('click', togglePause);

  // ── SPAWN BLOCK ──────────────────────────────────────────────
  function spawnBlock() {
    const isGood = Math.random() > 0.35;
    const words  = isGood ? GOOD_WORDS : BAD_WORDS;
    blocks.push({
      x    : Math.random() * (W - BLOCK_W),
      y    : -BLOCK_H,
      speed: (1.5 + Math.random() * 1.5) * speedMult,
      isGood,
      word : words[Math.floor(Math.random() * words.length)],
      opacity: 1,
      dying: false
    });
  }

  // ── PARTICLES ────────────────────────────────────────────────
  function spawnParticles(x, y, color) {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 2 + Math.random() * 3;
      particles.push({
        x, y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: 40,
        color
      });
    }
  }

  // ── HUD ──────────────────────────────────────────────────────
  function updateHUD() {
    document.getElementById('gameScore').textContent = score;
    document.getElementById('gameLives').textContent = '❤️'.repeat(lives);
    document.getElementById('gameLevel').textContent = level;
  }

  // ── START / PAUSE / RESET ────────────────────────────────────
  function startGame() {
    if (raf) cancelAnimationFrame(raf);
    initState();
    running = true;
    document.getElementById('btnStart').textContent = 'Restart';
    document.getElementById('btnPause').disabled = false;
    loop();
  }

  function togglePause() {
    if (!running) return;
    paused = !paused;
    document.getElementById('btnPause').textContent = paused ? 'Resume' : 'Pause';
    if (!paused) loop();
  }

  // ── GAME LOOP ────────────────────────────────────────────────
  function loop() {
    if (paused || gameOver) return;
    update();
    draw();
    raf = requestAnimationFrame(loop);
  }

  function update() {
    frameCount++;

    // Move player
    if ((keys['ArrowLeft'] || keys['a'] || keys['A']) && player.x > 0) {
      player.x -= player.speed;
    }
    if ((keys['ArrowRight'] || keys['d'] || keys['D']) && player.x < W - PLAYER_W) {
      player.x += player.speed;
    }

    // Trail
    player.trail.push({ x: player.x + PLAYER_W / 2, y: PLAYER_Y });
    if (player.trail.length > 10) player.trail.shift();

    // Level progression
    if (frameCount % 600 === 0) {
      level++;
      speedMult   = 1 + (level - 1) * 0.25;
      spawnInterval = Math.max(35, spawnInterval - 8);
      updateHUD();
    }

    // Spawn
    spawnTimer++;
    if (spawnTimer >= spawnInterval) {
      spawnBlock();
      spawnTimer = 0;
    }

    // Update blocks
    blocks = blocks.filter(b => {
      b.y += b.speed;

      // Collision with player
      const hitX = b.x < player.x + PLAYER_W && b.x + BLOCK_W > player.x;
      const hitY = b.y + BLOCK_H > PLAYER_Y && b.y < PLAYER_Y + PLAYER_H;
      if (hitX && hitY) {
        if (b.isGood) {
          score += 10 * level;
          spawnParticles(b.x + BLOCK_W / 2, PLAYER_Y, COLORS.good);
        } else {
          lives--;
          spawnParticles(b.x + BLOCK_W / 2, PLAYER_Y, COLORS.bad);
          if (lives <= 0) { endGame(); return false; }
        }
        updateHUD();
        return false;
      }

      // Missed good block
      if (b.y > H) {
        if (b.isGood) { lives--; updateHUD(); }
        if (lives <= 0) { endGame(); return false; }
        return false;
      }
      return true;
    });

    // Update particles
    particles = particles.filter(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.2;
      p.life--;
      return p.life > 0;
    });
  }

  function endGame() {
    gameOver = true;
    running  = false;
    document.getElementById('btnPause').disabled = true;
  }

  // ── DRAW ─────────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Player trail
    player.trail.forEach((pt, i) => {
      const alpha = i / player.trail.length * 0.3;
      const size  = (i / player.trail.length) * PLAYER_W;
      ctx.fillStyle = `rgba(108,99,255,${alpha})`;
      ctx.beginPath();
      ctx.roundRect(pt.x - size / 2, PLAYER_Y + PLAYER_H / 4, size, PLAYER_H / 2, 3);
      ctx.fill();
    });

    // Player
    ctx.shadowBlur  = 20;
    ctx.shadowColor = COLORS.glow;
    const grad = ctx.createLinearGradient(player.x, 0, player.x + PLAYER_W, 0);
    grad.addColorStop(0, '#00f0ff');
    grad.addColorStop(0.5, '#67e8f9');
    grad.addColorStop(1, '#00f0ff');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(player.x, PLAYER_Y, PLAYER_W, PLAYER_H, 4);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Blocks
    blocks.forEach(b => {
      ctx.shadowBlur  = 12;
      ctx.shadowColor = b.isGood ? COLORS.good : COLORS.bad;

      // Block bg
      ctx.fillStyle = b.isGood ? COLORS.goodBg : COLORS.badBg;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, BLOCK_W, BLOCK_H, 6);
      ctx.fill();

      // Block border
      ctx.strokeStyle = b.isGood ? COLORS.good : COLORS.bad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, BLOCK_W, BLOCK_H, 6);
      ctx.stroke();

      // Block text
      ctx.shadowBlur = 0;
      ctx.fillStyle  = b.isGood ? COLORS.good : COLORS.bad;
      ctx.font       = 'bold 11px Fira Code, monospace';
      ctx.textAlign  = 'center';
      ctx.fillText(b.word, b.x + BLOCK_W / 2, b.y + BLOCK_H / 2 + 4);
    });
    ctx.shadowBlur = 0;

    // Particles
    particles.forEach(p => {
      ctx.globalAlpha = p.life / 40;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Ground line
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(0, PLAYER_Y + PLAYER_H + 12);
    ctx.lineTo(W, PLAYER_Y + PLAYER_H + 12);
    ctx.stroke();
    ctx.setLineDash([]);

    // Game Over screen
    if (gameOver) {
      ctx.fillStyle = 'rgba(8,12,26,0.88)';
      ctx.fillRect(0, 0, W, H);

      ctx.textAlign = 'center';
      ctx.font = 'bold 40px Bebas Neue, sans-serif';
      const goGrad = ctx.createLinearGradient(0, 0, W, 0);
      goGrad.addColorStop(0, '#00f0ff');
      goGrad.addColorStop(0.5, '#67e8f9');
      goGrad.addColorStop(1, '#00f0ff');
      ctx.fillStyle = goGrad;
      ctx.fillText('GAME OVER', W / 2, H / 2 - 40);

      ctx.font = '20px Space Grotesk, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.fillText(`Final Score: ${score}`, W / 2, H / 2 + 4);
      ctx.fillText(`Level Reached: ${level}`, W / 2, H / 2 + 36);

      ctx.font = '14px Fira Code, monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Press Restart to play again', W / 2, H / 2 + 76);
    }

    // Idle screen (before start)
    if (!running && !gameOver) {
      ctx.fillStyle = 'rgba(2,4,8,0.65)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.font = 'bold 32px Bebas Neue, sans-serif';
      const ig = ctx.createLinearGradient(0, 0, W, 0);
      ig.addColorStop(0, '#00f0ff');
      ig.addColorStop(0.5, '#67e8f9');
      ig.addColorStop(1, '#00f0ff');
      ctx.fillStyle = ig;
      ctx.fillText('🎮 Code Catcher', W / 2, H / 2 - 30);
      ctx.font = '15px Fira Code, monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Catch code blocks · Dodge bugs', W / 2, H / 2 + 14);
      ctx.fillText('Press Start to play!', W / 2, H / 2 + 44);
    }
  }

  // Initial idle draw
  initState();
  draw();

})();
