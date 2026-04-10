import { Header } from './components/Header.js';
import { Hero, initHeroSlider } from './components/Hero.js';
import { TrustBar } from './components/TrustBar.js';
import { Products } from './components/Products.js';
import { Footer } from './components/Footer.js';
import { Cart } from './components/Cart.js';
import { AboutPage } from './components/AboutPage.js';
import { ContactPage, initContactPage } from './components/ContactPage.js';
import { HelpPage, ReturnPolicyPage } from './components/HelpPage.js';

// ---- SPA Hash Router ---- //
async function router() {
    const app = document.getElementById('app');
    if (!app) return;

    let hash = window.location.hash || '#home';
    let [route, queryStr] = hash.split('?');
    const params = new URLSearchParams(queryStr || '');

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (route === '#home') {
        app.innerHTML = `
            ${Header()}
            <main>
                ${Hero()}
                ${Products('Trending Products', 'trending-container', 'fa-fire')}
                ${Products('New Arrivals', 'new-container', 'fa-star')}
                ${Products('Top Picks for You', 'top-container', 'fa-crown')}
                ${TrustBar()}
            </main>
            ${Footer()}
        `;
        initHeroSlider();
        initCarouselButtons();
        await fetchAndRenderProducts();
    } 
    else if (route === '#product') {
        app.innerHTML = `${Header()}<main id="product-detail-container"></main>${Footer()}`;
        await renderProductPage(params.get('id'));
    }
    else if (route === '#cart') {
        app.innerHTML = `${Header()}<main id="cart-container" class="container" style="padding:20px 16px; min-height:60vh;"></main>${Footer()}`;
        renderCartPage();
    }
    else if (route === '#wishlist') {
        app.innerHTML = `${Header()}<main id="wishlist-container" class="container" style="padding:40px 16px; min-height:60vh;"><h2><i class="fa-regular fa-heart"></i> Saved Items</h2><p style="margin-top:10px; color:var(--muted);">You haven't saved any items yet.</p><a href="#home" class="btn btn-primary" style="margin-top:20px;">Explore Products</a></main>${Footer()}`;
    }
    else if (route === '#checkout') {
        app.innerHTML = `${Header()}<main id="checkout-container" class="container" style="padding:20px 16px; min-height:60vh;"></main>${Footer()}`;
        renderCheckoutPage();
    }
    else if (route === '#categories') {
        app.innerHTML = `${Header()}
            <main id="categories-container" style="padding-bottom:60px;"></main>
        ${Footer()}`;
        renderCategoryPage();
    }
    else if (route === '#account') {
        const { Account } = await import('./components/Account.js');
        app.innerHTML = `${Header()}<main id="account-container">${await Account.render()}</main>${Footer()}`;
        if (Account.afterRender) await Account.afterRender();
    }
    else if (route === '#admin') {
        const { Admin } = await import('./components/Admin.js');
        app.innerHTML = `${Header()}<main id="admin-container">${await Admin.render()}</main>${Footer()}`;
        if (Admin.afterRender) await Admin.afterRender();
    }
    else if (route === '#about') {
        app.innerHTML = `${Header()}<main>${AboutPage()}</main>${Footer()}`;
    }
    else if (route === '#contact') {
        app.innerHTML = `${Header()}<main>${ContactPage()}</main>${Footer()}`;
        initContactPage();
    }
    else if (route === '#help') {
        app.innerHTML = `${Header()}<main>${HelpPage()}</main>${Footer()}`;
    }
    else if (route === '#returns') {
        app.innerHTML = `${Header()}<main>${ReturnPolicyPage()}</main>${Footer()}`;
    }
    else if (route === '#track') {
        app.innerHTML = `${Header()}<main>${renderTrackOrderPage()}</main>${Footer()}`;
    }
    else {
        // Unknown route — redirect home
        window.location.hash = '#home';
        return;
    }

    initUI();
    Cart.updateBadge();
}

// Ensure router fires on load and on hash change
window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);

function initUI() {
    const menuBtn  = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const overlay  = document.getElementById('side-menu-overlay');

    const open  = () => { sideMenu?.classList.add('active');    overlay?.classList.add('active');    document.body.style.overflow = 'hidden'; };
    const close = () => { sideMenu?.classList.remove('active'); overlay?.classList.remove('active'); document.body.style.overflow = '';       };

    menuBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);

    // Navbar "All Categories" Dropdown toggle (Click-based)
    const allCatsWrapper = document.getElementById('all-cats-wrapper');
    const allCatsBtn     = document.getElementById('all-cats-btn');
    if (allCatsBtn && allCatsWrapper) {
        allCatsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            allCatsWrapper.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!allCatsWrapper.contains(e.target)) {
                allCatsWrapper.classList.remove('active');
            }
        });
    }

    // Universal Search Logic (Desktop & Mobile)
    const searchBtn = document.getElementById('global-search-btn');
    const searchIn  = document.getElementById('global-search-input');
    const mobileIn  = document.getElementById('mobile-search-input');
    const searchCat = document.querySelector('.search-category');

    const performSearch = () => {
        let query = (searchIn?.value || mobileIn?.value || '').trim();
        const cat = searchCat?.value || 'All';
        
        if (query || cat !== 'All') {
            let finalQuery = query;
            if (cat !== 'All' && !query.toLowerCase().includes(cat.toLowerCase())) {
                finalQuery = `${cat} ${query}`.trim();
            }
            window.location.hash = `#categories?search=${encodeURIComponent(finalQuery)}`;
            if (sideMenu?.classList.contains('active')) close();
        }
    };

    [searchBtn, searchIn, mobileIn].forEach(el => {
        el?.addEventListener('click', (e) => { if (e.target.id === 'global-search-btn') performSearch(); });
        el?.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
    });
}

