const SLIDES = [
    {
        bg: 'linear-gradient(120deg, #f68b1e 0%, #e55b00 100%)', // Jumia Orange Theme
        badge: '🛒 Supermarket Deals',
        heading: 'Daily Essentials',
        subheading: 'Groceries and household items delivered to your doorstep.',
        cta: 'Shop Groceries',
        img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'
    },
    {
        bg: 'linear-gradient(120deg, #2b7de9 0%, #1a56b0 100%)', // Tech Blue
        badge: '📱 Latest Technology',
        heading: 'Phones & Tablets',
        subheading: 'Discover the newest smartphones with best prices.',
        cta: 'Explore Tech',
        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
    },
    {
        bg: 'linear-gradient(120deg, #0ba360 0%, #3cba92 100%)', // Fresh Home
        badge: '🏠 Home & Office',
        heading: 'Better Living',
        subheading: 'Top quality furniture and appliances for your space.',
        cta: 'Shop Home',
        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
    },
    {
        bg: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
        badge: '✨ Global Fashion',
        heading: 'Vogue Trends',
        subheading: 'Step out in style with our latest apparel collection.',
        cta: 'Shop Fashion',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    }
];

const CATEGORIES = [
    { imgUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100', label: 'Supermarket' },
    { imgUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=100', label: 'Health & Beauty' },
    { imgUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100', label: 'Home & Office' },
    { imgUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100', label: 'Phones & Tablets' },
    { imgUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100', label: 'Computing' },
    { imgUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=100', label: 'Electronics' },
    { imgUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100', label: 'Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=100', label: 'Baby Products' },
    { imgUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100', label: 'Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1461896736544-7c9c803958f7?w=100', label: 'Sporting Goods' },
];

export function Hero() {
    return `
    <section class="hero-section-wrapper">
        <div class="hero-grid">

            <!-- LEFT: 2 Animated Flyer Cards -->
            <div class="hero-promos hidden-mobile">
                <div class="flyer-card flyer-market" style="background: linear-gradient(to bottom, #d97706, #b45309);">
                    <div class="flyer-glow"></div>
                    <div class="flyer-icon"><i class="fa-solid fa-basket-shopping"></i></div>
                    <div class="flyer-badge">🛒 Supermarket</div>
                    <div class="flyer-title">Everyday<br>Essentials</div>
                    <div class="flyer-sub">Fresh items daily</div>
                    <a href="#categories" class="flyer-btn">Shop Now →</a>
                </div>
                <div class="flyer-card flyer-vogue" style="background: linear-gradient(to bottom, #db2777, #be185d);">
                    <div class="flyer-glow"></div>
                    <div class="flyer-icon"><i class="fa-solid fa-gem"></i></div>
                    <div class="flyer-badge">👗 Vogue</div>
                    <div class="flyer-title">Global<br>Fashion</div>
                    <div class="flyer-sub">Style for everyone</div>
                    <a href="#categories" class="flyer-btn">Shop Now →</a>
                </div>
            </div>

            <!-- CENTER: Auto-sliding Banner -->
            <div class="hero-slider" id="heroSlider">
                ${SLIDES.map((s, i) => `
                <div class="slide ${i === 0 ? 'active' : ''}" style="background:${s.bg};">
                    <div class="slide-text">
                        <span class="slide-badge">${s.badge}</span>
                        <h1 class="slide-heading">${s.heading}</h1>
                        <p class="slide-sub">${s.subheading}</p>
                        <a href="#" class="btn btn-light slide-cta">${s.cta} <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div class="slide-img">
                        <img src="${s.img}" alt="${s.heading}" loading="lazy">
                    </div>
                </div>`).join('')}

                <button class="slide-arrow left" id="slidePrev" aria-label="Previous">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="slide-arrow right" id="slideNext" aria-label="Next">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <div class="slide-dots">
                    ${SLIDES.map((_, i) => `<span class="sdot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`).join('')}
                </div>
            </div>

            <!-- RIGHT: 2 Animated Flyer Cards -->
            <div class="hero-promos hidden-mobile">
                <div class="flyer-card flyer-deals" style="background: linear-gradient(to bottom, #f97316, #ea580c);">
                    <div class="flyer-glow"></div>
                    <div class="flyer-icon"><i class="fa-solid fa-bolt"></i></div>
                    <div class="flyer-badge">⚡ Flash Sale</div>
                    <div class="flyer-title">Up to<br>50% OFF</div>
                    <div class="flyer-sub">Top brands on sale</div>
                    <a href="#categories" class="flyer-btn" style="background: var(--accent); color: var(--secondary);">Grab Deal →</a>
                </div>
                <div class="flyer-card flyer-tech" style="background: linear-gradient(to bottom, #2563eb, #1d4ed8);">
                    <div class="flyer-glow"></div>
                    <div class="flyer-icon"><i class="fa-solid fa-laptop"></i></div>
                    <div class="flyer-badge">💻 Tech Hub</div>
                    <div class="flyer-title">Premium<br>Electronics</div>
                    <div class="flyer-sub">Smartphones & Computers</div>
                    <a href="#categories" class="flyer-btn">Explore →</a>
                </div>
            </div>

        </div>
    </section>

    <!-- AUTO-SCROLLING CATEGORY STRIP -->
    <div class="cat-scroll-section">
        <div class="cat-scroll-track" id="catScrollTrack">
            ${[...CATEGORIES, ...CATEGORIES].map(c => `
            <a href="#categories" class="cat-scroll-item">
                <div class="cat-scroll-img-wrap">
                    <img src="${c.imgUrl}" alt="${c.label}" class="cat-scroll-img">
                    <div class="cat-scroll-overlay"></div>
                    <span class="cat-scroll-label">${c.label}</span>
                </div>
            </a>`).join('')}
        </div>
    </div>
    `;
}

export function initHeroSlider() {
    let current = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.sdot');
    if (!slides.length) return;

    let autoTimer;

    const go = (n) => {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = ((n % slides.length) + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    };

    const startAuto = () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (!document.getElementById('heroSlider')) {
                clearInterval(autoTimer);
                return;
            }
            go(current + 1);
        }, 5000);
    };

    document.getElementById('slideNext')?.addEventListener('click', () => { go(current + 1); startAuto(); });
    document.getElementById('slidePrev')?.addEventListener('click', () => { go(current - 1); startAuto(); });
    dots.forEach(d => d.addEventListener('click', () => { go(+d.dataset.idx); startAuto(); }));
    startAuto();

    // 2. Mobile Hero Grid Infinite Swipe Logic
    const grid = document.querySelector('.hero-grid');
    if (grid && window.innerWidth <= 640 && !grid.dataset.looped) {
        grid.dataset.looped = 'true';

        setTimeout(() => {
            const children = Array.from(grid.children).filter(c => !c.classList.contains('clone'));
            if (children.length === 3) {
                // Clone first and last cards
                const firstClone = children[0].cloneNode(true);
                const lastClone = children[2].cloneNode(true);
                firstClone.classList.add('clone');
                lastClone.classList.add('clone');

                // Construct DOM: [2'] [0] [1] [2] [0']
                grid.appendChild(firstClone);
                grid.insertBefore(lastClone, children[0]);

                const scrollToCard = (index) => {
                    grid.style.scrollSnapType = 'none'; // Unlock scroll snap briefly
                    const itemWidth = grid.firstElementChild.offsetWidth + 12; // Width + Gap
                    grid.scrollTo({ left: itemWidth * index, behavior: 'instant' });
                    grid.offsetHeight; // Force DOM reflow
                    grid.style.scrollSnapType = 'x mandatory';
                };

                // Since DOM has [Promos2', Promos1, Slider, Promos2, Promos1']
                // And user requested "slider in the middle", then the real Slider is child[2] (index 2)
                setTimeout(() => scrollToCard(2), 50);

                let isScrolling = false;
                grid.addEventListener('scroll', () => {
                    if (isScrolling) return;

                    const itemWidth = grid.firstElementChild.offsetWidth + 12;

                    // If user scrolled to the very beginning (Promos2 clone, index 0)
                    if (grid.scrollLeft <= 5) {
                        isScrolling = true;
                        scrollToCard(3); // Silently jump to real Promos2
                        setTimeout(() => isScrolling = false, 50);
                    }
                    // If user scrolled to the very end (Promos1 clone, index 4)
                    else if (grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 5) {
                        isScrolling = true;
                        scrollToCard(1); // Silently jump to real Promos1
                        setTimeout(() => isScrolling = false, 50);
                    }
                }, { passive: true });
            }
        }, 100);
    }
}
