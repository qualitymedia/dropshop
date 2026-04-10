export const Header = () => `
    <!-- Main Navbar -->
    <header class="navbar">
        <div class="nav-inner">

            <!-- Hamburger (mobile) -->
            <button class="hamburger-btn hidden-desktop" id="menu-btn" aria-label="Open Menu">
                <i class="fa-solid fa-bars"></i>
            </button>

            <!-- Logo -->
            <a href="#home" class="logo">
                <i class="fa-solid fa-leaf"></i> DropShop
            </a>

            <!-- Search (desktop) -->
            <div class="search-bar hidden-mobile">
                <div class="search-input-group">
                    <select class="search-category" aria-label="Category">
                        <option>All</option>
                        <option>Phones</option>
                        <option>Fashion</option>
                        <option>Electronics</option>
                        <option>Home</option>
                        <option>Beauty</option>
                        <option>Sports</option>
                        <option>Computing</option>
                    </select>
                    <input type="text" id="global-search-input" placeholder="Search products, brands and more...">
                </div>
                <button class="search-btn" id="global-search-btn" aria-label="Search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <!-- Right actions -->
            <div class="nav-actions">
                <!-- Wishlist (desktop only) -->
                <a href="#wishlist" class="nav-action-item hidden-mobile" aria-label="Wishlist">
                    <i class="fa-regular fa-heart"></i>
                    <span class="action-title">Saved</span>
                </a>

                <!-- Account (desktop only — on mobile use bottom nav) -->
                <a href="#account" class="nav-action-item hidden-mobile">
                    <i class="fa-regular fa-user"></i>
                    <div class="action-label">
                        <span class="action-subtitle">Hello!</span>
                        <span class="action-title">My Account</span>
                    </div>
                </a>

                <!-- Cart (always visible) -->
                <a href="#cart" class="nav-action-item cart-action" aria-label="Cart">
                    <span class="cart-wrapper">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="cart-badge" id="cart-count">0</span>
                    </span>
                    <span class="action-title hidden-mobile">Cart</span>
                </a>
            </div>
        </div>

        <!-- Mobile Search -->
        <div class="mobile-search hidden-desktop">
            <i class="fa-solid fa-search"></i>
            <input type="text" id="mobile-search-input" placeholder="Search DropShop...">
        </div>

        <nav class="cat-nav hidden-mobile">
            <div class="cat-nav-inner">
                <div class="category-dropdown-wrapper" id="all-cats-wrapper">
                    <button class="cat-nav-item" id="all-cats-btn">
                        <i class="fa-solid fa-list"></i> All Categories <i class="fa-solid fa-chevron-down fa-xs"></i>
                    </button>
                    <div class="category-dropdown-content" id="all-cats-dropdown">
                        <!-- Featured Links -->
                        <div class="dropdown-featured">
                            <a href="#categories?search=Flash%20Deals" class="hot"><i class="fa-solid fa-bolt"></i> Flash Deals</a>
                            <a href="#categories?search=New%20Arrivals"><i class="fa-solid fa-star"></i> New Arrivals</a>
                            <a href="#categories?search=Best%20Sellers"><i class="fa-solid fa-fire"></i> Best Sellers</a>
                        </div>
                        <div class="dropdown-divider"></div>
                        <!-- Categories -->
                        <div class="dropdown-list">
                            <a href="#categories?search=Supermarket"><i class="fa-solid fa-basket-shopping"></i> Supermarket</a>
                            <a href="#categories?search=Health %26 Beauty"><i class="fa-solid fa-heart-pulse"></i> Health & Beauty</a>
                            <a href="#categories?search=Home %26 Office"><i class="fa-solid fa-house-chimney"></i> Home & Office</a>
                            <a href="#categories?search=Phones %26 Tablets"><i class="fa-solid fa-mobile-screen"></i> Phones & Tablets</a>
                            <a href="#categories?search=Computing"><i class="fa-solid fa-laptop"></i> Computing</a>
                            <a href="#categories?search=Electronics"><i class="fa-solid fa-tv"></i> Electronics</a>
                            <a href="#categories?search=Fashion"><i class="fa-solid fa-shirt"></i> Fashion</a>
                            <a href="#categories?search=Baby Products"><i class="fa-solid fa-baby"></i> Baby Products</a>
                            <a href="#categories?search=Gaming"><i class="fa-solid fa-gamepad"></i> Gaming</a>
                            <a href="#categories?search=Sporting Goods"><i class="fa-solid fa-dumbbell"></i> Sporting Goods</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <!-- Mobile Side Drawer -->
    <div id="side-menu-overlay" class="overlay"></div>
    <aside id="side-menu" class="side-menu">
        <div class="menu-header">
            <div class="menu-user"><i class="fa-solid fa-user-circle fa-2x"></i> <span>Welcome!</span></div>
            <button id="close-menu-btn" aria-label="Close"><i class="fa-solid fa-times"></i></button>
        </div>
        <div class="menu-section-title">Shop by Category</div>
        <ul class="menu-links">
            <li><a href="#categories?search=Phones %26 Tablets"><i class="fa-solid fa-mobile-screen"></i> Phones &amp; Tablets</a></li>
            <li><a href="#categories?search=Fashion"><i class="fa-solid fa-shirt"></i> Fashion</a></li>
            <li><a href="#categories?search=Electronics"><i class="fa-solid fa-tv"></i> Electronics</a></li>
            <li><a href="#categories?search=Home %26 Living"><i class="fa-solid fa-house-chimney"></i> Home &amp; Living</a></li>
            <li><a href="#categories?search=Health %26 Beauty"><i class="fa-solid fa-heart-pulse"></i> Health &amp; Beauty</a></li>
            <li><a href="#categories?search=Sports"><i class="fa-solid fa-dumbbell"></i> Sports</a></li>
            <li><a href="#categories?search=Gaming"><i class="fa-solid fa-gamepad"></i> Gaming</a></li>
            <li><a href="#categories?search=Flash %20Deals"><i class="fa-solid fa-bolt" style="color:var(--primary)"></i> Flash Deals</a></li>
        </ul>
        <div class="menu-section-title">My Account</div>
        <ul class="menu-links">
            <li><a href="#account"><i class="fa-solid fa-user"></i> Profile</a></li>
            <li><a href="#account"><i class="fa-solid fa-box"></i> My Orders</a></li>
            <li><a href="#wishlist"><i class="fa-solid fa-heart"></i> Saved Items</a></li>
        </ul>
    </aside>
`;