function initCarouselButtons() {
    const wrappers = document.querySelectorAll('.carousel-wrapper');
    wrappers.forEach(wrapper => {
        const carousel = wrapper.querySelector('.product-carousel');
        const prev = wrapper.querySelector('.prev');
        const next = wrapper.querySelector('.next');
        
        if (!carousel || !prev || !next) return;

        const scrollByCard = () => Math.round(carousel.offsetWidth / 3);

        prev.addEventListener('click', () => carousel.scrollBy({ left: -scrollByCard(), behavior: 'smooth' }));
        next.addEventListener('click', () => carousel.scrollBy({ left:  scrollByCard(), behavior: 'smooth' }));

        const update = () => {
            prev.style.opacity = carousel.scrollLeft <= 4 ? '.4' : '1';
            next.style.opacity = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4 ? '.4' : '1';
        };
        carousel.addEventListener('scroll', update, { passive: true });
        // Wait a tick for layout, then update
        setTimeout(update, 100);
    });
}

async function fetchAndRenderProducts() {
    try {
        const res = await fetch('/api/products');

        // If server returned an error, keep skeletons
        if (!res.ok) return;

        const products = await res.json();

        // Only replace skeletons if there are real products in the DB
        if (!Array.isArray(products) || products.length === 0) {
            // Leave the shining skeleton loaders in place — awaiting real listings
            return;
        }

        const containers = document.querySelectorAll('.product-container-target');
        containers.forEach(container => {
            container.innerHTML = '';
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            shuffled.forEach(p => {
                container.innerHTML += `
                    <div class="product-card" onclick="window.location.hash='#product?id=${p.id}'">
                        <div class="product-img">
                            <span class="discount-badge">-${p.discount}%</span>
                            <img src="${p.image}" alt="${p.name}" loading="lazy">
                            <div class="card-overlay">
                                <button class="quick-add-btn" onclick="event.stopPropagation(); window.addToCart('${p.id}');">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </button>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${p.name}</h3>
                            <div class="price-row">
                                <span class="current-price">$${p.price}</span>
                                <span class="old-price">$${p.originalPrice}</span>
                            </div>
                        </div>
                    </div>`;
            });
        });

        initCarouselButtons();
    } catch (e) {
        // Network error — leave skeletons visible
        console.warn('Products fetch failed — skeletons remain visible:', e.message);
    }
}

