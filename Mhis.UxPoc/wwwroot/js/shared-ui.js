// ===== Reusable Form Modal =====
function openFormModal(title, bodyHTML, footerHTML, wide) {
    document.getElementById('formModalTitle').textContent = title;
    document.getElementById('formModalBody').innerHTML = bodyHTML;
    document.getElementById('formModalFooter').innerHTML = footerHTML;
    const overlay = document.getElementById('formModalOverlay');
    overlay.classList.toggle('modal-wide', !!wide);
    overlay.style.display = 'flex';
    overlay.classList.add('show');
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function closeFormModal() {
    const overlay = document.getElementById('formModalOverlay');
    overlay.style.display = 'none';
    overlay.classList.remove('show');
    overlay.classList.remove('modal-wide');
}

// ===== Reusable Confirmation Dialog =====
// Single component for every "are you sure?" decision in the app (never use
// window.confirm). Pass tone: 'primary' for a neutral/positive action,
// 'danger' for one that revokes access or deletes data.
let confirmDialogHandler = null;

function showConfirmDialog({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', tone = 'primary', onConfirm }) {
    document.getElementById('confirmDialogTitle').textContent = title;
    document.getElementById('confirmDialogMessage').textContent = message;

    const confirmBtn = document.getElementById('confirmDialogConfirmBtn');
    confirmBtn.textContent = confirmLabel;
    confirmBtn.className = `btn ${tone === 'danger' ? 'btn-danger' : 'btn-primary'}`;
    document.getElementById('confirmDialogCancelBtn').textContent = cancelLabel;

    const icon = document.getElementById('confirmDialogIcon');
    icon.className = `confirm-dialog-icon confirm-dialog-icon-${tone}`;
    icon.innerHTML = `<i data-lucide="${tone === 'danger' ? 'triangle-alert' : 'circle-help'}"></i>`;

    const overlay = document.getElementById('confirmDialogOverlay');
    overlay.style.display = 'flex';
    overlay.classList.add('show');

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    confirmDialogHandler = onConfirm;
}

function closeConfirmDialog() {
    const overlay = document.getElementById('confirmDialogOverlay');
    overlay.style.display = 'none';
    overlay.classList.remove('show');
    confirmDialogHandler = null;
}

// ===== Toast =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Shared list-page helpers =====
function renderSelect(id, label, options, selected) {
    const opts = options.map(o => `<option value="${escapeHtml(o)}"${o === selected ? ' selected' : ''}>${escapeHtml(o)}</option>`).join('');
    return `
        <div class="filter-group">
            <label for="${id}">${escapeHtml(label)}</label>
            <select id="${id}">
                <option value="">All</option>
                ${opts}
            </select>
        </div>`;
}

// ===== Reusable multi-select dropdown (search + checkbox list) =====
// A single global "click outside closes the open panel" listener, registered
// once here rather than per render, so opening/closing this component
// repeatedly (e.g. every time a modal is reopened) never piles up listeners.
document.addEventListener('click', (e) => {
    document.querySelectorAll('.multiselect').forEach(wrap => {
        if (!wrap.contains(e.target)) {
            const panel = wrap.querySelector('.multiselect-panel');
            if (panel) {
                panel.hidden = true;
            }
        }
    });
});

function renderMultiSelectDropdown(id, options, selectedValues, placeholder) {
    const normalized = options.map(o => (typeof o === 'string' ? { value: o, label: o } : o));
    const selectedSet = new Set(selectedValues);
    const selectedLabels = normalized.filter(o => selectedSet.has(o.value)).map(o => o.label);
    const optionsHTML = normalized.map(o => `
        <label class="multiselect-option" data-label="${escapeHtml(o.label.toLowerCase())}">
            <input type="checkbox" value="${escapeHtml(o.value)}"${selectedSet.has(o.value) ? ' checked' : ''} />
            <span>${escapeHtml(o.label)}</span>
        </label>`).join('');

    return `
        <div class="multiselect">
            <button type="button" class="multiselect-control${selectedLabels.length ? ' has-value' : ''}" id="${id}-control">
                <span class="multiselect-value">${selectedLabels.length ? escapeHtml(selectedLabels.join(', ')) : escapeHtml(placeholder || 'Select...')}</span>
                <i data-lucide="chevron-down"></i>
            </button>
            <div class="multiselect-panel" id="${id}-panel" hidden>
                <div class="multiselect-search-wrap">
                    <i data-lucide="search"></i>
                    <input type="text" class="multiselect-search" id="${id}-search" placeholder="Search..." autocomplete="off" />
                </div>
                <div class="multiselect-options" id="${id}-options">${optionsHTML || '<div class="multiselect-empty">No options.</div>'}</div>
            </div>
            <input type="hidden" id="${id}" value="${selectedValues.join(',')}" />
        </div>`;
}

function attachMultiSelectDropdown(id, onChange) {
    const control = document.getElementById(`${id}-control`);
    const panel = document.getElementById(`${id}-panel`);
    const search = document.getElementById(`${id}-search`);
    const optionsContainer = document.getElementById(`${id}-options`);
    const hiddenInput = document.getElementById(id);
    const valueDisplay = control.querySelector('.multiselect-value');
    const placeholder = valueDisplay.textContent;

    const updateDisplay = () => {
        const checked = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]:checked'));
        const values = checked.map(cb => cb.value);
        const labels = checked.map(cb => cb.closest('label').querySelector('span').textContent);
        hiddenInput.value = values.join(',');
        control.classList.toggle('has-value', labels.length > 0);
        valueDisplay.textContent = labels.length ? labels.join(', ') : placeholder;
        if (onChange) {
            onChange(values);
        }
    };

    control.addEventListener('click', () => {
        const wasHidden = panel.hidden;
        document.querySelectorAll('.multiselect-panel').forEach(p => { p.hidden = true; });
        panel.hidden = !wasHidden;
        if (!panel.hidden && search) {
            search.value = '';
            optionsContainer.querySelectorAll('.multiselect-option').forEach(o => { o.style.display = ''; });
            search.focus();
        }
    });

    if (search) {
        search.addEventListener('input', () => {
            const query = search.value.trim().toLowerCase();
            optionsContainer.querySelectorAll('.multiselect-option').forEach(opt => {
                const label = opt.getAttribute('data-label') || '';
                opt.style.display = !query || label.includes(query) ? '' : 'none';
            });
        });
    }

    optionsContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', updateDisplay);
    });
}

