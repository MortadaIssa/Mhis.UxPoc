// MHIS Application JavaScript

// Mock Data
const mockData = {
    organization: {
        name: "Community Health NGO",
        activities: 24,
        facilities: 8,
        providers: 15,
        upcomingEvents: 3
    },
    notifications: [
        {
            id: 1,
            type: "announcement",
            title: "New Activity Guidelines Released",
            preview: "We have published updated guidelines for mental health awareness activities...",
            fullContent: "We have published updated guidelines for mental health awareness activities. These new guidelines incorporate feedback from our partner organizations and reflect best practices in community mental health engagement. Please review them at your earliest convenience.",
            timestamp: "2 hours ago",
            unread: true
        },
        {
            id: 2,
            type: "action",
            title: "Facility Verification Required",
            preview: "Your facility 'Central Health Clinic' requires verification to continue operations...",
            fullContent: "Your facility 'Central Health Clinic' requires verification to continue operations. Please review the verification checklist and submit the required documentation within 7 days.",
            timestamp: "1 day ago",
            unread: true,
            action: "Review Facilities"
        },
        {
            id: 3,
            type: "event",
            title: "Upcoming Training Session",
            preview: "Join us for a training on Data Quality Standards scheduled for next month...",
            fullContent: "Join us for a comprehensive training on Data Quality Standards scheduled for next month. This training will help your team ensure data accuracy and compliance with MHIS standards.",
            timestamp: "3 days ago",
            unread: true,
            action: "View Event"
        },
        {
            id: 4,
            type: "system",
            title: "System Maintenance Notice",
            preview: "Scheduled maintenance will occur on Friday, 10 PM - 11 PM local time...",
            fullContent: "Scheduled maintenance will occur on Friday, 10 PM - 11 PM local time. During this period, the system will be temporarily unavailable. We apologize for any inconvenience.",
            timestamp: "5 days ago",
            unread: false
        }
    ],
    needsAttention: [
        {
            title: "Continue Activity Draft",
            description: "Mental Health Awareness Activity - saved but not submitted. Last edited 2 days ago."
        },
        {
            title: "Profile Update Required",
            description: "Your 4Ws Focal Person information needs to be updated to remain current."
        }
    ],
    announcements: [
        {
            title: "Updated Mental Health Guidelines 2024",
            content: "New comprehensive guidelines have been released reflecting the latest best practices in community mental health programs.",
            date: "March 15, 2024"
        },
        {
            title: "Data Submission Deadline Extended",
            content: "The deadline for Q1 activity data submission has been extended to April 30, 2024.",
            date: "March 10, 2024"
        },
        {
            title: "Welcome to MHIS",
            content: "Thank you for joining the Mental Health Information System. Your organization profile is currently under review.",
            date: "March 1, 2024"
        }
    ],
    upcomingEvents: [
        {
            day: 22,
            month: "Mar",
            title: "Regional Mental Health Summit",
            time: "10:00 AM - 4:00 PM"
        },
        {
            day: 28,
            month: "Mar",
            title: "Data Quality Training",
            time: "2:00 PM - 5:00 PM"
        },
        {
            day: 5,
            month: "Apr",
            title: "Community Partners Networking",
            time: "6:00 PM - 8:00 PM"
        }
    ]
};

// Application State
let appState = {
    currentPage: 'home',
    notifications: mockData.notifications,
    unreadCount: mockData.notifications.filter(n => n.unread).length
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateNotificationBadge();
    renderPage('home');
});

// Event Listeners
function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });

    // Notification Bell
    document.getElementById('notificationBell').addEventListener('click', toggleNotificationModal);

    // Account Menu
    document.getElementById('accountBtn').addEventListener('click', toggleAccountDropdown);
    document.addEventListener('click', handleOutsideClick);

    // Notification Modal
    document.getElementById('closeNotifications').addEventListener('click', closeNotificationModal);
    document.getElementById('markAllRead').addEventListener('click', markAllNotificationsAsRead);

    // Modal
    document.getElementById('closeModal').addEventListener('click', closeDetailModal);
    document.getElementById('notificationDetailOverlay').addEventListener('click', handleModalBackdropClick);
}

// Navigation Handler
function handleNavigation(e) {
    e.preventDefault();
    const page = e.currentTarget.getAttribute('data-page');
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    appState.currentPage = page;
    renderPage(page);
    closeNotificationModal();
}

