// ── HELPER ────────────────────────────────────────────
function createElement(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content)   el.textContent = content;
    return el;
}

// ── CARD ──────────────────────────────────────────────
function createCard(product) {
    const card = createElement('div', 'product-card');
    card.dataset.id = product.id;

    const media = createElement('div', 'card-media');
    media.textContent = '📦';            
    if (product.quantity === 0) {
        const badge = createElement('div', 'rupture-tag', '⚠️ RUPTURE');
        media.append(badge);
    }

    const content = createElement('div', 'card-content'); 

    const header  = createElement('div', 'product-header');
    const name    = createElement('span', 'product-name', product.name);
    const price   = createElement('span', 'product-price', `${product.price}€`);
    header.append(name, price);

    const info = createElement('div', 'stock-info');
    if (product.quantity === 0) {
        info.textContent = '❌ 0 unité - Épuisé';
        info.style.color = '#ff8a8a';
    } else if (product.quantity <= 4) {
        info.textContent = `⚠️ Stock: ${product.quantity} unités`;
    } else {
        info.textContent = `📦 Stock: ${product.quantity} unités`;
    }

    const actions   = createElement('div', 'card-actions');
    const editBtn   = createElement('button', 'action-btn edit', '✏️ Modifier');
    const deleteBtn = createElement('button', 'action-btn delete', '🗑️ Supprimer');
    editBtn.dataset.action   = 'edit';
    deleteBtn.dataset.action = 'delete';
    actions.append(editBtn, deleteBtn);

    content.append(header, info, actions);
    card.append(media, content);
    return card;
}

// ── RENDER ────────────────────────────────────────────
export function renderCards(products) {
    const list = document.querySelector('#products-container');
    list.innerHTML = '';
    if (products.length === 0) {
        list.innerHTML = `<p class="empty">Aucun produit trouvé.</p>`;
        return;
    }
    products.forEach(p => list.append(createCard(p)));
}

export function renderStats(stats) {
    document.querySelector('#stat-products').textContent     = stats.totalProducts;
    document.querySelector('#stat-total').textContent        = `${stats.totalValue.toFixed(2)} €`;
    document.querySelector('#stat-out-of-stock').textContent = stats.outOfStock;
}

export function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

export function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

export function fillEditForm(product) {
    document.querySelector('#edit-name').value     = product.name;
    document.querySelector('#edit-price').value    = product.price;
    document.querySelector('#edit-quantity').value = product.quantity;
    document.querySelector('#edit-category').value = product.category;
}


//EVENTS 
export function bindEvents(handlers) {

    //MODAL AJOUT 
    document.getElementById('btn-open-add')
        .addEventListener('click', () => openModal('modal-add'));

    ['btn-close-add', 'btn-cancel-add'].forEach(id =>
        document.getElementById(id)
            .addEventListener('click', () => closeModal('modal-add'))
    );

    document.getElementById('btn-save-add')
        .addEventListener('click', () => {
            const data = {
                name     : document.querySelector('#add-name').value,
                price    : document.querySelector('#add-price').value,
                quantity : document.querySelector('#add-quantity').value,
                category : document.querySelector('#add-category').value,
            };
            handlers.onAdd(data);
        });

    //MODAL EDIT
    ['btn-close-edit', 'btn-cancel-edit'].forEach(id =>
        document.getElementById(id)
            .addEventListener('click', () => closeModal('modal-edit'))
    );

    document.getElementById('btn-save-edit')
        .addEventListener('click', () => {
            const data = {
                name     : document.querySelector('#edit-name').value,
                price    : document.querySelector('#edit-price').value,
                quantity : document.querySelector('#edit-quantity').value,
                category : document.querySelector('#edit-category').value,
            };
            handlers.onSaveEdit(data);
        });

    //MODAL DELETE 
    ['btn-close-delete', 'btn-cancel-delete'].forEach(id =>
        document.getElementById(id)
            .addEventListener('click', () => closeModal('modal-delete'))
    );

    document.getElementById('btn-confirm-delete')
        .addEventListener('click', () => handlers.onConfirmDelete());

    //DÉLÉGATION SUR LES CARDS
    document.getElementById('products-container')
        .addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const card = btn.closest('[data-id]');
            const id   = card.dataset.id;
            if (btn.dataset.action === 'edit')   handlers.onEdit(id);
            if (btn.dataset.action === 'delete') handlers.onDelete(id);
        });

    //FILTRES
    document.getElementById('search-input')
        .addEventListener('input', (e) => handlers.onSearch(e.target.value));

    document.getElementById('filter-category')
        .addEventListener('change', (e) => handlers.onFilter(e.target.value));

    document.getElementById('filter-sort')
        .addEventListener('change', (e) => handlers.onSort(e.target.value));
}