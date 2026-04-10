export const HelpPage = () => `
<div class="static-page container" style="padding:50px 16px 80px; max-width:860px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:40px;">
        <div style="display:inline-flex; align-items:center; justify-content:center; width:72px; height:72px; background:linear-gradient(135deg,#10b981,#047857); border-radius:50%; margin-bottom:16px;">
            <i class="fa-solid fa-circle-question" style="font-size:1.8rem; color:#fff;"></i>
        </div>
        <h1 style="font-size:2rem; font-weight:800; color:#1e293b;">Help Center</h1>
        <p style="color:#64748b;">Find answers to frequently asked questions about DropShop.</p>
    </div>

    <!-- Quick links -->
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:36px;">
        <div class="help-quick" onclick="document.getElementById('faq-orders').scrollIntoView({behavior:'smooth'})">
            <i class="fa-solid fa-box" style="color:var(--primary);"></i><span>Orders</span>
        </div>
        <div class="help-quick" onclick="document.getElementById('faq-returns').scrollIntoView({behavior:'smooth'})">
            <i class="fa-solid fa-rotate-left" style="color:#3b82f6;"></i><span>Returns</span>
        </div>
        <div class="help-quick" onclick="document.getElementById('faq-payment').scrollIntoView({behavior:'smooth'})">
            <i class="fa-solid fa-credit-card" style="color:#16a34a;"></i><span>Payments</span>
        </div>
    </div>

    <div id="faq-orders" class="static-section" style="margin-bottom:16px;">
        <h2>📦 Orders & Delivery</h2>
        ${faq('How do I track my order?', 'After placing an order, go to <strong>My Account → My Orders</strong>. You\'ll see the status and a tracking number once your order ships.')}
        ${faq('How long does delivery take?', 'Standard delivery takes 3–5 business days. Express delivery (available at checkout) delivers in 1–2 business days.')}
        ${faq('Can I change my delivery address?', 'Contact us immediately via WhatsApp or email if you need to change your address. Changes can only be made before the order is shipped.')}
    </div>

    <div id="faq-returns" class="static-section" style="margin-bottom:16px;">
        <h2>🔄 Returns & Refunds</h2>
        ${faq('What is the return policy?', 'We accept returns within 15 days of delivery for eligible items. The product must be in its original packaging and unused condition.')}
        ${faq('How long do refunds take?', 'Once we receive and inspect the returned item, refunds are processed within 5–7 business days to your original payment method.')}
        ${faq('What items cannot be returned?', 'Perishable goods, downloadable software, personalized items, and items marked "Final Sale" cannot be returned.')}
    </div>

    <div id="faq-payment" class="static-section">
        <h2>💳 Payments</h2>
        ${faq('What payment methods are accepted?', 'We accept Visa, Mastercard, bank transfers, and mobile money. More payment options are coming soon.')}
        ${faq('Is my payment information secure?', 'Yes. All transactions are encrypted with SSL. We never store your card details on our servers.')}
        ${faq('Can I pay on delivery?', 'Pay-on-delivery is available in select cities. You will see this option at checkout if available in your area.')}
    </div>

    <div style="text-align:center; margin-top:40px;">
        <p style="color:#64748b; margin-bottom:16px;">Can't find what you're looking for?</p>
        <a href="#contact" class="btn btn-primary" style="padding:13px 32px; border-radius:10px;">Contact Support</a>
    </div>
</div>

<style>
    .help-quick { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; text-align:center; cursor:pointer; transition:border-color .2s, transform .2s; }
    .help-quick:hover { border-color:var(--primary); transform:translateY(-2px); }
    .help-quick i { font-size:1.5rem; display:block; margin-bottom:8px; }
    .help-quick span { font-size:.85rem; font-weight:700; color:#374151; }
    .faq-item { border-bottom:1px solid #f1f5f9; padding:14px 0; }
    .faq-item:last-child { border-bottom:none; }
    .faq-q { font-weight:700; color:#1e293b; cursor:pointer; display:flex; justify-content:space-between; align-items:center; }
    .faq-a { display:none; color:#475569; font-size:.9rem; line-height:1.7; margin-top:8px; }
    .faq-item.open .faq-a { display:block; }
    .faq-item.open .faq-chevron { transform:rotate(180deg); }
    .faq-chevron { transition:transform .2s; color:#94a3b8; }
</style>
`;

function faq(q, a) {
    return `<div class="faq-item" onclick="this.classList.toggle('open')">
        <div class="faq-q">${q}<i class="fa-solid fa-chevron-down faq-chevron"></i></div>
        <div class="faq-a">${a}</div>
    </div>`;
}

export const ReturnPolicyPage = () => `
<div class="static-page container" style="padding:50px 16px 80px; max-width:760px; margin:0 auto;">
    <h1 style="font-size:1.8rem; font-weight:800; color:#1e293b; margin-bottom:8px;">Return & Refund Policy</h1>
    <p style="color:#64748b; margin-bottom:32px;">Last updated: April 2026</p>

    <div class="static-section" style="margin-bottom:16px;">
        <h2>15-Day Return Window</h2>
        <p>If you are not satisfied with your purchase, you may return it within <strong>15 days</strong> of the delivery date. Items must be:</p>
        <ul style="margin:12px 0 0 20px; color:#475569; line-height:2;">
            <li>In their original, undamaged packaging</li>
            <li>Unused and in the same condition you received them</li>
            <li>Accompanied by the original receipt or proof of purchase</li>
        </ul>
    </div>

    <div class="static-section" style="margin-bottom:16px;">
        <h2>Non-Returnable Items</h2>
        <ul style="margin:12px 0 0 20px; color:#475569; line-height:2;">
            <li>Perishable goods (food, flowers, newspapers)</li>
            <li>Downloadable software or digital products</li>
            <li>Personalized or custom-made items</li>
            <li>Items marked as "Final Sale" at time of purchase</li>
            <li>Hazardous materials</li>
        </ul>
    </div>

    <div class="static-section" style="margin-bottom:16px;">
        <h2>Refund Process</h2>
        <p>Once your return is received and inspected, we will notify you of the refund approval. If approved, your refund will be processed within <strong>5–7 business days</strong> to your original payment method.</p>
    </div>

    <div class="static-section">
        <h2>How to Initiate a Return</h2>
        <ol style="margin:12px 0 0 20px; color:#475569; line-height:2.2;">
            <li>Go to <strong>My Account → My Orders</strong></li>
            <li>Select the order and click <strong>Request Return</strong></li>
            <li>Choose the items and provide a reason</li>
            <li>Print the prepaid return label and ship the item back</li>
        </ol>
    </div>

    <div style="text-align:center; margin-top:40px;">
        <a href="#contact" class="btn btn-primary" style="padding:13px 32px; border-radius:10px;">Contact Support</a>
    </div>
</div>
`;
