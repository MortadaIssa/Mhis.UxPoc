// Notifications
function toggleNotificationModal(e) {
    e.stopPropagation();
    const modal = document.getElementById('notificationModal');
    
    if (modal.style.display === 'none' || !modal.style.display) {
        renderNotificationList();
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}

function closeNotificationModal() {
    document.getElementById('notificationModal').style.display = 'none';
}

function renderNotificationList() {
    const list = document.getElementById('notificationList');
    list.innerHTML = appState.notifications.map(notification => `
        <div class="notification-item ${notification.unread ? 'unread' : ''}" data-notification-id="${notification.id}">
            <div class="notification-item-header">
                <div style="display: flex; gap: 8px; align-items: start;">
                    <span class="notification-type ${notification.type}">${notification.type}</span>
                    ${notification.unread ? '<div class="notification-unread-indicator"></div>' : ''}
                </div>
            </div>
            <div class="notification-title">${escapeHtml(notification.title)}</div>
            <div class="notification-preview">${escapeHtml(notification.preview)}</div>
            <div class="notification-time">${notification.timestamp}</div>
        </div>
    `).join('');

    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', handleNotificationClick);
    });
}

function handleNotificationClick(e) {
    const notificationId = parseInt(e.currentTarget.getAttribute('data-notification-id'));
    const notification = appState.notifications.find(n => n.id === notificationId);
    
    if (notification) {
        showNotificationDetail(notification);
        notification.unread = false;
        updateNotificationBadge();
        renderNotificationList();
    }
}

function showNotificationDetail(notification) {
    const overlay = document.getElementById('notificationDetailOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    modalTitle.textContent = notification.title;
    modalBody.innerHTML = `<p>${escapeHtml(notification.fullContent)}</p>`;
    
    if (notification.action) {
        modalFooter.innerHTML = `<button class="modal-btn primary">${escapeHtml(notification.action)}</button>`;
    } else {
        modalFooter.innerHTML = '';
    }

    overlay.style.display = 'flex';
    overlay.classList.add('show');
}

function closeDetailModal() {
    const overlay = document.getElementById('notificationDetailOverlay');
    overlay.style.display = 'none';
    overlay.classList.remove('show');
}

function handleModalBackdropClick(e) {
    if (e.target === e.currentTarget) {
        closeDetailModal();
    }
}

function markAllNotificationsAsRead() {
    appState.notifications.forEach(n => n.unread = false);
    updateNotificationBadge();
    renderNotificationList();
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    const unreadCount = appState.notifications.filter(n => n.unread).length;
    appState.unreadCount = unreadCount;
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Account Menu
function toggleAccountDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('accountDropdown');
    dropdown.classList.toggle('show');
    
    if (dropdown.classList.contains('show')) {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

function handleOutsideClick(e) {
    const dropdown = document.getElementById('accountDropdown');
    const accountBtn = document.getElementById('accountBtn');
    
    if (!dropdown.contains(e.target) && !accountBtn.contains(e.target)) {
        dropdown.classList.remove('show');
        dropdown.style.display = 'none';
    }
    
    const notificationModal = document.getElementById('notificationModal');
    const notificationBtn = document.getElementById('notificationBell');
    
    if (!notificationModal.contains(e.target) && !notificationBtn.contains(e.target)) {
        notificationModal.style.display = 'none';
    }
}

