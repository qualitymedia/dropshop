export const AboutPage = () => `
<div class="static-page container" style="padding:50px 16px 80px; max-width:860px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:48px;">
        <div style="display:inline-flex; align-items:center; justify-content:center; width:72px; height:72px; background:linear-gradient(135deg, var(--primary-dark), var(--primary)); border-radius:50%; margin-bottom:16px;">
            <i class="fa-solid fa-leaf" style="font-size:1.8rem; color:#fff;"></i>
        </div>
        <h1 style="font-size:2rem; font-weight:800; color:#1e293b;">About DropShop</h1>
        <p style="color:#64748b; font-size:1rem; margin-top:8px;">Your ultimate destination for smart, trendy and affordable shopping.</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:40px;">
        <div class="about-stat-card">
            <div class="about-stat-num">50K+</div>
            <div class="about-stat-label">Happy Customers</div>
        </div>
        <div class="about-stat-card">
            <div class="about-stat-num">10K+</div>
            <div class="about-stat-label">Products Listed</div>
        </div>
        <div class="about-stat-card">
            <div class="about-stat-num">99%</div>
            <div class="about-stat-label">Satisfaction Rate</div>
        </div>
        <div class="about-stat-card">
            <div class="about-stat-num">24/7</div>
            <div class="about-stat-label">Customer Support</div>
        </div>
    </div>

    <div class="static-section">
        <h2>Our Story</h2>
        <p>DropShop was founded with a single mission: to make premium, innovative products accessible to everyone. We believe that great technology shouldn't be reserved for the privileged few — it should be discoverable, affordable, and delivered to your doorstep.</p>
        <p style="margin-top:12px;">From science gadgets and robotics kits to smart health wearables and geek apparel, our curated catalogue bridges the gap between curiosity and discovery. Every product on DropShop is hand-picked by our team to ensure quality, authenticity, and genuine value.</p>
    </div>

    <div class="static-section">
        <h2>Our Values</h2>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px;">
            <div class="value-card"><i class="fa-solid fa-shield-halved" style="color:var(--primary);"></i><strong>Trust</strong><p>We only list verified products from reputable suppliers.</p></div>
            <div class="value-card"><i class="fa-solid fa-truck-fast" style="color:#3b82f6;"></i><strong>Speed</strong><p>Fast, reliable delivery right to your door.</p></div>
            <div class="value-card"><i class="fa-solid fa-headset" style="color:#16a34a;"></i><strong>Support</strong><p>Real humans, ready to help you 24/7.</p></div>
            <div class="value-card"><i class="fa-solid fa-leaf" style="color:#10b981;"></i><strong>Sustainability</strong><p>We partner with eco-conscious brands and use sustainable packaging.</p></div>
        </div>
    </div>

    <div style="text-align:center; margin-top:48px;">
        <a href="#home" class="btn btn-primary" style="padding:14px 36px; font-size:1rem; border-radius:10px;">Start Shopping</a>
    </div>
</div>

<style>
    .about-stat-card { background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:24px; text-align:center; }
    .about-stat-num { font-size:2rem; font-weight:800; color:var(--primary); }
    .about-stat-label { font-size:.85rem; color:#64748b; margin-top:4px; font-weight:600; }
    .static-section { background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:28px; margin-bottom:20px; }
    .static-section h2 { font-size:1.2rem; font-weight:700; color:#1e293b; margin-bottom:12px; }
    .static-section p { color:#475569; line-height:1.7; }
    .value-card { background:#f8fafc; border-radius:10px; padding:20px; }
    .value-card i { font-size:1.4rem; margin-bottom:8px; display:block; }
    .value-card strong { display:block; margin-bottom:4px; color:#1e293b; }
    .value-card p { font-size:.85rem; color:#64748b; margin:0; }
</style>
`;