async function renderProductPage(productId) {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    container.innerHTML = `
        <div class="pdp-page-wrapper">
            <div class="container">
                <div class="skeleton" style="height: 400px; width: 100%;"></div>
                <div class="skeleton" style="height: 200px; width: 100%; margin-top: 16px;"></div>
            </div>
        </div>
    `;

    try {
        const res = await fetch('/api/products');
        const products = await res.json();
        const p = products.find(i => i.id === productId);

        if (!p) {
            container.innerHTML = `<div class="pdp-page-wrapper" style="text-align:center; padding: 50px;"><h2>Product not found.</h2><a href="#home" style="color:var(--primary);">Return Home</a></div>`;
            return;
        }

        const savings = (p.originalPrice - p.price).toFixed(2);

        container.innerHTML = `
            <div class="pdp-page-wrapper">
                <div class="container">
                    
                    <!-- Breadcrumbs -->
                    <div class="breadcrumb-wrap">
                        <a href="#home">Home</a>
                        <i class="fa-solid fa-chevron-right"></i>
                        <a href="#categories?search=${encodeURIComponent(p.category)}">${p.category || 'Science & Tech'}</a>
                        <i class="fa-solid fa-chevron-right"></i>
                        <span class="breadcrumb-active">${p.name}</span>
                    </div>

                    <div class="pdp-grid">
                        
                        <!-- ===== LEFT: IMAGE GALLERY ===== -->
                        <div class="pdp-left">
                            <div class="pdp-card" style="padding:0;">
                                <div class="pdp-image-container">
                                    <button class="pdp-wishlist-btn" onclick="this.classList.toggle('active')">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                    <img id="pdp-main-img" src="${p.image}" alt="${p.name}">
                                </div>
                                <div class="pdp-thumb-row">
                                    ${(p.images && p.images.length > 0) 
                                        ? p.images.map((img, idx) => `
                                            <img class="pdp-thumb ${idx === 0 ? 'active' : ''}" 
                                                src="${img}" 
                                                onclick="document.getElementById('pdp-main-img').src=this.src; document.querySelectorAll('.pdp-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');"
                                                alt="Thumb ${idx + 1}">
                                          `).join('')
                                        : `
                                            <img class="pdp-thumb active" src="${p.image}" onclick="document.getElementById('pdp-main-img').src=this.src; document.querySelectorAll('.pdp-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
                                            <img class="pdp-thumb" src="${p.image}" style="filter:grayscale(1)" onclick="document.getElementById('pdp-main-img').src=this.src; document.querySelectorAll('.pdp-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
                                            <img class="pdp-thumb" src="${p.image}" style="filter:sepia(1)" onclick="document.getElementById('pdp-main-img').src=this.src; document.querySelectorAll('.pdp-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
                                          `
                                    }
                                </div>
                            </div>
                            
                            <!-- Share -->
                            <div class="pdp-card hidden-mobile" style="padding:0;">
                                <div class="pdp-section-title">SHARE THIS PRODUCT</div>
                                <div class="pdp-share-icons">
                                    <i class="fa-brands fa-facebook" style="color:#1877f2;"></i>
                                    <i class="fa-brands fa-twitter" style="color:#1da1f2;"></i>
                                    <i class="fa-brands fa-whatsapp" style="color:#25d366;"></i>
                                    <i class="fa-solid fa-link" style="color:#666;"></i>
                                </div>
                            </div>
                        </div>

                        <!-- ===== CENTER: PRODUCT INFO ===== -->
                        <div class="pdp-center">
                            <!-- Main Info Card -->
                            <div class="pdp-card">
                                <span style="display:inline-block; background:#e8f5e9; color:#2e7d32; font-size:.65rem; font-weight:700; padding:2px 8px; border-radius:4px; margin-bottom:8px; text-transform:uppercase; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid rgba(46,125,50,0.1); font-family:var(--font-main); letter-spacing: 0.5px;">${p.storeName || 'Official Store'}</span>
                                <h1 class="pdp-title-main">${p.name}</h1>
                                <div class="pdp-meta-row">
                                    <span>Brand: <a href="#categories?search=${encodeURIComponent(p.storeName || 'ScienceTech')}" style="color:var(--primary); font-weight:600;">${p.storeName || 'ScienceTech Official'}</a></span>
                                    <span style="color:#ddd;">|</span>
                                    <a href="#">Similar products from ScienceTech</a>
                                    <span style="color:#ddd;">|</span>
                                    <span>SKU: DS${p.id.toString().padStart(6,'0')}</span>
                                </div>

                                <div style="margin-top:12px; padding:14px 0; border-top:1px solid var(--border);">
                                    <div class="pdp-main-price">$${p.price}</div>
                                    <div class="pdp-old-price-box">
                                        <span class="pdp-old-price-val">$${p.originalPrice}</span>
                                        <span class="pdp-discount-tag">-${p.discount}%</span>
                                    </div>
                                    <div style="font-size:.7rem; color:#888; margin-top:4px;">You save $${savings}</div>
                                    <div class="pdp-stock-badge"><i class="fa-solid fa-circle-check"></i> In Stock</div>
                                    <div class="pdp-shipping-note">+ shipping from <b>$5.00</b> to your area</div>
                                </div>

                                <!-- Promotions -->
                                <div class="pdp-promo-strip">
                                    <div class="pdp-promo-header"><i class="fa-solid fa-tag" style="margin-right:6px;"></i> Promotions</div>
                                    <div class="pdp-promo-item"><i class="fa-solid fa-shield-halved"></i> <span><b>DropShop Protection:</b> Full refund if you don't receive your order</span></div>
                                    <div class="pdp-promo-item"><i class="fa-solid fa-truck-fast"></i> <span><b>Free Delivery</b> on orders above $100</span></div>
                                    <div class="pdp-promo-item"><i class="fa-solid fa-percent"></i> <span>Get <b>5% off</b> when you pay with Visa/Mastercard</span></div>
                                </div>

                                <!-- Quantity -->
                                <div class="pdp-qty-section">
                                    <div class="pdp-qty-label">Quantity:</div>
                                    <div class="pdp-qty-row">
                                        <button class="pdp-qty-btn" onclick="let v=document.getElementById('pdp-qty-input'); v.value=Math.max(1,parseInt(v.value)-1);">&#8722;</button>
                                        <input class="pdp-qty-val" id="pdp-qty-input" type="text" value="1" readonly>
                                        <button class="pdp-qty-btn" onclick="let v=document.getElementById('pdp-qty-input'); v.value=Math.min(10,parseInt(v.value)+1);">+</button>
                                    </div>
                                </div>

                                <!-- Desktop Add To Cart -->
                                <div class="hidden-mobile" style="margin-top:20px; display:flex; gap:10px;">
                                    <button class="pdp-btn-buy" onclick="window.addToCartQty('${p.id}', parseInt(document.getElementById('pdp-qty-input').value)||1)" style="height:48px; border-radius:4px; flex:1;">
                                        <i class="fa-solid fa-cart-shopping"></i> ADD TO CART
                                    </button>
                                    <button class="pdp-btn-call" onclick="alert('Saved!')" style="width:48px; height:48px;"><i class="fa-regular fa-heart"></i></button>
                                </div>
                            </div>

                            <!-- Product Details / Description -->
                            <div class="pdp-card" style="padding:0;">
                                <div class="pdp-section-title">Product Details</div>
                                <div class="pdp-section-body">
                                    ${p.description
                                        ? `<p style="white-space:pre-line; line-height:1.75; color:#475569;">${p.description}</p>`
                                        : `<p>Experience the next level of technology with the <b>${p.name}</b>. Designed for enthusiasts who value performance, innovation, and unique aesthetics.</p>
                                           <ul style="margin:12px 0; padding-left:18px; color:#555;">
                                               <li>Premium build quality with aerospace-grade materials</li>
                                               <li>Engineered for maximum performance and durability</li>
                                               <li>Compatible with all modern devices and platforms</li>
                                               <li>Eco-friendly packaging and sustainable sourcing</li>
                                           </ul>`
                                    }
                                </div>
                            </div>

                            <div class="pdp-card" style="padding:0;">
                                <div class="pdp-section-title">Key Features & Specifications</div>
                                <table class="pdp-spec-table">
                                    <tr><td>Brand</td><td>${p.storeName || 'ScienceTech Official'}</td></tr>
                                    <tr><td>Model Name</td><td>${p.name}</td></tr>
                                    <tr><td>Product Category</td><td>${p.category || 'Gadgets'}</td></tr>
                                    <tr><td>Warranty Period</td><td>${p.warranty || '12 Months Manufacturer Warranty'}</td></tr>
                                    <tr><td>Physical Weight</td><td>${p.weight || '0.5kg'}</td></tr>
                                    <tr><td>Standard Color</td><td>${p.color || 'Cosmic Black'}</td></tr>
                                    <tr><td>In the Box</td><td>${p.inTheBox || '1x ' + p.name + ', User Manual, Warranty Card'}</td></tr>
                                </table>
                            </div>

                            </div>
                        </div>

                        <!-- ===== RIGHT: SIDEBAR (PC ONLY) ===== -->
                        <div class="pdp-right hidden-mobile">
                            <!-- Delivery Card -->
                            <div class="pdp-card delivery-card">
                                <div class="delivery-card-title">DELIVERY & RETURNS</div>
                                <div class="delivery-row">
                                    <i class="fa-solid fa-map-pin"></i>
                                    <div class="delivery-info">
                                        <h4>Choose your Location</h4>
                                        <a href="#">Lagos, Ikeja - Change</a>
                                    </div>
                                </div>
                                <div class="delivery-row">
                                    <i class="fa-solid fa-truck"></i>
                                    <div class="delivery-info">
                                        <h4>Door Delivery</h4>
                                        <p>Delivery Fees $5.00</p>
                                        <p>Ready for delivery between <b>24 Apr</b> and <b>27 Apr</b></p>
                                    </div>
                                </div>
                                <div class="delivery-row">
                                    <i class="fa-solid fa-store"></i>
                                    <div class="delivery-info">
                                        <h4>Pickup Station</h4>
                                        <p>Pickup Fees $3.00</p>
                                        <p>Ready for pickup between <b>23 Apr</b> and <b>26 Apr</b></p>
                                    </div>
                                </div>
                                <div class="delivery-row">
                                    <i class="fa-solid fa-rotate-left"></i>
                                    <div class="delivery-info">
                                        <h4>Return Policy</h4>
                                        <p>Free return within 15 days for eligible items. <a href="#">Details</a></p>
                                    </div>
                                </div>
                                <div class="delivery-row">
                                    <i class="fa-solid fa-shield-check" style="color:#16a34a;"></i>
                                    <div class="delivery-info">
                                        <h4>Warranty</h4>
                                        <p>12 months manufacturer warranty</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Seller Card -->
                            <div class="pdp-card" style="padding:0;">
                                <div class="delivery-card-title">SELLER INFORMATION</div>
                                <div class="seller-card-body">
                                    <div class="seller-name-row">
                                        <span class="seller-name">DropShop Science</span>
                                        <a href="#" class="seller-link">View Store &rarr;</a>
                                    </div>
                                    <div class="seller-stats">
                                        <div class="seller-stat-item">
                                            <span class="seller-stat-val">92%</span>
                                            <span class="seller-stat-label">Seller Score</span>
                                        </div>
                                        <div class="seller-stat-item">
                                            <span class="seller-stat-val">96%</span>
                                            <span class="seller-stat-label">Ship on Time</span>
                                        </div>
                                        <div class="seller-stat-item">
                                            <span class="seller-stat-val">4.7</span>
                                            <span class="seller-stat-label">Quality Score</span>
                                        </div>
                                        <div class="seller-stat-item">
                                            <span class="seller-stat-val">1.2k</span>
                                            <span class="seller-stat-label">Followers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- ===== CUSTOMERS ALSO VIEWED ===== -->
                    <div class="pdp-card" style="padding:0; margin-top:20px;">
                        <div class="pdp-section-title" style="display:flex; justify-content:space-between; align-items:center;">
                            <span>CUSTOMERS WHO VIEWED THIS ALSO VIEWED</span>
                            <a href="#home" style="color:#2b7de9; font-size:.7rem; text-decoration:none;">SEE ALL &rarr;</a>
                        </div>
                        <div id="similar-container" style="display:flex; overflow-x:auto; padding:12px; gap:10px; scroll-snap-type:x mandatory;">
                        </div>
                    </div>

                </div>
            </div>

            <!-- MOBILE STICKY FOOTER -->
            <div class="pdp-mobile-actions">
                <a href="tel:555123456" class="pdp-btn-call">
                    <i class="fa-solid fa-phone"></i>
                </a>
                <button class="pdp-btn-buy" onclick="window.addToCartQty('${p.id}', parseInt(document.getElementById('pdp-qty-input').value)||1)">
                    <i class="fa-solid fa-cart-shopping"></i> ADD TO CART
                </button>
            </div>
        `;
        
        // Populate similar products with enhanced cards
        const similarContainer = document.getElementById('similar-container');
        const similarProducts = products.filter(item => item.id !== p.id).slice(0, 8);
        
        similarContainer.innerHTML = similarProducts.map(sp => {
            const spStars = '<i class="fa-solid fa-star"></i>'.repeat(Math.floor(sp.rating)) + '<i class="fa-regular fa-star"></i>'.repeat(5 - Math.floor(sp.rating));
            return `
            <div class="pdp-similar-card" onclick="window.location.hash='#product?id=${sp.id}'">
                <img class="pdp-similar-img" src="${sp.image}" alt="${sp.name}">
                <div class="pdp-similar-info">
                    <div class="pdp-similar-name">${sp.name}</div>
                    <div>
                        <span class="pdp-similar-price">$${sp.price}</span>
                        <span class="pdp-similar-old">$${sp.originalPrice}</span>
                        <span class="pdp-similar-discount">-${sp.discount}%</span>
                    </div>
                </div>
            </div>`;
        }).join('');

    } catch(e) {
        console.error(e);
        container.innerHTML = '<div class="container" style="padding:40px; text-align:center;"><h2>Error loading product</h2><a href="#home" class="btn btn-primary">Back to Home</a></div>';
    }
}


