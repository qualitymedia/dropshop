export const Footer = () => `
    <footer class="footer">
        <div class="container footer-grid">
            <div class="footer-brand">
                <div class="logo"><i class="fa-solid fa-leaf"></i> DropShop</div>
                <p>Your ultimate shopping destination for everything trendy, smart, and affordable.</p>
                <div class="social-links">
                    <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
                    <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h5>Company</h5>
                <ul>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#about">Careers</a></li>
                    <li><a href="#about">Press</a></li>
                    <li><a href="#about">Affiliate</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h5>Help</h5>
                <ul>
                    <li><a href="#help">Help Center</a></li>
                    <li><a href="#track">Track Order</a></li>
                    <li><a href="#returns">Return Policy</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h5>Newsletter</h5>
                <p style="font-size:.83rem;margin-bottom:12px;">Get the latest deals straight to your inbox.</p>
                <div class="subscribe-form">
                    <input type="email" id="newsletterEmail" placeholder="Enter your email">
                    <button class="btn btn-primary" onclick="
                        const el=document.getElementById('newsletterEmail');
                        if(el&&el.value.includes('@')){el.value='';alert('🎉 Subscribed! Thanks for joining DropShop.');}
                        else{alert('Please enter a valid email.');}
                    ">GO</button>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 DropShop · All rights reserved. &nbsp;·&nbsp; <a href="#returns" style="color:inherit;">Return Policy</a> &nbsp;·&nbsp; <a href="#help" style="color:inherit;">Help</a></p>
        </div>
    </footer>

    <nav class="bottom-nav hidden-desktop" aria-label="Mobile Navigation">
        <a href="#home" class="tab active">
            <i class="fa-solid fa-house"></i>
            <span>Home</span>
        </a>
        <a href="#categories" class="tab">
            <i class="fa-solid fa-table-cells-large"></i>
            <span>Categories</span>
        </a>
        <a href="#cart" class="tab">
            <i class="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
        </a>
        <a href="#wishlist" class="tab">
            <i class="fa-regular fa-heart"></i>
            <span>Wishlist</span>
        </a>
        <a href="#account" class="tab">
            <i class="fa-regular fa-user"></i>
            <span>Account</span>
        </a>
    </nav>
`;

