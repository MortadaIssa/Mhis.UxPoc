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

