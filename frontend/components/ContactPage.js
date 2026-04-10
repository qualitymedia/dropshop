export const ContactPage = () => `
<div class="static-page container" style="padding:50px 16px 80px; max-width:860px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:40px;">
        <div style="display:inline-flex; align-items:center; justify-content:center; width:72px; height:72px; background:linear-gradient(135deg,#3b82f6,#1d4ed8); border-radius:50%; margin-bottom:16px;">
            <i class="fa-solid fa-headset" style="font-size:1.8rem; color:#fff;"></i>
        </div>
        <h1 style="font-size:2rem; font-weight:800; color:#1e293b;">Contact Us</h1>
        <p style="color:#64748b;">We're here to help. Reach out through any of these channels.</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:32px;">
        <div class="contact-channel">
            <i class="fa-brands fa-whatsapp" style="color:#25d366;"></i>
            <strong>WhatsApp</strong>
            <p>Chat with us instantly</p>
            <a href="https://wa.me/2348000000000" target="_blank" class="contact-link">Message Us</a>
        </div>
        <div class="contact-channel">
            <i class="fa-solid fa-envelope" style="color:var(--primary);"></i>
            <strong>Email</strong>
            <p>support@dropshop.com</p>
            <a href="mailto:support@dropshop.com" class="contact-link">Send Email</a>
        </div>
        <div class="contact-channel">
            <i class="fa-solid fa-phone" style="color:#3b82f6;"></i>
            <strong>Phone</strong>
            <p>Mon – Fri, 9am – 6pm</p>
            <a href="tel:+2348000000000" class="contact-link">Call Now</a>
        </div>
        <div class="contact-channel">
            <i class="fa-solid fa-map-location-dot" style="color:#ef4444;"></i>
            <strong>Office</strong>
            <p>Lagos, Nigeria</p>
            <a href="#" class="contact-link">View Map</a>
        </div>
    </div>

    <div class="static-section">
        <h2><i class="fa-solid fa-paper-plane" style="color:var(--primary); margin-right:8px;"></i>Send a Message</h2>
        <form id="contactForm" style="display:grid; gap:14px; margin-top:16px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
                <div class="admin-field"><label>Your Name</label><input type="text" id="ctName" placeholder="John Doe" required></div>
                <div class="admin-field"><label>Email</label><input type="email" id="ctEmail" placeholder="you@example.com" required></div>
            </div>
            <div class="admin-field"><label>Subject</label><input type="text" id="ctSubject" placeholder="Order issue, product inquiry..."></div>
            <div class="admin-field"><label>Message</label><textarea id="ctMsg" rows="5" placeholder="Tell us how we can help..."></textarea></div>
            <button type="submit" class="btn btn-primary" style="padding:14px; border-radius:10px; font-size:.95rem;">
                <i class="fa-solid fa-paper-plane"></i> Send Message
            </button>
            <div id="ctSuccess" style="display:none; background:#dcfce7; color:#16a34a; padding:12px 16px; border-radius:8px; font-weight:600;">
                ✅ Message sent! We'll get back to you within 24 hours.
            </div>
        </form>
    </div>
</div>

<style>
    .contact-channel { background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:24px; text-align:center; }
    .contact-channel i { font-size:2rem; margin-bottom:10px; display:block; }
    .contact-channel strong { display:block; font-size:1rem; color:#1e293b; margin-bottom:4px; }
    .contact-channel p { font-size:.82rem; color:#64748b; margin-bottom:12px; }
    .contact-link { display:inline-block; background:#f1f5f9; color:#374151; padding:6px 16px; border-radius:20px; font-size:.8rem; font-weight:600; text-decoration:none; transition:background .2s; }
    .contact-link:hover { background:var(--primary); color:#fff; }
</style>
`;

export function initContactPage() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.onsubmit = (e) => {
        e.preventDefault();
        form.querySelector('button').disabled = true;
        setTimeout(() => {
            document.getElementById('ctSuccess').style.display = 'block';
            form.reset();
            form.querySelector('button').disabled = false;
        }, 800);
    };
}
