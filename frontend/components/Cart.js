// ============================================================
//  CART STATE — localStorage-backed cart for DropShop
// ============================================================

export const Cart = {
    _key: 'dropshop_cart',

    getAll() {
        try { return JSON.parse(localStorage.getItem(this._key)) || []; }
        catch { return []; }
    },

    save(items) {
        localStorage.setItem(this._key, JSON.stringify(items));
        this.updateBadge();
    },

    add(product, qty = 1) {
        const items = this.getAll();
        const existing = items.find(i => i.id === product.id);
        if (existing) {
            existing.qty += qty;
        } else {
            items.push({ ...product, qty });
        }
        this.save(items);
        this.showToast(`${product.name.substring(0, 30)}... added to cart!`);
    },

    remove(productId) {
        const items = this.getAll().filter(i => i.id !== productId);
        this.save(items);
    },

    updateQty(productId, qty) {
        const items = this.getAll();
        const item = items.find(i => i.id === productId);
        if (item) {
            item.qty = Math.max(1, qty);
            this.save(items);
        }
    },

    total() {
        return this.getAll().reduce((sum, i) => sum + parseFloat(i.price) * i.qty, 0).toFixed(2);
    },

    count() {
        return this.getAll().reduce((sum, i) => sum + i.qty, 0);
    },

    clear() {
        localStorage.removeItem(this._key);
        this.updateBadge();
    },

    updateBadge() {
        document.querySelectorAll('#cart-count, #mobile-cart-count').forEach(el => {
            const count = this.count();
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    showToast(msg) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.style.cssText = `
                position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
                background:#1c1c1c; color:#fff; padding:10px 22px; border-radius:30px;
                font-size:.82rem; font-weight:600; z-index:9999; white-space:nowrap;
                box-shadow:0 4px 20px rgba(0,0,0,.35); transition: opacity .3s ease;
                display:flex; align-items:center; gap:8px;
            `;
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#16a34a"></i> ${msg}`;
        toast.style.opacity = '1';
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
    }
};