async function renderCategoryPage() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    // Get search query from hash if present
    const hash = window.location.hash;
    const searchParam = new URLSearchParams(hash.split('?')[1] || '').get('search');

    const categoriesData = {
        'Supermarket': [
            { name: 'Grains & Pasta', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100' },
            { name: 'Beverages', img: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=100' },
            { name: 'Snacks', img: 'https://images.unsplash.com/photo-1599490659223-23b6d4412f6d?w=100' }
        ],
        'Health & Beauty': [
            { name: 'Skincare', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100' },
            { name: 'Makeup', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100' },
            { name: 'Fragrances', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=100' }
        ],
        'Home & Office': [
            { name: 'Furniture', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100' },
            { name: 'Kitchen & Dining', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=100' },
            { name: 'Lighting', img: 'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?w=100' }
        ],
        'Phones & Tablets': [
            { name: 'Mobile Phones', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100' },
            { name: 'Tablets', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100' },
            { name: 'Accessories', img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=100' }
        ],
        'Computing': [
            { name: 'Laptops', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100' },
            { name: 'Desktops', img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=100' },
            { name: 'Printers', img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=100' }
        ],
        'Electronics': [
            { name: 'Television', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100' },
            { name: 'Audio & HiFi', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
            { name: 'Cameras', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100' }
        ],
        'Fashion': [
            { name: 'Men\'s Wear', img: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=100' },
            { name: 'Women\'s Wear', img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=100' },
            { name: 'Shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c2741?w=100' }
        ]
    };

    if (searchParam) {
        try {
            const res = await fetch('/api/products');
            const products = await res.json();
            const filtered = products.filter(p => p.name.toLowerCase().includes(searchParam.toLowerCase()));

            container.innerHTML = `
                <div class="container" style="padding:40px 16px;">
                    <h2 style="margin-bottom:20px;">Results for "${searchParam}" (${filtered.length})</h2>
                    <div class="product-container-target" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:20px;">
                        ${filtered.length > 0 
                            ? filtered.map(p => {
                                return `
                                <div class="product-card" onclick="window.location.hash='#product?id=${p.id}'">
                                    <div class="product-img">
                                        <span class="discount-badge">-${p.discount}%</span>
                                        <img src="${p.image}" alt="${p.name}">
                                    </div>
                                    <div class="product-info">
                                        <h3 class="product-title">${p.name}</h3>
                                        <div class="price-row"><span class="current-price">$${p.price}</span></div>
                                    </div>
                                </div>`;
                            }).join('')
                            : `<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:#94a3b8;">
                                <i class="fa-solid fa-magnifying-glass" style="font-size:3rem; margin-bottom:16px; opacity:.3;"></i>
                                <p style="font-size:1.1rem; font-weight:600;">No products found for "${searchParam}"</p>
                                <p style="font-size:.9rem; margin-top:8px;">Try checking your spelling or use different keywords.</p>
                                <a href="#home" class="btn btn-primary" style="display:inline-block; margin-top:24px;">Return Home</a>
                               </div>`
                        }
                    </div>
                </div>
            `;
            return;
        } catch(e) { console.error(e); }
    }

    const rootCats = Object.keys(categoriesData);
    const renderGrid = (catName) => {
        const items = categoriesData[catName] || [];
        return items.map(item => `
            <div class="cat-item">
                <img src="${item.img}" alt="${item.name}">
                <span>${item.name}</span>
            </div>
        `).join('');
    };

    const renderSidebar = (activeCat) => {
        return rootCats.map(cat => `
            <div class="cat-tab ${cat === activeCat ? 'active' : ''}" data-cat="${cat}">
                ${cat}
            </div>
        `).join('');
    };

    container.innerHTML = `
        <div class="cat-page-container">
            <div class="cat-sidebar" id="cat-sidebar">
                ${renderSidebar(rootCats[0])}
            </div>
            <div class="cat-content" id="cat-content">
                <h3 class="cat-grid-title">${rootCats[0]}</h3>
                <div class="cat-grid" id="cat-grid">
                    ${renderGrid(rootCats[0])}
                </div>
            </div>
        </div>
    `;

    const sidebar = document.getElementById('cat-sidebar');
    sidebar?.addEventListener('click', (e) => {
        const tab = e.target.closest('.cat-tab');
        if (!tab) return;
        const catName = tab.dataset.cat;
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const catContent = document.getElementById('cat-content');
        if (catContent) {
            catContent.innerHTML = `
                <h3 class="cat-grid-title">${catName}</h3>
                <div class="cat-grid" id="cat-grid">
                    ${renderGrid(catName)}
                </div>
            `;
        }
    });
}

function renderTrackOrderPage() {
    return `
    <div class="static-page container" style="padding:50px 16px 80px; max-width:680px; margin:0 auto;">
        <div style="text-align:center; margin-bottom:40px;">
            <div style="display:inline-flex; align-items:center; justify-content:center; width:72px; height:72px; background:linear-gradient(135deg,#f68b1e,#e55b00); border-radius:50%; margin-bottom:16px;">
                <i class="fa-solid fa-truck-fast" style="font-size:1.8rem; color:#fff;"></i>
            </div>
            <h1 style="font-size:2rem; font-weight:800; color:#1e293b;">Track My Order</h1>
            <p style="color:#64748b;">Enter your order ID to see the latest delivery status.</p>
        </div>

        <div class="static-section">
            <div style="display:flex; gap:10px; margin-bottom:20px;">
                <input type="text" id="trackId" placeholder="e.g. 663abc1234def0000012..." style="flex:1; padding:12px 16px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:.9rem; outline:none;">
                <button onclick="window._trackOrder()" class="btn btn-primary" style="padding:12px 20px; border-radius:10px; white-space:nowrap;">
                    <i class="fa-solid fa-magnifying-glass"></i> Track
                </button>
            </div>
            <div id="trackResult"></div>
        </div>

        <div class="static-section" style="margin-top:16px;">
            <h2 style="margin-bottom:14px;">Need More Help?</h2>
            <p>If you can't find your order ID, check the confirmation email we sent you, or <a href="#account" style="color:var(--primary); font-weight:600;">visit My Account</a> to view all your orders.</p>
            <p style="margin-top:10px;">Still having trouble? <a href="#contact" style="color:var(--primary); font-weight:600;">Contact our support team</a> — we're happy to help!</p>
        </div>
    </div>`;
}

// Exposed globally for inline onclick in track page
window._trackOrder = async () => {
    const id = document.getElementById('trackId').value.trim();
    const result = document.getElementById('trackResult');
    if (!id) { result.innerHTML = '<p style="color:#ef4444; font-weight:600;">Please enter an order ID.</p>'; return; }
    result.innerHTML = '<p style="color:#64748b;"><i class="fa-solid fa-spinner fa-spin"></i> Looking up order...</p>';
    try {
        const res = await fetch(`/api/orders/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('dropshop_token') || ''}` } });
        if (!res.ok) throw new Error('Order not found');
        const order = await res.json();
        const statusColor = order.isDelivered ? '#16a34a' : order.isPaid ? '#2563eb' : '#f68b1e';
        const statusText  = order.isDelivered ? '✅ Delivered' : order.isPaid ? '📦 Paid & Processing' : '⏳ Pending Payment';
        result.innerHTML = `
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:20px;">
                <div style="font-weight:700; font-size:1.1rem; color:${statusColor}; margin-bottom:12px;">${statusText}</div>
                <div style="font-size:.85rem; color:#475569; line-height:2;">
                    <div><strong>Order ID:</strong> ${order._id}</div>
                    <div><strong>Items:</strong> ${order.orderItems.map(i => i.name + ' x' + i.qty).join(', ')}</div>
                    <div><strong>Total:</strong> $${order.totalPrice.toFixed(2)}</div>
                    <div><strong>Ship To:</strong> ${order.shippingAddress.address}, ${order.shippingAddress.city}</div>
                    <div><strong>Placed On:</strong> ${new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
            </div>
        `;
    } catch {
        result.innerHTML = '<p style="color:#ef4444; font-weight:600;">❌ Order not found. Please check your order ID and try again.</p>';
    }
};

// Global scope attachment for inline onclick handlers

window.addToCart = async (productId) => {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();
        const p = products.find(i => i.id === productId);
        if (p) Cart.add(p);
    } catch(e) { console.error('Error adding to cart', e); }
};

window.addToCartQty = async (productId, qty = 1) => {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();
        const p = products.find(i => i.id === productId);
        if (p) Cart.add(p, qty);
    } catch(e) { console.error('Error adding to cart', e); }
};

window.renderCartPage = () => {
    const container = document.getElementById('cart-container');
    if (!container) return;

    const items = Cart.getAll();
    
    if (items.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 60px 20px;">
                <i class="fa-solid fa-cart-shopping" style="font-size:3rem; color:#ccc; margin-bottom:15px;"></i>
                <h2>Your cart is empty!</h2>
                <p style="color:var(--muted); margin-bottom:20px;">Browse our categories and discover our best deals!</p>
                <a href="#home" class="btn" style="background:var(--primary); color:#fff;">Start Shopping</a>
            </div>
        `;
        return;
    }

    let itemsHtml = items.map(i => `
        <div style="display:flex; gap:15px; padding:15px; border:1px solid var(--border); border-radius:8px; margin-bottom:12px; background:#fff;">
            <img src="${i.image}" alt="${i.name}" style="width:80px; height:80px; object-fit:cover; border-radius:6px;">
            <div style="flex:1;">
                <h4 style="font-size:.9rem; line-height:1.2; margin-bottom:6px;">${i.name}</h4>
                <div style="color:var(--primary); font-weight:700; margin-bottom:10px;">$${i.price}</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <a href="#" onclick="event.preventDefault(); Cart.remove('${i.id}'); window.renderCartPage();" style="color:var(--primary); font-size:.8rem; font-weight:600;"><i class="fa-solid fa-trash"></i> Remove</a>
                    <div style="display:flex; align-items:center; gap:10px; border:1px solid #ccc; border-radius:4px; padding:2px 6px;">
                        <button onclick="Cart.updateQty('${i.id}', ${i.qty - 1}); window.renderCartPage();" style="background:none; border:none; cursor:pointer;"><i class="fa-solid fa-minus" style="font-size:.7rem; color: #555"></i></button>
                        <span style="font-size:.9rem; min-width:20px; text-align:center;">${i.qty}</span>
                        <button onclick="Cart.updateQty('${i.id}', ${i.qty + 1}); window.renderCartPage();" style="background:none; border:none; cursor:pointer;"><i class="fa-solid fa-plus" style="font-size:.7rem; color: #555"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <h2 style="margin-bottom:20px;"><i class="fa-solid fa-cart-shopping"></i> Shopping Cart (${Cart.count()} items)</h2>
        <div style="display:grid; grid-template-columns: 1fr; gap: 20px;">
            <div class="cart-items">
                ${itemsHtml}
            </div>
            <div class="cart-summary" style="background:#fff; border:1px solid var(--border); border-radius:8px; padding:20px; align-self:start; position:sticky; top:80px;">
                <h3 style="margin-bottom:15px; font-size:1rem; border-bottom:1px solid var(--border); padding-bottom:10px;">Cart Summary</h3>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:.9rem;">
                    <span>Subtotal</span>
                    <span style="font-weight:700;">$${Cart.total()}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:.9rem;">
                    <span>Delivery</span>
                    <span style="color:var(--muted);">Calculated next step</span>
                </div>
                <a href="#checkout" class="btn" style="background:var(--primary); color:#fff; width:100%; justify-content:center; padding:12px;">Checkout ($${Cart.total()})</a>
            </div>
        </div>
    `;

    // Make it 2 column on Desktop
    if (window.innerWidth > 768) {
        container.querySelector('div[style*="display:grid"]').style.gridTemplateColumns = '2fr 1fr';
    }
};

// ---- Checkout State ---- //
window.checkoutStep = 1;
window.checkoutData = {
    shipping: { firstName: '', lastName: '', address: '', city: '', phone: '', email: '' },
    paymentMethod: 'paystack'
};

window.renderCheckoutPage = () => {
    const container = document.getElementById('checkout-container');
    if (!container) return;

    if (Cart.count() === 0 && window.checkoutStep !== 3) {
        window.location.hash = '#cart';
        return;
    }

    const total = (parseFloat(Cart.total()) + 5).toFixed(2);
    
    // Step indicator HTML
    const stepsHtml = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; position:relative;">
            <div style="text-align:center; flex:1; z-index:2;">
                <div style="width:30px; height:30px; background:${window.checkoutStep >= 1 ? 'var(--primary)' : '#ddd'}; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 5px; font-weight:700;">1</div>
                <div style="font-size:.75rem; font-weight:${window.checkoutStep === 1 ? '700' : '500'}; color:${window.checkoutStep >= 1 ? 'var(--dark)' : '#aaa'};">Shipping</div>
            </div>
            <div style="text-align:center; flex:1; z-index:2;">
                <div style="width:30px; height:30px; background:${window.checkoutStep >= 2 ? 'var(--primary)' : '#ddd'}; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 5px; font-weight:700;">2</div>
                <div style="font-size:.75rem; font-weight:${window.checkoutStep === 2 ? '700' : '500'}; color:${window.checkoutStep >= 2 ? 'var(--dark)' : '#aaa'};">Payment</div>
            </div>
            <div style="text-align:center; flex:1; z-index:2;">
                <div style="width:30px; height:30px; background:${window.checkoutStep >= 3 ? 'var(--primary)' : '#ddd'}; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 5px; font-weight:700;">3</div>
                <div style="font-size:.75rem; font-weight:${window.checkoutStep === 3 ? '700' : '500'}; color:${window.checkoutStep >= 3 ? 'var(--dark)' : '#aaa'};">Confirm</div>
            </div>
            <div style="position:absolute; top:15px; left:15%; right:15%; height:2px; background:#eee; z-index:1;">
                <div style="height:100%; width:${(window.checkoutStep - 1) * 50}%; background:var(--primary); transition:width .3s;"></div>
            </div>
        </div>
    `;

    if (window.checkoutStep === 1) {
        // STEP 1: SHIPPING
        container.innerHTML = `
            <div style="max-width:800px; margin:0 auto;">
                ${stepsHtml}
                <div style="background:#fff; padding:25px; border:1px solid var(--border); border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.02);">
                    <h3 style="margin-bottom:20px; border-bottom:1px solid var(--border); padding-bottom:10px; font-weight:800;">Shipping Address</h3>
                    <form onsubmit="event.preventDefault(); window._goToPayment();">
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                            <div>
                                <label style="display:block; font-size:.8rem; margin-bottom:5px; font-weight:600;">First Name</label>
                                <input type="text" id="ship-first" value="${window.checkoutData.shipping.firstName}" required style="width:100%; padding:11px; border:1.5px solid #e2e8f0; border-radius:8px; outline:none;">
                            </div>
                            <div>
                                <label style="display:block; font-size:.8rem; margin-bottom:5px; font-weight:600;">Last Name</label>
                                <input type="text" id="ship-last" value="${window.checkoutData.shipping.lastName}" required style="width:100%; padding:11px; border:1.5px solid #e2e8f0; border-radius:8px; outline:none;">
                            </div>
                        </div>
                        <div style="margin-bottom:15px;">
                            <label style="display:block; font-size:.8rem; margin-bottom:5px; font-weight:600;">Email Address</label>
                            <input type="email" id="ship-email" value="${window.checkoutData.shipping.email || ''}" required placeholder="For order updates" style="width:100%; padding:11px; border:1.5px solid #e2e8f0; border-radius:8px; outline:none;">
                        </div>
                        <div style="margin-bottom:15px;">
                            <label style="display:block; font-size:.8rem; margin-bottom:5px; font-weight:600;">Full Address</label>
                            <input type="text" id="ship-addr" value="${window.checkoutData.shipping.address}" required style="width:100%; padding:11px; border:1.5px solid #e2e8f0; border-radius:8px; outline:none;">
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:25px;">
                            <div>
                                <label style="display:block; font-size:.8rem; margin-bottom:5px; font-weight:600;">City</label>
                                <input type="text" id="ship-city" value="${window.checkoutData.shipping.city}" required style="width:100%; padding:11px; border:1.5px solid #e2e8f0; border-radius:8px; outline:none;">
                            </div>
                            <div>
                                <label style="display:block; font-size:.8rem; margin-bottom:5px; font-weight:600;">Phone Number</label>
                                <input type="tel" id="ship-phone" value="${window.checkoutData.shipping.phone}" required style="width:100%; padding:11px; border:1.5px solid #e2e8f0; border-radius:8px; outline:none;">
                            </div>
                        </div>

                        <div style="background:#f8fafc; padding:20px; border-radius:12px; margin-bottom:25px; border:1px solid #f1f5f9;">
                            <h4 style="font-size:.9rem; margin-bottom:15px; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-receipt text-primary"></i> Order Summary</h4>
                            <div style="display:flex; justify-content:space-between; font-size:.85rem; margin-bottom:8px; color:#64748b;">
                                <span>Items Subtotal</span>
                                <span>$${Cart.total()}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:.85rem; margin-bottom:12px; color:#64748b;">
                                <span>Flat Delivery Fee</span>
                                <span>$5.00</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:1.1rem; font-weight:800; border-top:1px solid #e2e8f0; padding-top:12px; color:var(--dark);">
                                <span>Order Total</span>
                                <span style="color:var(--primary);">$${total}</span>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; padding:15px; font-size:1rem; border-radius:10px;">
                            CONTINUE TO PAYMENT <i class="fa-solid fa-arrow-right" style="margin-left:10px; font-size:.8rem;"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;
    } 
    else if (window.checkoutStep === 2) {
        // STEP 2: PAYMENT
        container.innerHTML = `
            <div style="max-width:800px; margin:0 auto;">
                ${stepsHtml}
                <div style="background:#fff; padding:25px; border:1px solid var(--border); border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.02);">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:20px; border-bottom:1px solid var(--border); padding-bottom:10px;">
                        <button onclick="window.checkoutStep=1; window.renderCheckoutPage();" style="background:none; border:none; color:var(--primary); cursor:pointer;"><i class="fa-solid fa-arrow-left"></i></button>
                        <h3 style="font-weight:800;">Payment Method</h3>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:30px;">
                        <!-- Paystack Option -->
                        <label class="payment-option" style="display:flex; align-items:center; gap:15px; padding:18px; border:2px solid ${window.checkoutData.paymentMethod === 'paystack' ? 'var(--primary)' : '#f1f5f9'}; border-radius:12px; cursor:pointer; transition:all .2s; background:${window.checkoutData.paymentMethod === 'paystack' ? '#f0fdf4' : '#fff'};">
                            <input type="radio" name="payMethod" value="paystack" ${window.checkoutData.paymentMethod === 'paystack' ? 'checked' : ''} onchange="window.checkoutData.paymentMethod='paystack'; window.renderCheckoutPage();" style="accent-color:var(--primary); width:18px; height:18px;">
                            <div style="flex:1;">
                                <div style="font-weight:700; font-size:.95rem; display:flex; align-items:center; gap:8px;">Card / Bank / USSD <span style="font-size:.65rem; background:#2563eb; color:#fff; padding:2px 6px; border-radius:4px;">Secure by Paystack</span></div>
                                <div style="font-size:.75rem; color:#64748b; margin-top:2px;">Fast and secure payment with your local or international card.</div>
                            </div>
                            <i class="fa-solid fa-credit-card" style="font-size:1.4rem; color:#64748b;"></i>
                        </label>

                        <!-- COD Option -->
                        <label class="payment-option" style="display:flex; align-items:center; gap:15px; padding:18px; border:2px solid ${window.checkoutData.paymentMethod === 'cod' ? 'var(--primary)' : '#f1f5f9'}; border-radius:12px; cursor:pointer; transition:all .2s; background:${window.checkoutData.paymentMethod === 'cod' ? '#f0fdf4' : '#fff'};">
                            <input type="radio" name="payMethod" value="cod" ${window.checkoutData.paymentMethod === 'cod' ? 'checked' : ''} onchange="window.checkoutData.paymentMethod='cod'; window.renderCheckoutPage();" style="accent-color:var(--primary); width:18px; height:18px;">
                            <div style="flex:1;">
                                <div style="font-weight:700; font-size:.95rem;">Cash on Delivery (COD)</div>
                                <div style="font-size:.75rem; color:#64748b; margin-top:2px;">Pay when the rider arrives at your doorstep.</div>
                            </div>
                            <i class="fa-solid fa-money-bill-wave" style="font-size:1.4rem; color:#64748b;"></i>
                        </label>
                    </div>

                    <div style="background:#f8fafc; padding:20px; border-radius:12px; margin-bottom:25px; border:1px solid #f1f5f9;">
                        <div style="display:flex; justify-content:space-between; font-size:1.1rem; font-weight:800; color:var(--dark);">
                            <span>Total Payable</span>
                            <span style="color:var(--primary);">$${total}</span>
                        </div>
                    </div>

                    <button onclick="window._processOrder()" id="payBtn" class="btn btn-primary" style="width:100%; justify-content:center; padding:15px; font-size:1.1rem; border-radius:10px;">
                        ${window.checkoutData.paymentMethod === 'paystack' ? 'PAY NOW - $' + total : 'CONFIRM ORDER'}
                    </button>
                    <p style="text-align:center; font-size:.7rem; color:#94a3b8; margin-top:12px;"><i class="fa-solid fa-lock"></i> SSL Secured Payment Encryption</p>
                </div>
            </div>
        `;
    }
    else if (window.checkoutStep === 3) {
        // STEP 3: SUCCESS
        container.innerHTML = `
            <div style="max-width:600px; margin:40px auto; text-align:center; padding:40px 20px; background:#fff; border-radius:20px; box-shadow:0 10px 40px rgba(0,0,0,0.05); border:1px solid #f1f5f9;">
                <div style="width:80px; height:80px; background:var(--primary); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; font-size:2.5rem; box-shadow:0 8px 16px rgba(22, 163, 74, 0.2);">
                    <i class="fa-solid fa-check"></i>
                </div>
                <h1 style="font-size:2rem; font-weight:800; color:var(--dark); margin-bottom:10px;">Order Successful!</h1>
                <p style="color:#64748b; font-size:1rem; line-height:1.6;">Thank you for your purchase, <strong>${window.checkoutData.shipping.firstName}</strong>! Your order has been placed and is being processed.</p>
                
                <div style="margin:30px 0; padding:20px; background:#f8fafc; border-radius:12px; border:1px dashed #cbd5e1; text-align:left;">
                    <div style="font-size:.8rem; color:#64748b; margin-bottom:4px;">Your Order ID</div>
                    <div id="order-id-display" style="font-family:monospace; font-weight:700; color:var(--primary); font-size:1.2rem;">#${window.checkoutOrderId || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </div>

                <div style="display:flex; flex-direction:column; gap:12px;">
                    <a href="#home" class="btn btn-primary" style="justify-content:center; padding:15px; border-radius:10px;">Continue Shopping</a>
                    <a href="#track" class="btn" onclick="window.checkoutStep=1" style="justify-content:center; padding:15px; border-radius:10px; background:#f1f5f9; color:#475569;">Track My Order</a>
                </div>
                <p style="margin-top:20px; font-size:.8rem; color:#94a3b8;">A confirmation email has been sent to ${window.checkoutData.shipping.email}</p>
            </div>
        `;
    }
};

// ---- Checkout Actions ---- //
window._goToPayment = () => {
    window.checkoutData.shipping = {
        firstName: document.getElementById('ship-first').value,
        lastName:  document.getElementById('ship-last').value,
        email:     document.getElementById('ship-email').value,
        address:   document.getElementById('ship-addr').value,
        city:      document.getElementById('ship-city').value,
        phone:     document.getElementById('ship-phone').value,
    };
    window.checkoutStep = 2;
    window.renderCheckoutPage();
};

window._processOrder = async () => {
    const payBtn = document.getElementById('payBtn');
    payBtn.disabled = true;
    payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

    if (window.checkoutData.paymentMethod === 'paystack') {
        window._initPaystack();
    } else {
        // COD path
        const orderId = await window._createOrderInBackend(false);
        if (orderId) {
            window.checkoutOrderId = orderId;
            window.checkoutStep = 3;
            Cart.clear();
            window.renderCheckoutPage();
        } else {
            payBtn.disabled = false;
            payBtn.textContent = 'CONFIRM ORDER';
        }
    }
};

window._createOrderInBackend = async (isPaid = false) => {
    try {
        const payload = {
            orderItems: Cart.getAll().map(i => ({
                name: i.name,
                qty: i.qty,
                image: i.image,
                price: i.price,
                product: i.id
            })),
            shippingAddress: {
                address: window.checkoutData.shipping.address,
                city: window.checkoutData.shipping.city,
                phone: window.checkoutData.shipping.phone
            },
            totalPrice: parseFloat(Cart.total()) + 5,
            isPaid: isPaid
        };

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const data = await res.json();
            return data._id;
        } else {
            alert('Failed to save order to database.');
            return null;
        }
    } catch (e) {
        console.error(e);
        alert('Network error while saving order.');
        return null;
    }
};

window._initPaystack = () => {
    const total = (parseFloat(Cart.total()) + 5).toFixed(2);
    const amountInKobo = total * 100;
    
    // REPLACE THIS with your actual Paystack Public Key
    const PAYSTACK_PUBLIC_KEY = 'pk_test_4f9231454657159020473a213e43210987654321'; // Placeholder

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY, 
        email: window.checkoutData.shipping.email,
        amount: amountInKobo,
        currency: "NGN", // Change to USD or your currency if supported by your Paystack account
        ref: 'ORD_' + Math.floor((Math.random() * 1000000000) + 1),
        callback: async function(response) {
            // Payment successful
            const orderId = await window._createOrderInBackend(true);
            if (orderId) {
                window.checkoutOrderId = orderId;
                window.checkoutStep = 3;
                Cart.clear();
                window.renderCheckoutPage();
            }
        },
        onClose: function() {
            const payBtn = document.getElementById('payBtn');
            payBtn.disabled = false;
            payBtn.textContent = 'PAY NOW - $' + total;
            alert('Payment window closed.');
        }
    });
    handler.openIframe();
};

// ======================================================
//  GLOBAL UI HANDLERS (Used in HTML strings)
// ======================================================

window.addToCart = async (productId) => {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();
        const p = products.find(i => i.id === productId);
        if (p) Cart.add(p, 1);
    } catch (e) { console.error('Quick Add failed', e); }
};

window.addToCartQty = async (productId, qty) => {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();
        const p = products.find(i => i.id === productId);
        if (p) Cart.add(p, qty);
    } catch (e) { console.error('PDP Add failed', e); }
};