// Page Rendering
function renderPage(page) {
    const container = document.getElementById('page-container');
    
    switch(page) {
        case 'home':
            container.innerHTML = renderHomePage();
            attachHomePageListeners();
            break;
        case 'organization-profile':
        case 'facilities':
        case 'providers':
        case 'activities':
        case 'surveys':
        case 'my-dashboard':
        case 'advanced-dashboard':
        case 'events-calendar':
        case 'resources-help':
            container.innerHTML = renderPlaceholderPage(page);
            break;
        default:
            container.innerHTML = renderHomePage();
    }
}

// Home Page
function renderHomePage() {
    const data = mockData;
    const needsAttention = data.needsAttention;
    const announcements = data.announcements;
    const events = data.upcomingEvents;

    let needsAttentionHTML = '';
    if (needsAttention.length === 0) {
        needsAttentionHTML = `
            <div class="needs-attention-empty">
                <div class="needs-attention-empty-icon">✓</div>
                <p>No items requiring your attention</p>
            </div>
        `;
    } else {
        needsAttentionHTML = needsAttention.map(item => `
            <div class="attention-item">
                <div class="attention-item-title">${escapeHtml(item.title)}</div>
                <div class="attention-item-description">${escapeHtml(item.description)}</div>
            </div>
        `).join('');
    }

    const announcementsHTML = announcements.map(item => `
        <div class="announcement-item">
            <div class="announcement-title">${escapeHtml(item.title)}</div>
            <div class="announcement-content">${escapeHtml(item.content)}</div>
            <div class="announcement-meta">${escapeHtml(item.date)}</div>
        </div>
    `).join('');

    const eventsHTML = events.map(item => `
        <div class="event-item">
            <div class="event-date">
                <div class="event-date-day">${item.day}</div>
                <div class="event-date-month">${item.month}</div>
            </div>
            <div class="event-details">
                <div class="event-title">${escapeHtml(item.title)}</div>
                <div class="event-time">${escapeHtml(item.time)}</div>
            </div>
        </div>
    `).join('');

    return `
        <div class="home-page">
            <div class="welcome-section">
                <h1 class="welcome-heading">Welcome, ${escapeHtml(data.organization.name)}</h1>
            </div>

            <div class="action-buttons">
                <button class="btn btn-primary" id="addActivityBtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span>Add Activity</span>
                </button>
                <button class="btn btn-secondary" id="viewDashboardBtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M13 17V9"></path><path d="M18 17V5"></path><path d="M8 17v-3"></path></svg>
                    <span>View Dashboard</span>
                </button>
            </div>

            <div class="summary-tiles">
                <div class="tile">
                    <div class="tile-label">Activities</div>
                    <div class="tile-value">${data.organization.activities}</div>
                </div>
                <div class="tile">
                    <div class="tile-label">Facilities</div>
                    <div class="tile-value">${data.organization.facilities}</div>
                </div>
                <div class="tile">
                    <div class="tile-label">Providers</div>
                    <div class="tile-value">${data.organization.providers}</div>
                </div>
                <div class="tile">
                    <div class="tile-label">Upcoming Events</div>
                    <div class="tile-value">${data.organization.upcomingEvents}</div>
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <h3>Needs Attention</h3>
                </div>
                <div class="section-content">
                    ${needsAttentionHTML}
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <h3>Recent Announcements</h3>
                </div>
                <div class="section-content">
                    ${announcementsHTML}
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <h3>Upcoming Events</h3>
                </div>
                <div class="section-content">
                    ${eventsHTML}
                </div>
            </div>
        </div>
    `;
}

function attachHomePageListeners() {
    document.getElementById('addActivityBtn')?.addEventListener('click', () => {
        alert('Add Activity feature - Coming soon in next iteration');
    });
    document.getElementById('viewDashboardBtn')?.addEventListener('click', () => {
        document.querySelector('[data-page="my-dashboard"]').click();
    });
}

// Placeholder Page
function renderPlaceholderPage(page) {
    const pageInfo = {
        'organization-profile': { title: 'Organization Profile' },
        'facilities': { title: 'Facilities' },
        'providers': { title: 'Providers' },
        'activities': { title: 'Activities' },
        'surveys': { title: 'Surveys' },
        'my-dashboard': { title: 'My Dashboard' },
        'advanced-dashboard': { title: 'Advanced Dashboard' },
        'events-calendar': { title: 'Events Calendar' },
        'resources-help': { title: 'Resources & Help' }
    };

    const info = pageInfo[page] || { title: 'Page' };

    return `
        <div class="placeholder-page">
            <div class="placeholder-icon">📋</div>
            <h2 class="placeholder-title">${info.title}</h2>
            <p class="placeholder-description">This page will be implemented in future iterations</p>
            <p class="placeholder-description">Current focus: Establishing the shell with home page and notification system</p>
        </div>
    `;
}

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

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
