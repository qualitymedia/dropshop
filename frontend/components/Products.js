export const Products = (title, containerId, iconClass = 'fa-fire') => `
    <section class="products-section" style="margin:8px 16px;">
        <div class="section-header">
            <h2><i class="fa-solid ${iconClass}" style="color:var(--primary)"></i> ${title}</h2>
            <a href="#categories">See All <i class="fa-solid fa-arrow-right fa-xs"></i></a>
        </div>
        <div class="carousel-wrapper" id="wrapper-${containerId}">
            <button class="carousel-btn prev" aria-label="Previous">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="product-carousel product-container-target" id="${containerId}">
                ${[...Array(6)].map(() => `
                    <div class="skeleton-card">
                        <div class="skeleton sk-img"></div>
                        <div class="skeleton sk-text"></div>
                        <div class="skeleton sk-half"></div>
                        <div class="skeleton sk-price"></div>
                        <div class="skeleton sk-btn"></div>
                    </div>`).join('')}
            </div>
            <button class="carousel-btn next" aria-label="Next">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </section>
`;
