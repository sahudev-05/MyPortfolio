// ============================================================
// EMAILJS CONTACT FORM HANDLER
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an Email Service (e.g., Gmail) → note your SERVICE_ID
// 3. Create an Email Template → note your TEMPLATE_ID
//    Template variables to map:
//      {{from_name}}   = sender's name
//      {{from_email}}  = sender's email
//      {{subject}}     = subject
//      {{message}}     = message body
//      {{to_name}}     = "Deevyanshu" (set as default in template)
// 4. Go to Account > API Keys → note your PUBLIC_KEY
// 5. Replace the three placeholder values below
// ============================================================

const EMAILJS_PUBLIC_KEY = 'r_h6No-Q8wFIj5tIt';   // ← Replace
const EMAILJS_SERVICE_ID = 'service_emuglm4';   // ← Replace
const EMAILJS_TEMPLATE_ID = 'template_cxb0k0h';  // ← Replace

document.addEventListener('DOMContentLoaded', () => {

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form          = document.getElementById('contactForm');
  const formTitle     = document.getElementById('contactFormTitle');
  const submitBtn     = document.getElementById('submitBtn');
  const toast         = document.getElementById('toast');
  const successState  = document.getElementById('contactSuccessState');
  const senderNameEl  = document.getElementById('successSenderName');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');
  const confettiCanvas = document.getElementById('contactConfettiCanvas');

  if (!form) return;

  // Send Another Message Button Handler
  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', () => {
      if (successState) successState.style.display = 'none';
      if (form) {
        form.style.display = 'block';
        requestAnimationFrame(() => {
          form.classList.remove('is-hidden');
        });
      }
      if (formTitle) formTitle.style.display = 'block';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-sending', 'is-sent');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane" id="submitBtnIcon"></i> <span id="submitBtnText">Send Message</span>';
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
      showToast('EmailJS not configured yet — see js/contact.js for setup instructions.', 'error');
      return;
    }

    // Interactive Sending Animation State
    submitBtn.disabled = true;
    submitBtn.classList.add('is-sending');
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Encrypting & Dispatching...</span>';

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject || 'Portfolio Contact',
      message: message,
      to_name: 'Deevyanshu'
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      // Sent State Animation on Button
      submitBtn.classList.remove('is-sending');
      submitBtn.classList.add('is-sent');
      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Transmission Delivered!</span>';

      // Launch Cyber Confetti & Spark Particles
      triggerCyberConfetti(confettiCanvas);

      // Show Toast Notification
      showToast("✅ Message transmitted! I'll get back to you soon.", 'success');

      // Personalize Success State
      if (senderNameEl) {
        const firstName = name.split(' ')[0] || name;
        senderNameEl.textContent = firstName;
      }

      // Smooth Morph from Form to Holographic Success State
      setTimeout(() => {
        form.classList.add('is-hidden');
        if (formTitle) formTitle.style.display = 'none';

        setTimeout(() => {
          form.style.display = 'none';
          if (successState) {
            successState.style.display = 'block';
          }
          form.reset();
        }, 350);
      }, 700);

    } catch (err) {
      console.error('EmailJS error:', err);
      let detail = 'Please try again or email directly.';
      if (err) {
        if (typeof err === 'string') detail = err;
        else if (err.text) detail = err.text;
        else if (err.message) detail = err.message;
      }
      showToast(`❌ ${detail}`, 'error');

      // Restore submit button
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-sending', 'is-sent');
      submitBtn.innerHTML = '<i class="fas fa-paper-plane" id="submitBtnIcon"></i> <span id="submitBtnText">Send Message</span>';
    }
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showToast(msg, type) {
    toast.textContent = msg;
    toast.className = `show ${type}`;
    setTimeout(() => { toast.className = ''; }, 4500);
  }

  // ── HIGH-TECH CYBER CONFETTI PARTICLE BURST ────────────────
  function triggerCyberConfetti(canvas) {
    if (!canvas) return;
    const card = canvas.parentElement;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    canvas.width  = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Burst origins from button position
    const originX = rect.width / 2;
    const originY = rect.height - 80;

    const colors = [
      '#00f0ff', // Cyber Cyan
      '#c9a227', // Gold
      '#10b981', // Emerald
      '#ffffff', // Diamond White
      '#60a5fa'  // Electric Blue
    ];

    const particles = [];
    const PARTICLE_COUNT = 65;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8; // Upward spray
      const speed = 7 + Math.random() * 9;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.015,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    let animId = null;
    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = 0;
      particles.forEach(p => {
        if (p.alpha <= 0) return;
        alive++;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // Gravity
        p.vx *= 0.98; // Air drag
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (alive > 0) {
        animId = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animId);
      }
    }

    renderConfetti();
  }

});
