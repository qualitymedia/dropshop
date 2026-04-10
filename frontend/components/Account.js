import { Auth } from './Auth.js';

export const Account = {
    render: async () => {
        const token = Auth.getToken();
        const user = Auth.getUser();

        if (token && user) {
            // Logged in View
            return `
            <div class="acc-page">
                <div class="acc-hero" style="border-radius: 0 0 15px 15px;">
                    <div class="acc-hero-top">
                        <div class="acc-avatar"><i class="fa-solid fa-user"></i></div>
                        <div class="acc-hero-name">
                            <h2>Hello, ${user.name.split(' ')[0]}!</h2>
                            <p>${user.email}</p>
                        </div>
                        <button class="acc-edit-btn"><i class="fa-solid fa-pen"></i> Edit</button>
                    </div>
                </div>
                
                <div class="acc-orders-strip container">
                    <div class="acc-order-stat"><i class="fa-solid fa-box"></i><span>Pending</span></div>
                    <div class="acc-order-stat"><i class="fa-solid fa-truck"></i><span>Shipping</span></div>
                    <div class="acc-order-stat"><i class="fa-solid fa-circle-check"></i><span>Delivered</span></div>
                    <div class="acc-order-stat"><i class="fa-solid fa-arrow-rotate-left"></i><span>Returns</span></div>
                </div>

                <div class="acc-section">
                    <div class="acc-section-title">My Orders</div>
                    <a href="#" class="acc-menu-item">
                        <span class="acc-menu-icon" style="background:#fff3e0;color:#f68b1e;"><i class="fa-solid fa-box"></i></span>
                        <div class="acc-text"><strong>My Orders</strong><span>Track, return or buy again</span></div>
                        <i class="fa-solid fa-chevron-right acc-chevron"></i>
                    </a>
                    <a href="#wishlist" class="acc-menu-item">
                        <span class="acc-menu-icon" style="background:#fce7f3;color:#db2777;"><i class="fa-regular fa-heart"></i></span>
                        <div class="acc-text"><strong>Wishlist / Saved Items</strong><span>Items you've saved for later</span></div>
                        <i class="fa-solid fa-chevron-right acc-chevron"></i>
                    </a>
                </div>

                <div class="acc-section">
                    <div class="acc-section-title">My Account</div>
                    <a href="#" class="acc-menu-item">
                        <span class="acc-menu-icon" style="background:#eff6ff;color:#3b82f6;"><i class="fa-solid fa-user"></i></span>
                        <div class="acc-text"><strong>Personal Information</strong><span>Name, email, phone number</span></div>
                        <i class="fa-solid fa-chevron-right acc-chevron"></i>
                    </a>
                    <a href="#" class="acc-menu-item">
                        <span class="acc-menu-icon" style="background:#f0fdf4;color:#16a34a;"><i class="fa-solid fa-location-dot"></i></span>
                        <div class="acc-text"><strong>Saved Addresses</strong><span>Manage delivery locations</span></div>
                        <i class="fa-solid fa-chevron-right acc-chevron"></i>
                    </a>
                </div>

                ${user.isAdmin ? `
                <div class="acc-section" style="border: 2px solid var(--primary);">
                    <div class="acc-section-title" style="color:var(--primary);">Store Administration</div>
                    <a href="#admin" class="acc-menu-item">
                        <span class="acc-menu-icon" style="background:#fee2e2;color:#dc2626;"><i class="fa-solid fa-lock"></i></span>
                        <div class="acc-text"><strong>Admin Dashboard</strong><span>Manage products and inventory</span></div>
                        <i class="fa-solid fa-chevron-right acc-chevron"></i>
                    </a>
                </div>
                ` : ''}

                <button id="logoutBtn" class="acc-logout">
                    <i class="fa-solid fa-right-from-bracket"></i> Log Out
                </button>
            </div>
            `;
        } else {
            // Auth View (Login / Register)
            return `
            <div class="acc-page" style="padding-top: 20px;">
                <div class="auth-container">
                    <div class="auth-title">Welcome to DropShop</div>
                    <div class="auth-tab">
                        <button id="tabLogin" class="active">Log In</button>
                        <button id="tabRegister">Sign Up</button>
                    </div>
                    
                    <div id="authError" class="auth-err"></div>

                    <form id="loginForm">
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="logEmail" placeholder="name@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="logPass" placeholder="Enter your password" required>
                        </div>
                        <button type="submit" class="btn btn-primary auth-btn">Secure Login</button>
                    </form>

                    <form id="registerForm" style="display: none;">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="regName" placeholder="Enter your name" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="regEmail" placeholder="name@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="regPass" placeholder="Create a password" required minlength="6">
                        </div>
                        <button type="submit" class="btn btn-primary auth-btn">Create Account</button>
                    </form>
                </div>
            </div>
            `;
        }
    },

    afterRender: async () => {
        const token = Auth.getToken();
        
        if (token) {
            // Bind Logout
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.onclick = () => {
                    Auth.logout();
                    window.location.reload(); 
                };
            }
        } else {
            // Bind Auth Tabs and Format
            const tabLogin = document.getElementById('tabLogin');
            const tabReg = document.getElementById('tabRegister');
            const fLog = document.getElementById('loginForm');
            const fReg = document.getElementById('registerForm');
            const authErr = document.getElementById('authError');
            
            if(!tabLogin || !fLog) return;

            tabLogin.onclick = () => { 
                tabLogin.classList.add('active'); tabReg.classList.remove('active'); 
                fLog.style.display='block'; fReg.style.display='none'; authErr.style.display='none'; 
            };
            tabReg.onclick = () => { 
                tabReg.classList.add('active'); tabLogin.classList.remove('active'); 
                fReg.style.display='block'; fLog.style.display='none'; authErr.style.display='none'; 
            };
            
            const showError = (msg) => { authErr.textContent = msg; authErr.style.display = 'block'; };

            fLog.onsubmit = async (e) => {
                e.preventDefault();
                const btn = fLog.querySelector('button'); 
                const origText = btn.textContent;
                btn.textContent = 'Authenticating...';
                try {
                    await Auth.login(document.getElementById('logEmail').value, document.getElementById('logPass').value);
                    window.location.reload();
                } catch(err) { showError(err.message); btn.textContent = origText; }
            };

             fReg.onsubmit = async (e) => {
                e.preventDefault();
                const btn = fReg.querySelector('button'); 
                const origText = btn.textContent;
                btn.textContent = 'Creating Account...';
                try {
                    await Auth.register(document.getElementById('regName').value, document.getElementById('regEmail').value, document.getElementById('regPass').value);
                    const { Cart } = await import('./Cart.js');
                    Cart.showToast("Account created successfully! Welcome.");
                    setTimeout(() => window.location.reload(), 1500);
                } catch(err) { showError(err.message); btn.textContent = origText; }
            };
        }
    }
};
