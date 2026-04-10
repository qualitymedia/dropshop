import { Auth } from './Auth.js';

export const Admin = {
    render: async () => {
        const user = Auth.getUser();
        if (!user || !user.isAdmin) {
            return `<div class="container" style="padding: 100px 20px; text-align: center;">
                        <i class="fa-solid fa-lock" style="font-size:3rem; color:#ef4444; margin-bottom:16px;"></i>
                        <h2 style="color:#ef4444">Access Denied</h2>
                        <p style="color:#888; margin-top:8px;">You must be an Administrator to view this page.</p>
                        <a href="#home" class="btn btn-primary" style="display:inline-block; margin-top:24px;">Return Home</a>
                    </div>`;
        }

        return `
        <div class="admin-dashboard container" style="padding-top: 30px; padding-bottom: 100px;">

            <!-- Header -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
                <div>
                    <h2 style="color:var(--dark); font-weight:800; font-size:1.4rem;">
                        <i class="fa-solid fa-shield-halved" style="color:var(--primary);"></i> Admin Control Panel
                    </h2>
                    <p style="font-size:.8rem; color:#888; margin-top:2px;">Manage your product inventory</p>
                </div>
                <button id="addProdBtn" class="btn btn-primary" style="padding:10px 20px; border-radius:8px; gap:8px;">
                    <i class="fa-solid fa-plus"></i> Add New Product
                </button>
            </div>

            <!-- Notice Banner -->
            <div id="adminNotice" style="display:none; padding:14px 18px; margin-bottom:20px; border-radius:10px; font-weight:600; font-size:.88rem;"></div>

            <!-- ===== ADD / EDIT FORM MODAL ===== -->
            <div id="adminFormCard" style="display:none; background:#fff; border-radius:16px; box-shadow:var(--shadow-lg); margin-bottom:32px; border:1px solid var(--border); overflow:hidden;">

                <!-- Form Header -->
                <div style="background:linear-gradient(135deg, var(--primary-dark), var(--primary)); padding:18px 24px; display:flex; justify-content:space-between; align-items:center;">
                    <h3 id="formTitle" style="color:#fff; font-size:1.1rem; font-weight:700; margin:0;">
                        <i class="fa-solid fa-box-open"></i> Create New Product
                    </h3>
                    <button id="cancelFormBtn" style="background:rgba(255,255,255,.2); border:none; color:#fff; width:32px; height:32px; border-radius:50%; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <form id="adminForm" style="padding:24px;" enctype="multipart/form-data">
                    <input type="hidden" id="prodId">

                    <!-- Row 1: Name + Category -->
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                        <div class="admin-field">
                            <label>Product Name <span style="color:#ef4444">*</span></label>
                            <input type="text" id="prodName" placeholder="e.g. Wireless Keyboard Pro" required>
                        </div>
                        <div class="admin-field">
                            <label>Category <span style="color:#ef4444">*</span></label>
                            <select id="prodCat">
                                <option>Supermarket</option>
                                <option>Health & Beauty</option>
                                <option>Home & Office</option>
                                <option>Phones & Tablets</option>
                                <option>Computing</option>
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Baby Products</option>
                                <option>Gaming</option>
                                <option>Sporting Goods</option>
                            </select>
                        </div>
                    </div>

                    <!-- Row 2: Prices + Discount + Stock + Rating -->
                    <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:16px; margin-bottom:16px;">
                        <div class="admin-field">
                            <label>Selling Price ($) <span style="color:#ef4444">*</span></label>
                            <input type="number" id="prodPrice" placeholder="0.00" min="0" step="0.01" required>
                        </div>
                        <div class="admin-field">
                            <label>Original Price ($)</label>
                            <input type="number" id="prodOrig" placeholder="0.00" min="0" step="0.01">
                        </div>
                        <div class="admin-field">
                            <label>Discount (%)</label>
                            <input type="number" id="prodDiscount" placeholder="0" min="0" max="100">
                        </div>
                        <div class="admin-field">
                            <label>Stock Quantity</label>
                            <input type="number" id="prodStock" placeholder="10" min="0">
                        </div>
                    </div>

                    <!-- Row 3: Store -->
                    <div class="admin-field" style="margin-bottom:16px;">
                        <label>Store Name</label>
                        <input type="text" id="prodStore" placeholder="e.g. DropShop Select">
                    </div>

                    <!-- Row 4: Physical Specs + Key Info -->
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                        <div class="admin-field">
                            <label>Weight (kg)</label>
                            <input type="text" id="prodWeight" placeholder="e.g. 0.5kg">
                        </div>
                        <div class="admin-field">
                            <label>Color</label>
                            <input type="text" id="prodColor" placeholder="e.g. Cosmic Black">
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                        <div class="admin-field">
                            <label>Warranty Info</label>
                            <input type="text" id="prodWarranty" placeholder="e.g. 12 Months Warranty">
                        </div>
                        <div class="admin-field">
                            <label>In the Box</label>
                            <input type="text" id="prodInBox" placeholder="e.g. 1x Product, Charger...">
                        </div>
                    </div>

                    <!-- Row 3: Description -->
                    <div class="admin-field" style="margin-bottom:16px;">
                        <label>Product Description</label>
                        <textarea id="prodDesc" rows="4" placeholder="Describe the product — materials, features, dimensions, use case..."></textarea>
                    </div>

                    <!-- Row 4: Image Upload -->
                    <div class="admin-field" style="margin-bottom:20px;">
                        <label>Product Image <span style="color:#ef4444">*</span></label>

                        <!-- Tab switcher -->
                        <div style="display:flex; gap:0; margin-bottom:12px; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; width:fit-content;">
                            <button type="button" id="tabUpload" class="img-tab active" onclick="window._adminSwitchTab('upload')">
                                <i class="fa-solid fa-upload"></i> Upload File
                            </button>
                            <button type="button" id="tabUrl" class="img-tab" onclick="window._adminSwitchTab('url')">
                                <i class="fa-solid fa-link"></i> Paste URL
                            </button>
                        </div>

                        <!-- Upload panel -->
                        <div id="panelUpload">
                            <div id="dropZone" onclick="document.getElementById('prodImageFile').click()">
                                <input type="file" id="prodImageFile" accept="image/*" style="display:none">
                                <div id="dropZoneContent">
                                    <i class="fa-solid fa-cloud-arrow-up" style="font-size:2rem; color:#cbd5e1; margin-bottom:8px;"></i>
                                    <div style="font-weight:600; color:#64748b;">Click to upload or drag &amp; drop</div>
                                    <div style="font-size:.75rem; color:#94a3b8; margin-top:4px;">PNG, JPG, GIF, WEBP — max 5 MB</div>
                                </div>
                                <img id="imgPreview" src="" alt="Preview" style="display:none; max-height:180px; border-radius:8px; object-fit:contain;">
                                <div id="imgFileName" style="font-size:.75rem; color:#64748b; margin-top:6px; display:none;"></div>
                            </div>
                            <div id="uploadProgress" style="display:none; margin-top:10px;">
                                <div style="height:4px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                                    <div id="uploadBar" style="height:100%; width:0%; background:var(--primary); transition:width .3s;"></div>
                                </div>
                                <div style="font-size:.75rem; color:#64748b; margin-top:4px;" id="uploadStatus">Uploading...</div>
                            </div>
                        </div>

                        <!-- URL panel -->
                        <div id="panelUrl" style="display:none;">
                            <input type="text" id="prodImageUrl" placeholder="https://example.com/image.jpg">
                            <div id="urlPreviewWrap" style="margin-top:10px; display:none;">
                                <img id="urlPreviewImg" src="" alt="URL Preview" style="max-height:150px; border-radius:8px; object-fit:contain; border:1px solid #e2e8f0;">
                            </div>
                        </div>

                        <!-- Resolved image URL stored here -->
                        <input type="hidden" id="prodImageResolved">
                    </div>

                    <!-- Row 5: Gallery Images -->
                    <div class="admin-field" style="margin-bottom:20px;">
                        <label>Product Gallery (Multiple Images)</label>
                        <div id="galleryContainer" style="display:flex; flex-wrap:wrap; gap:12px; margin-top:10px;">
                            <!-- Thumbnails added here -->
                        </div>
                        <div style="margin-top:12px;">
                            <button type="button" class="btn" onclick="document.getElementById('galleryInput').click()" style="background:#f1f5f9; color:#475569; padding:8px 16px; font-size:.85rem;">
                                <i class="fa-solid fa-images"></i> Add Gallery Images
                            </button>
                            <input type="file" id="galleryInput" multiple accept="image/*" style="display:none">
                            <span style="font-size:.72rem; color:#94a3b8; margin-left:10px;">Select up to 10 images</span>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div style="display:flex; gap:12px; margin-top:4px;">
                        <button type="submit" id="submitBtn" class="btn btn-primary" style="flex:1; padding:13px; font-size:.95rem; border-radius:10px;">
                            <i class="fa-solid fa-floppy-disk"></i> Save Product
                        </button>
                        <button type="button" id="cancelFormBtn2" class="btn" style="padding:13px 24px; background:#f1f5f9; color:#374151; border-radius:10px; font-weight:600;">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <!-- ===== PRODUCT TABLE ===== -->
            <div style="background:#fff; border-radius:16px; box-shadow:0 2px 12px rgba(0,0,0,.06); overflow:hidden;">
                <!-- Table toolbar -->
                <div style="padding:16px 20px; border-bottom:1px solid #f1f5f9; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                    <div style="flex:1; min-width:180px; position:relative;">
                        <i class="fa-solid fa-search" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#94a3b8; font-size:.8rem;"></i>
                        <input id="adminSearch" type="text" placeholder="Search products..." style="width:100%; padding:9px 12px 9px 34px; border:1px solid #e2e8f0; border-radius:8px; font-size:.88rem; outline:none;">
                    </div>
                    <div id="productCount" style="font-size:.8rem; color:#94a3b8; white-space:nowrap;"></div>
                </div>

                <div style="overflow-x:auto;">
                    <table style="width:100%; text-align:left; border-collapse:collapse;">
                        <thead style="background:#f8fafc; border-bottom:2px solid #e2e8f0; font-size:.78rem; color:#64748b; text-transform:uppercase; letter-spacing:.05em;">
                            <tr>
                                <th style="padding:14px 20px;">Product</th>
                                <th style="padding:14px 16px;">Category</th>
                                <th style="padding:14px 16px;">Price</th>
                                <th style="padding:14px 16px;">Discount</th>
                                <th style="padding:14px 16px;">Stock</th>
                                <th style="padding:14px 20px; text-align:right;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="adminProdList">
                            <tr><td colspan="6" style="text-align:center; padding:40px; color:#94a3b8;">
                                <i class="fa-solid fa-spinner fa-spin" style="font-size:1.4rem;"></i>
                            </td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

        <style>
            /* ===== Admin Form Styles ===== */
            .admin-field { display:flex; flex-direction:column; gap:6px; }
            .admin-field label { font-size:.8rem; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:.04em; }
            .admin-field input,
            .admin-field select,
            .admin-field textarea {
                padding:11px 14px;
                border:1.5px solid #e2e8f0;
                border-radius:9px;
                font-size:.9rem;
                font-family:inherit;
                outline:none;
                transition:border .2s, box-shadow .2s;
                background:#fafafa;
                width:100%;
                box-sizing:border-box;
                color:#1e293b;
            }
            .admin-field input:focus,
            .admin-field select:focus,
            .admin-field textarea:focus {
                border-color:var(--primary);
                box-shadow:0 0 0 3px rgba(22, 163, 74, .12);
                background:#fff;
            }
            .admin-field textarea { resize:vertical; min-height:90px; }

            .img-tab {
                padding:8px 16px;
                border:none;
                background:transparent;
                font-size:.82rem;
                font-weight:600;
                color:#64748b;
                cursor:pointer;
                transition:background .2s, color .2s;
            }
            .img-tab.active { background:var(--primary); color:#fff; }

            #dropZone {
                border:2px dashed #e2e8f0;
                border-radius:12px;
                padding:28px;
                text-align:center;
                cursor:pointer;
                transition:border .2s, background .2s;
                background:#f8fafc;
            }
            #dropZone:hover { border-color:var(--primary); background:#f0fdf4; }
            #dropZone.drag-over { border-color:var(--primary); background:#dcfce7; }

            @media(max-width:640px) {
                .admin-dashboard [style*="grid-template-columns:1fr 1fr 1fr 1fr"] { grid-template-columns:1fr 1fr !important; }
                .admin-dashboard [style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; }
            }
        </style>
        `;
    },

    afterRender: async () => {
        const user = Auth.getUser();
        if (!user || !user.isAdmin) return;

        const tableBody   = document.getElementById('adminProdList');
        const addBtn      = document.getElementById('addProdBtn');
        const formCard    = document.getElementById('adminFormCard');
        const adminForm   = document.getElementById('adminForm');
        const cancelBtn   = document.getElementById('cancelFormBtn');
        const cancelBtn2  = document.getElementById('cancelFormBtn2');
        const formTitle   = document.getElementById('formTitle');
        const notice      = document.getElementById('adminNotice');
        const searchInput = document.getElementById('adminSearch');
        const countBadge  = document.getElementById('productCount');

        let isEditing        = false;
        let productsCache    = [];
        let resolvedImageUrl = ''; // holds either the uploaded path or pasted URL
        let galleryUrls      = []; // New: holds the array of gallery image URLs

        /* ---- Notice helper ---- */
        const showNotice = (msg, isError = false) => {
            notice.textContent = msg;
            notice.style.display = 'block';
            notice.style.background = isError ? '#fee2e2' : '#dcfce7';
            notice.style.color      = isError ? '#dc2626' : '#16a34a';
            notice.style.border     = isError ? '1px solid #fca5a5' : '1px solid #86efac';
            setTimeout(() => { notice.style.display = 'none'; }, 5000);
        };

        /* ---- Image tab switching ---- */
        window._adminSwitchTab = (tab) => {
            document.getElementById('tabUpload').classList.toggle('active', tab === 'upload');
            document.getElementById('tabUrl').classList.toggle('active',    tab === 'url');
            document.getElementById('panelUpload').style.display = tab === 'upload' ? '' : 'none';
            document.getElementById('panelUrl').style.display    = tab === 'url'    ? '' : 'none';
            resolvedImageUrl = '';
        };

        /* ---- File drag & drop ---- */
        const dropZone = document.getElementById('dropZone');
        dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file) handleFileSelect(file);
        });

        /* ---- File input change ---- */
        document.getElementById('prodImageFile').addEventListener('change', (e) => {
            if (e.target.files[0]) handleFileSelect(e.target.files[0]);
        });

        function handleFileSelect(file) {
            if (!file.type.startsWith('image/')) { showNotice('Please select an image file.', true); return; }
            // Show preview immediately
            const reader = new FileReader();
            reader.onload = (ev) => {
                const preview = document.getElementById('imgPreview');
                preview.src = ev.target.result;
                preview.style.display = 'block';
                document.getElementById('dropZoneContent').style.display = 'none';
                document.getElementById('imgFileName').textContent = file.name;
                document.getElementById('imgFileName').style.display = 'block';
            };
            reader.readAsDataURL(file);
            // Upload to server
            uploadImageFile(file);
        }

        async function uploadImageFile(file) {
            const progress  = document.getElementById('uploadProgress');
            const bar       = document.getElementById('uploadBar');
            const statusTxt = document.getElementById('uploadStatus');
            progress.style.display = 'block';
            bar.style.width = '30%';
            statusTxt.textContent = 'Uploading image...';

            try {
                const formData = new FormData();
                formData.append('image', file);
                bar.style.width = '60%';
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                bar.style.width = '100%';

                if (!res.ok) throw new Error('Upload failed');
                const data = await res.json();
                resolvedImageUrl = data.imageUrl;
                statusTxt.textContent = '✅ Image uploaded successfully!';
                statusTxt.style.color = '#16a34a';
            } catch (err) {
                statusTxt.textContent = '❌ Upload failed. Try using URL tab instead.';
                statusTxt.style.color = '#dc2626';
                console.error(err);
            }
        }

        /* ---- URL tab preview ---- */
        document.getElementById('prodImageUrl').addEventListener('input', (e) => {
            const url = e.target.value.trim();
            const wrap = document.getElementById('urlPreviewWrap');
            const img  = document.getElementById('urlPreviewImg');
            if (url.startsWith('http')) {
                img.src = url;
                wrap.style.display = 'block';
                resolvedImageUrl = url;
            } else {
                wrap.style.display = 'none';
                resolvedImageUrl = '';
            }
        });

        /* ---- Gallery Rendering Helper ---- */
        const renderGallery = () => {
            const container = document.getElementById('galleryContainer');
            if (!container) return;
            container.innerHTML = galleryUrls.map((url, idx) => `
                <div style="position:relative; width:80px; height:80px; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0;">
                    <img src="${url}" style="width:100%; height:100%; object-fit:cover;">
                    <button type="button" onclick="window._adminRemoveGallery(${idx})" 
                        style="position:absolute; top:4px; right:4px; background:rgba(239, 68, 68, 0.9); color:white; border:none; border-radius:50%; width:18px; height:18px; font-size:10px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            `).join('');
            
            if (galleryUrls.length === 0) {
                container.innerHTML = '<div style="font-size:.75rem; color:#94a3b8; font-style:italic;">No images in gallery</div>';
            }
        };

        window._adminRemoveGallery = (idx) => {
            galleryUrls.splice(idx, 1);
            renderGallery();
        };

        /* ---- Multi-Image Upload Handling ---- */
        document.getElementById('galleryInput').addEventListener('change', async (e) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;

            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }

            try {
                const res = await fetch('/api/upload/multiple', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${Auth.getToken()}` },
                    body: formData
                });
                const data = await res.json();
                if (res.ok) {
                    galleryUrls = [...galleryUrls, ...data.imageUrls];
                    renderGallery();
                    showNotice('✅ Gallery images uploaded!');
                } else {
                    showNotice(data.message, true);
                }
            } catch (err) {
                showNotice('Error uploading gallery images.', true);
            }
        });

        /* ---- Load products into table ---- */
        const loadProducts = async (filter = '') => {
            try {
                const res = await fetch('/api/products');
                const products = await res.json();
                productsCache = products;

                const filtered = filter
                    ? products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) ||
                                          (p.category || '').toLowerCase().includes(filter.toLowerCase()))
                    : products;

                countBadge.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

                if (filtered.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:40px; color:#94a3b8;">
                        ${filter ? 'No products match your search.' : 'No products yet. Add your first product!'}
                    </td></tr>`;
                    return;
                }

                tableBody.innerHTML = filtered.map(p => `
                    <tr style="border-bottom:1px solid #f1f5f9; transition:background .15s;" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background=''">
                        <td style="padding:14px 20px; display:flex; align-items:center; gap:12px;">
                            <img src="${p.image}" style="width:46px; height:46px; border-radius:8px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0;" onerror="this.src='https://via.placeholder.com/46'">
                            <div>
                                <div style="font-weight:600; font-size:.9rem; color:#1e293b; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${p.name}</div>
                                ${p.description ? `<div style="font-size:.72rem; color:#94a3b8; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${p.description}</div>` : ''}
                            </div>
                        </td>
                        <td style="padding:14px 16px;">
                            <span style="background:#f1f5f9; color:#475569; padding:3px 9px; border-radius:20px; font-size:.75rem; font-weight:600;">${p.category || 'Uncategorized'}</span>
                        </td>
                        <td style="padding:14px 16px;">
                            <div style="font-weight:700; color:var(--primary);">$${Number(p.price).toFixed(2)}</div>
                            ${p.originalPrice ? `<div style="font-size:.72rem; color:#94a3b8; text-decoration:line-through;">$${Number(p.originalPrice).toFixed(2)}</div>` : ''}
                        </td>
                        <td style="padding:14px 16px;">
                            ${p.discount > 0 ? `<span style="background:#fef3c7; color:#d97706; padding:3px 9px; border-radius:20px; font-size:.75rem; font-weight:700;">-${p.discount}%</span>` : '<span style="color:#cbd5e1; font-size:.8rem;">—</span>'}
                        </td>
                        <td style="padding:14px 16px;">
                            <span style="font-size:.85rem; font-weight:600; color:${p.countInStock > 0 ? '#16a34a' : '#dc2626'};">
                                ${p.countInStock > 0 ? p.countInStock + ' left' : 'Out of stock'}
                            </span>
                        </td>
                        <td style="padding:14px 20px; text-align:right; white-space:nowrap;">
                            <button class="edit-btn" data-id="${p.id}" title="Edit"
                                style="background:#eff6ff; border:none; color:#3b82f6; cursor:pointer; padding:7px 12px; border-radius:7px; margin-right:6px; transition:background .2s;"
                                onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button class="delete-btn" data-id="${p.id}" title="Delete"
                                style="background:#fef2f2; border:none; color:#ef4444; cursor:pointer; padding:7px 12px; border-radius:7px; transition:background .2s;"
                                onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='#fef2f2'">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');

                document.querySelectorAll('.edit-btn').forEach(btn => btn.onclick = (e) => startEdit(e.currentTarget.dataset.id));
                document.querySelectorAll('.delete-btn').forEach(btn => btn.onclick = (e) => deleteProduct(e.currentTarget.dataset.id));

            } catch (err) {
                console.error(err);
                tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:40px; color:#dc2626;">
                    <i class="fa-solid fa-circle-exclamation"></i> Error loading products.
                </td></tr>`;
            }
        };

        /* ---- Search ---- */
        searchInput.addEventListener('input', (e) => loadProducts(e.target.value));

        /* ---- Start edit ---- */
        const startEdit = (id) => {
            const prod = productsCache.find(p => p.id === id);
            if (!prod) return;
            isEditing = true;
            formTitle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Product';
            document.getElementById('prodId').value       = prod.id;
            document.getElementById('prodName').value     = prod.name;
            document.getElementById('prodCat').value      = prod.category || 'Gadgets';
            document.getElementById('prodPrice').value    = prod.price;
            document.getElementById('prodOrig').value     = prod.originalPrice || '';
            document.getElementById('prodDiscount').value = prod.discount || 0;
            document.getElementById('prodStock').value    = prod.countInStock || 10;
            document.getElementById('prodDesc').value     = prod.description || '';
            document.getElementById('prodStore').value    = prod.storeName || '';
            document.getElementById('prodWarranty').value = prod.warranty || '';
            document.getElementById('prodWeight').value   = prod.weight || '';
            document.getElementById('prodColor').value    = prod.color || '';
            document.getElementById('prodInBox').value    = prod.inTheBox || '';

            // Show current image in URL tab
            window._adminSwitchTab('url');
            document.getElementById('prodImageUrl').value = prod.image;
            const urlPreview = document.getElementById('urlPreviewImg');
            urlPreview.src = prod.image;
            document.getElementById('urlPreviewWrap').style.display = 'block';
            resolvedImageUrl = prod.image;

            // Load gallery
            galleryUrls = prod.images || [];
            renderGallery();

            formCard.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        /* ---- Delete product ---- */
        const deleteProduct = async (id) => {
            if (!confirm('Are you sure you want to permanently delete this product?')) return;
            try {
                const res = await fetch(`/api/products/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
                });
                if (res.ok) { showNotice('✅ Product deleted successfully!'); loadProducts(); }
                else { const d = await res.json(); showNotice(d.message, true); }
            } catch (e) { showNotice('Network error during delete.', true); }
        };

        /* ---- Form submit ---- */
        adminForm.onsubmit = async (e) => {
            e.preventDefault();

            // Resolve image: file upload URL takes priority, then pasted URL, then existing (edit mode)
            const activeTab = document.getElementById('tabUrl').classList.contains('active') ? 'url' : 'upload';
            if (activeTab === 'url') {
                resolvedImageUrl = document.getElementById('prodImageUrl').value.trim();
            }

            if (!resolvedImageUrl) {
                showNotice('⚠️ Please provide a product image (upload a file or paste a URL).', true);
                return;
            }

            const id = document.getElementById('prodId').value;
            const payload = {
                name:          document.getElementById('prodName').value.trim(),
                description:   document.getElementById('prodDesc').value.trim(),
                category:      document.getElementById('prodCat').value,
                price:         Math.max(0, Number(document.getElementById('prodPrice').value)),
                originalPrice: Math.max(0, Number(document.getElementById('prodOrig').value) || Number(document.getElementById('prodPrice').value)),
                discount:      Math.max(0, Math.min(100, Number(document.getElementById('prodDiscount').value) || 0)),
                countInStock:  Math.max(0, Number(document.getElementById('prodStock').value) || 10),
                storeName:     document.getElementById('prodStore').value.trim() || 'ScienceTech Official',
                warranty:      document.getElementById('prodWarranty').value.trim() || '12 Months Warranty',
                weight:        document.getElementById('prodWeight').value.trim() || '0.5kg',
                color:         document.getElementById('prodColor').value.trim() || 'Cosmic Black',
                inTheBox:      document.getElementById('prodInBox').value.trim() || 'Product, Manual',
                image:         resolvedImageUrl,
                images:        galleryUrls,
            };

            // Auto-calculate discount if not set but prices differ
            if (!payload.discount && payload.originalPrice > payload.price) {
                payload.discount = Math.round(((payload.originalPrice - payload.price) / payload.originalPrice) * 100);
            }

            const url    = isEditing ? `/api/products/${id}` : '/api/products';
            const method = isEditing ? 'PUT' : 'POST';
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

            try {
                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Auth.getToken()}` },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    showNotice(`✅ Product ${isEditing ? 'updated' : 'created'} successfully!`);
                    formCard.style.display = 'none';
                    adminForm.reset();
                    resolvedImageUrl = '';
                    // Reset image preview
                    document.getElementById('imgPreview').style.display = 'none';
                    document.getElementById('dropZoneContent').style.display = '';
                    document.getElementById('imgFileName').style.display = 'none';
                    document.getElementById('uploadProgress').style.display = 'none';
                    loadProducts();
                } else {
                    const d = await res.json(); showNotice(d.message, true);
                }
            } catch (e) { showNotice('Network error during save.', true); }
            finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Product';
            }
        };

        /* ---- Cancel / Open form buttons ---- */
        const openAddForm = () => {
            isEditing = false;
            adminForm.reset();
            resolvedImageUrl = '';
            formTitle.innerHTML = '<i class="fa-solid fa-box-open"></i> Create New Product';
            // Reset image area
            document.getElementById('imgPreview').style.display = 'none';
            document.getElementById('dropZoneContent').style.display = '';
            document.getElementById('imgFileName').style.display = 'none';
            document.getElementById('uploadProgress').style.display = 'none';
            document.getElementById('urlPreviewWrap').style.display = 'none';
            window._adminSwitchTab('upload');
            formCard.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const closeForm = () => { formCard.style.display = 'none'; };

        addBtn.onclick     = openAddForm;
        cancelBtn.onclick  = closeForm;
        cancelBtn2.onclick = closeForm;

        await loadProducts();
    }
};
