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
const EMAILJS_TEMPLATE_ID = 'template_hmsbf9g';  // ← Replace

document.addEventListener('DOMContentLoaded', () => {

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
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

    // Send
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject || 'Portfolio Contact',
      message: message,
      to_name: 'Deevyanshu'
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      showToast('✅ Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast('❌ Failed to send. Please try again or email directly.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
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

});
