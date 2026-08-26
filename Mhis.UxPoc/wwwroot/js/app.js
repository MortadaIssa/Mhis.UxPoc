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
    organizationProfile: {
        name: "Community Health NGO",
        acronym: "CHN",
        phone: "+961 1 234 567",
        mobile: "+961 71 234 567",
        email: "info@communityhealthngo.org",
        directorName: "Dr. Layla Haddad",
        directorEmail: "l.haddad@communityhealthngo.org",
        directorMobile: "+961 70 111 222",
        sectors: "Mental Health, Substance Use, Community Awareness",
        website: "https://www.communityhealthngo.org",
        linkedin: "https://www.linkedin.com/company/community-health-ngo",
        daleelMadani: "https://daleel-madani.org/profile/community-health-ngo"
    },
    facilityTypes: ["Primary Health Care Center", "Hospital", "Community Center", "Mobile Unit"],
    governorates: ["Beirut", "Mount Lebanon", "North", "South", "Bekaa"],
    facilities: [
        { id: 1, name: "Central Health Clinic", type: "Primary Health Care Center", governorate: "Beirut", caza: "Beirut", locality: "Achrafieh", contact: "+961 1 200 300" },
        { id: 2, name: "Northern Community Center", type: "Community Center", governorate: "North", caza: "Tripoli", locality: "El Mina", contact: "+961 6 400 500" },
        { id: 3, name: "Bekaa Mental Health Hospital", type: "Hospital", governorate: "Bekaa", caza: "Zahle", locality: "Zahle Center", contact: "+961 8 600 700" },
        { id: 4, name: "Mount Lebanon Mobile Unit", type: "Mobile Unit", governorate: "Mount Lebanon", caza: "Baabda", locality: "Hazmieh", contact: "+961 5 800 900" },
        { id: 5, name: "Southern Wellbeing Center", type: "Community Center", governorate: "South", caza: "Saida", locality: "Old Saida", contact: "+961 7 100 200" }
    ],
    providerTypes: ["Psychiatrist", "Psychologist", "Social Worker", "Psychiatric Nurse", "Counselor"],
    providers: [
        { id: 1, name: "Dr. Nour Khalil", type: "Psychiatrist", facility: "Central Health Clinic", phone: "+961 3 111 222", email: "n.khalil@chn.org" },
        { id: 2, name: "Rana Saab", type: "Psychologist", facility: "Northern Community Center", phone: "+961 3 333 444", email: "r.saab@chn.org" },
        { id: 3, name: "Karim Yousef", type: "Social Worker", facility: "Bekaa Mental Health Hospital", phone: "+961 3 555 666", email: "k.yousef@chn.org" },
        { id: 4, name: "Maya Fares", type: "Psychiatric Nurse", facility: "Southern Wellbeing Center", phone: "+961 3 777 888", email: "m.fares@chn.org" },
        { id: 5, name: "Dr. Omar Nassar", type: "Counselor", facility: "Central Health Clinic", phone: "+961 3 999 000", email: "o.nassar@chn.org" }
    ],
    focalPersons: [
        { id: 1, area: "4Ws", name: "Sara Mansour", email: "s.mansour@chn.org", mobile: "+961 71 555 111" },
        { id: 2, area: "Substance Use", name: "Elie Rahme", email: "e.rahme@chn.org", mobile: "+961 71 555 222" }
    ],
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
    unreadCount: mockData.notifications.filter(n => n.unread).length,
    profileDirty: false
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

    // Reusable Form Modal
    document.getElementById('closeFormModal').addEventListener('click', closeFormModal);
    document.getElementById('formModalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeFormModal();
        }
    });
}

// Navigation Handler
function handleNavigation(e) {
    e.preventDefault();
    const page = e.currentTarget.getAttribute('data-page');

    if (appState.profileDirty && page !== appState.currentPage) {
        const proceed = confirm('You have unsaved changes. Leave this page and discard them?');
        if (!proceed) {
            return;
        }
        appState.profileDirty = false;
    }

    setActivePage(page);
    renderPage(page);
    closeNotificationModal();
}

// Activate a sidebar item and update state (also used for internal links)
function setActivePage(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-page') === page);
    });
    appState.currentPage = page;
}

// Navigate programmatically (used by in-page links)
function navigateTo(page) {
    if (appState.profileDirty && page !== appState.currentPage) {
        const proceed = confirm('You have unsaved changes. Leave this page and discard them?');
        if (!proceed) {
            return;
        }
        appState.profileDirty = false;
    }
    setActivePage(page);
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
            container.innerHTML = renderOrganizationProfilePage();
            attachOrganizationProfileListeners();
            break;
        case 'facilities':
            container.innerHTML = renderFacilitiesPage();
            attachFacilitiesListeners();
            break;
        case 'providers':
            container.innerHTML = renderProvidersPage();
            attachProvidersListeners();
            break;
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

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
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

// ===== Reusable Form Modal =====
function openFormModal(title, bodyHTML, footerHTML) {
    document.getElementById('formModalTitle').textContent = title;
    document.getElementById('formModalBody').innerHTML = bodyHTML;
    document.getElementById('formModalFooter').innerHTML = footerHTML;
    const overlay = document.getElementById('formModalOverlay');
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

// ===== Organization Profile =====
function renderOrganizationProfilePage() {
    const p = mockData.organizationProfile;
    const field = (id, label, value, required, type = 'text') => `
        <div class="form-field">
            <label for="${id}">${escapeHtml(label)}${required ? ' <span class="required">*</span>' : ''}</label>
            <input type="${type}" id="${id}" value="${escapeHtml(value || '')}"${required ? ' data-required="true"' : ''} />
            <div class="field-error" id="${id}-error"></div>
        </div>`;

    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Organization Profile</h1>
            </div>
            <div class="tabs" role="tablist">
                <button class="tab active" data-tab="general" role="tab">General Information</button>
                <button class="tab" data-tab="facilities" role="tab">Facilities</button>
                <button class="tab" data-tab="providers" role="tab">Providers</button>
                <button class="tab" data-tab="focal" role="tab">Focal Persons</button>
            </div>

            <div class="tab-panel active" data-panel="general">
                <form id="profileForm" class="profile-form" novalidate>
                    <div class="logo-row">
                        <div class="logo-placeholder" aria-hidden="true">
                            <i data-lucide="image"></i>
                            <span>Logo</span>
                        </div>
                        <button type="button" class="btn btn-secondary" id="uploadLogoBtn">Upload Logo</button>
                    </div>
                    <div class="form-grid">
                        ${field('org-name', 'Organization Name', p.name, true)}
                        ${field('org-acronym', 'Acronym', p.acronym, false)}
                        ${field('org-phone', 'Institution Phone Number', p.phone, true)}
                        ${field('org-mobile', 'Institution Mobile Number', p.mobile, false)}
                        ${field('org-email', 'Institution Email', p.email, true, 'email')}
                        ${field('org-director-name', 'Director Name', p.directorName, true)}
                        ${field('org-director-email', 'Director Email', p.directorEmail, true, 'email')}
                        ${field('org-director-mobile', 'Director Mobile Number', p.directorMobile, false)}
                        ${field('org-sectors', 'Sectors / Areas of Responsibility', p.sectors, false)}
                        ${field('org-website', 'Organization Website', p.website, false, 'url')}
                        ${field('org-linkedin', 'LinkedIn Profile', p.linkedin, false, 'url')}
                        ${field('org-daleel', 'Daleel Madani Link', p.daleelMadani, false, 'url')}
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                        <button type="button" class="btn btn-secondary" id="profileCancelBtn">Cancel</button>
                    </div>
                </form>
            </div>

            <div class="tab-panel" data-panel="facilities">
                <div class="summary-block">
                    <p><strong>${mockData.facilities.length}</strong> facilities registered for this organization.</p>
                    <button type="button" class="btn btn-secondary" data-goto="facilities">Manage Facilities</button>
                </div>
            </div>

            <div class="tab-panel" data-panel="providers">
                <div class="summary-block">
                    <p><strong>${mockData.providers.length}</strong> providers registered for this organization.</p>
                    <button type="button" class="btn btn-secondary" data-goto="providers">Manage Providers</button>
                </div>
            </div>

            <div class="tab-panel" data-panel="focal">
                <table class="data-table">
                    <thead>
                        <tr><th>Area</th><th>Name</th><th>Email</th><th>Mobile</th></tr>
                    </thead>
                    <tbody>
                        ${mockData.focalPersons.map(f => `
                            <tr>
                                <td>${escapeHtml(f.area)}</td>
                                <td>${escapeHtml(f.name)}</td>
                                <td>${escapeHtml(f.email)}</td>
                                <td>${escapeHtml(f.mobile)}</td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
}

function attachOrganizationProfileListeners() {
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            document.querySelectorAll('.tabs .tab').forEach(t => t.classList.toggle('active', t === tab));
            document.querySelectorAll('.tab-panel').forEach(p => {
                p.classList.toggle('active', p.getAttribute('data-panel') === target);
            });
        });
    });

    document.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.getAttribute('data-goto')));
    });

    const form = document.getElementById('profileForm');
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => { appState.profileDirty = true; });
    });

    document.getElementById('profileCancelBtn').addEventListener('click', () => {
        appState.profileDirty = false;
        renderPage('organization-profile');
    });

    document.getElementById('uploadLogoBtn').addEventListener('click', () => {
        showToast('Logo upload is simulated in this POC.', 'info');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateProfileForm(form)) {
            return;
        }
        const p = mockData.organizationProfile;
        p.name = form.querySelector('#org-name').value.trim();
        p.acronym = form.querySelector('#org-acronym').value.trim();
        p.phone = form.querySelector('#org-phone').value.trim();
        p.mobile = form.querySelector('#org-mobile').value.trim();
        p.email = form.querySelector('#org-email').value.trim();
        p.directorName = form.querySelector('#org-director-name').value.trim();
        p.directorEmail = form.querySelector('#org-director-email').value.trim();
        p.directorMobile = form.querySelector('#org-director-mobile').value.trim();
        p.sectors = form.querySelector('#org-sectors').value.trim();
        p.website = form.querySelector('#org-website').value.trim();
        p.linkedin = form.querySelector('#org-linkedin').value.trim();
        p.daleelMadani = form.querySelector('#org-daleel').value.trim();
        appState.profileDirty = false;
        showToast('Organization profile saved successfully.', 'success');
    });
}

function validateProfileForm(form) {
    let valid = true;
    form.querySelectorAll('.field-error').forEach(el => (el.textContent = ''));
    form.querySelectorAll('input').forEach(el => el.classList.remove('invalid'));

    form.querySelectorAll('input[data-required="true"]').forEach(input => {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (!input.value.trim()) {
            input.classList.add('invalid');
            if (errorEl) errorEl.textContent = 'This field is required.';
            valid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
            input.classList.add('invalid');
            if (errorEl) errorEl.textContent = 'Enter a valid email address.';
            valid = false;
        }
    });
    return valid;
}

// ===== Facilities =====
function renderFacilitiesPage() {
    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Facilities</h1>
                <button class="btn btn-primary" id="addFacilityBtn">
                    <i data-lucide="plus"></i><span>Add Facility</span>
                </button>
            </div>
            <div class="list-toolbar">
                <div class="search-group">
                    <i data-lucide="search"></i>
                    <input type="search" id="facilitySearch" placeholder="Search facilities..." aria-label="Search facilities" />
                </div>
                ${renderSelect('facilityTypeFilter', 'Facility Type', mockData.facilityTypes, '')}
                ${renderSelect('facilityGovFilter', 'Governorate', mockData.governorates, '')}
            </div>
            <div class="result-count" id="facilityCount"></div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Facility Name</th><th>Facility Type</th><th>Governorate</th>
                        <th>Caza</th><th>Locality</th><th>Contact Number</th><th class="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody id="facilityTableBody"></tbody>
            </table>
        </div>`;
}

function attachFacilitiesListeners() {
    document.getElementById('addFacilityBtn').addEventListener('click', () => openFacilityForm());
    document.getElementById('facilitySearch').addEventListener('input', renderFacilityRows);
    document.getElementById('facilityTypeFilter').addEventListener('change', renderFacilityRows);
    document.getElementById('facilityGovFilter').addEventListener('change', renderFacilityRows);
    renderFacilityRows();
}

function getFilteredFacilities() {
    const q = (document.getElementById('facilitySearch')?.value || '').toLowerCase();
    const type = document.getElementById('facilityTypeFilter')?.value || '';
    const gov = document.getElementById('facilityGovFilter')?.value || '';
    return mockData.facilities.filter(f =>
        (!q || f.name.toLowerCase().includes(q) || f.locality.toLowerCase().includes(q)) &&
        (!type || f.type === type) &&
        (!gov || f.governorate === gov));
}

function renderFacilityRows() {
    const rows = getFilteredFacilities();
    const body = document.getElementById('facilityTableBody');
    document.getElementById('facilityCount').textContent = `${rows.length} facilit${rows.length === 1 ? 'y' : 'ies'} found`;
    if (rows.length === 0) {
        body.innerHTML = `<tr><td colspan="7" class="empty-row">No facilities match your filters.</td></tr>`;
        return;
    }
    body.innerHTML = rows.map(f => `
        <tr>
            <td>${escapeHtml(f.name)}</td>
            <td>${escapeHtml(f.type)}</td>
            <td>${escapeHtml(f.governorate)}</td>
            <td>${escapeHtml(f.caza)}</td>
            <td>${escapeHtml(f.locality)}</td>
            <td>${escapeHtml(f.contact)}</td>
            <td class="actions-col">
                <button class="icon-action" title="View" aria-label="View" data-action="view" data-id="${f.id}"><i data-lucide="eye"></i></button>
                <button class="icon-action" title="Edit" aria-label="Edit" data-action="edit" data-id="${f.id}"><i data-lucide="pencil"></i></button>
                <button class="icon-action danger" title="Delete" aria-label="Delete" data-action="delete" data-id="${f.id}"><i data-lucide="trash-2"></i></button>
            </td>
        </tr>`).join('');
    body.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const action = btn.getAttribute('data-action');
            if (action === 'view') viewFacility(id);
            else if (action === 'edit') openFacilityForm(id);
            else if (action === 'delete') deleteFacility(id);
        });
    });
    if (window.lucide) window.lucide.createIcons();
}

function viewFacility(id) {
    const f = mockData.facilities.find(x => x.id === id);
    if (!f) return;
    const rows = [
        ['Facility Name', f.name], ['Facility Type', f.type], ['Governorate', f.governorate],
        ['Caza', f.caza], ['Locality', f.locality], ['Contact Number', f.contact]
    ];
    openFormModal('Facility Details',
        `<dl class="detail-list">${rows.map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('')}</dl>`,
        `<button class="modal-btn" id="detailCloseBtn">Close</button>`);
    document.getElementById('detailCloseBtn').addEventListener('click', closeFormModal);
}

function openFacilityForm(id) {
    const editing = typeof id === 'number';
    const f = editing ? mockData.facilities.find(x => x.id === id) : { name: '', type: '', governorate: '', caza: '', locality: '', contact: '' };
    const typeOpts = mockData.facilityTypes.map(t => `<option value="${escapeHtml(t)}"${t === f.type ? ' selected' : ''}>${escapeHtml(t)}</option>`).join('');
    const govOpts = mockData.governorates.map(g => `<option value="${escapeHtml(g)}"${g === f.governorate ? ' selected' : ''}>${escapeHtml(g)}</option>`).join('');
    openFormModal(editing ? 'Edit Facility' : 'Add Facility', `
        <form id="facilityForm" class="modal-form" novalidate>
            <div class="form-field">
                <label for="fac-name">Facility Name <span class="required">*</span></label>
                <input type="text" id="fac-name" value="${escapeHtml(f.name)}" data-required="true" />
                <div class="field-error" id="fac-name-error"></div>
            </div>
            <div class="form-field">
                <label for="fac-type">Facility Type <span class="required">*</span></label>
                <select id="fac-type" data-required="true"><option value="">Select type</option>${typeOpts}</select>
                <div class="field-error" id="fac-type-error"></div>
            </div>
            <div class="form-field">
                <label for="fac-gov">Governorate <span class="required">*</span></label>
                <select id="fac-gov" data-required="true"><option value="">Select governorate</option>${govOpts}</select>
                <div class="field-error" id="fac-gov-error"></div>
            </div>
            <div class="form-field">
                <label for="fac-caza">Caza</label>
                <input type="text" id="fac-caza" value="${escapeHtml(f.caza)}" />
            </div>
            <div class="form-field">
                <label for="fac-locality">Locality</label>
                <input type="text" id="fac-locality" value="${escapeHtml(f.locality)}" />
            </div>
            <div class="form-field">
                <label for="fac-contact">Contact Number</label>
                <input type="text" id="fac-contact" value="${escapeHtml(f.contact)}" />
            </div>
        </form>`,
        `<button class="modal-btn" id="facCancelBtn">Cancel</button>
         <button class="modal-btn primary" id="facSaveBtn">${editing ? 'Save Changes' : 'Add Facility'}</button>`);

    document.getElementById('facCancelBtn').addEventListener('click', closeFormModal);
    document.getElementById('facSaveBtn').addEventListener('click', () => {
        const form = document.getElementById('facilityForm');
        if (!validateModalForm(form)) return;
        const data = {
            name: form.querySelector('#fac-name').value.trim(),
            type: form.querySelector('#fac-type').value,
            governorate: form.querySelector('#fac-gov').value,
            caza: form.querySelector('#fac-caza').value.trim(),
            locality: form.querySelector('#fac-locality').value.trim(),
            contact: form.querySelector('#fac-contact').value.trim()
        };
        if (editing) {
            Object.assign(f, data);
            showToast('Facility updated successfully.', 'success');
        } else {
            data.id = Math.max(0, ...mockData.facilities.map(x => x.id)) + 1;
            mockData.facilities.push(data);
            showToast('Facility added successfully.', 'success');
        }
        closeFormModal();
        renderFacilityRows();
    });
}

function deleteFacility(id) {
    const f = mockData.facilities.find(x => x.id === id);
    if (!f) return;
    if (confirm(`Delete facility "${f.name}"? This cannot be undone.`)) {
        mockData.facilities = mockData.facilities.filter(x => x.id !== id);
        showToast('Facility deleted.', 'success');
        renderFacilityRows();
    }
}

// ===== Providers =====
function renderProvidersPage() {
    const facilityNames = mockData.facilities.map(f => f.name);
    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Providers</h1>
                <button class="btn btn-primary" id="addProviderBtn">
                    <i data-lucide="plus"></i><span>Add Provider</span>
                </button>
            </div>
            <div class="list-toolbar">
                <div class="search-group">
                    <i data-lucide="search"></i>
                    <input type="search" id="providerSearch" placeholder="Search providers..." aria-label="Search providers" />
                </div>
                ${renderSelect('providerFacilityFilter', 'Facility', facilityNames, '')}
                ${renderSelect('providerTypeFilter', 'Provider Type', mockData.providerTypes, '')}
            </div>
            <div class="result-count" id="providerCount"></div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Provider Name</th><th>Provider Type / Profession</th><th>Facility</th>
                        <th>Phone</th><th>Email</th><th class="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody id="providerTableBody"></tbody>
            </table>
        </div>`;
}

function attachProvidersListeners() {
    document.getElementById('addProviderBtn').addEventListener('click', () => openProviderForm());
    document.getElementById('providerSearch').addEventListener('input', renderProviderRows);
    document.getElementById('providerFacilityFilter').addEventListener('change', renderProviderRows);
    document.getElementById('providerTypeFilter').addEventListener('change', renderProviderRows);
    renderProviderRows();
}

function getFilteredProviders() {
    const q = (document.getElementById('providerSearch')?.value || '').toLowerCase();
    const facility = document.getElementById('providerFacilityFilter')?.value || '';
    const type = document.getElementById('providerTypeFilter')?.value || '';
    return mockData.providers.filter(p =>
        (!q || p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)) &&
        (!facility || p.facility === facility) &&
        (!type || p.type === type));
}

function renderProviderRows() {
    const rows = getFilteredProviders();
    const body = document.getElementById('providerTableBody');
    document.getElementById('providerCount').textContent = `${rows.length} provider${rows.length === 1 ? '' : 's'} found`;
    if (rows.length === 0) {
        body.innerHTML = `<tr><td colspan="6" class="empty-row">No providers match your filters.</td></tr>`;
        return;
    }
    body.innerHTML = rows.map(p => `
        <tr>
            <td>${escapeHtml(p.name)}</td>
            <td>${escapeHtml(p.type)}</td>
            <td>${escapeHtml(p.facility)}</td>
            <td>${escapeHtml(p.phone)}</td>
            <td>${escapeHtml(p.email)}</td>
            <td class="actions-col">
                <button class="icon-action" title="View" aria-label="View" data-action="view" data-id="${p.id}"><i data-lucide="eye"></i></button>
                <button class="icon-action" title="Edit" aria-label="Edit" data-action="edit" data-id="${p.id}"><i data-lucide="pencil"></i></button>
                <button class="icon-action danger" title="Delete" aria-label="Delete" data-action="delete" data-id="${p.id}"><i data-lucide="trash-2"></i></button>
            </td>
        </tr>`).join('');
    body.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const action = btn.getAttribute('data-action');
            if (action === 'view') viewProvider(id);
            else if (action === 'edit') openProviderForm(id);
            else if (action === 'delete') deleteProvider(id);
        });
    });
    if (window.lucide) window.lucide.createIcons();
}

function viewProvider(id) {
    const p = mockData.providers.find(x => x.id === id);
    if (!p) return;
    const rows = [
        ['Provider Name', p.name], ['Provider Type / Profession', p.type],
        ['Facility', p.facility], ['Phone', p.phone], ['Email', p.email]
    ];
    openFormModal('Provider Details',
        `<dl class="detail-list">${rows.map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('')}</dl>`,
        `<button class="modal-btn" id="detailCloseBtn">Close</button>`);
    document.getElementById('detailCloseBtn').addEventListener('click', closeFormModal);
}

function openProviderForm(id) {
    const editing = typeof id === 'number';
    const p = editing ? mockData.providers.find(x => x.id === id) : { name: '', type: '', facility: '', phone: '', email: '' };
    const typeOpts = mockData.providerTypes.map(t => `<option value="${escapeHtml(t)}"${t === p.type ? ' selected' : ''}>${escapeHtml(t)}</option>`).join('');
    const facOpts = mockData.facilities.map(fac => `<option value="${escapeHtml(fac.name)}"${fac.name === p.facility ? ' selected' : ''}>${escapeHtml(fac.name)}</option>`).join('');
    openFormModal(editing ? 'Edit Provider' : 'Add Provider', `
        <form id="providerForm" class="modal-form" novalidate>
            <div class="form-field">
                <label for="prov-name">Provider Name <span class="required">*</span></label>
                <input type="text" id="prov-name" value="${escapeHtml(p.name)}" data-required="true" />
                <div class="field-error" id="prov-name-error"></div>
            </div>
            <div class="form-field">
                <label for="prov-type">Provider Type / Profession <span class="required">*</span></label>
                <select id="prov-type" data-required="true"><option value="">Select type</option>${typeOpts}</select>
                <div class="field-error" id="prov-type-error"></div>
            </div>
            <div class="form-field">
                <label for="prov-facility">Facility <span class="required">*</span></label>
                <select id="prov-facility" data-required="true"><option value="">Select facility</option>${facOpts}</select>
                <div class="field-error" id="prov-facility-error"></div>
            </div>
            <div class="form-field">
                <label for="prov-phone">Phone</label>
                <input type="text" id="prov-phone" value="${escapeHtml(p.phone)}" />
            </div>
            <div class="form-field">
                <label for="prov-email">Email</label>
                <input type="email" id="prov-email" value="${escapeHtml(p.email)}" />
                <div class="field-error" id="prov-email-error"></div>
            </div>
        </form>`,
        `<button class="modal-btn" id="provCancelBtn">Cancel</button>
         <button class="modal-btn primary" id="provSaveBtn">${editing ? 'Save Changes' : 'Add Provider'}</button>`);

    document.getElementById('provCancelBtn').addEventListener('click', closeFormModal);
    document.getElementById('provSaveBtn').addEventListener('click', () => {
        const form = document.getElementById('providerForm');
        if (!validateModalForm(form)) return;
        const data = {
            name: form.querySelector('#prov-name').value.trim(),
            type: form.querySelector('#prov-type').value,
            facility: form.querySelector('#prov-facility').value,
            phone: form.querySelector('#prov-phone').value.trim(),
            email: form.querySelector('#prov-email').value.trim()
        };
        if (editing) {
            Object.assign(p, data);
            showToast('Provider updated successfully.', 'success');
        } else {
            data.id = Math.max(0, ...mockData.providers.map(x => x.id)) + 1;
            mockData.providers.push(data);
            showToast('Provider added successfully.', 'success');
        }
        closeFormModal();
        renderProviderRows();
    });
}

function deleteProvider(id) {
    const p = mockData.providers.find(x => x.id === id);
    if (!p) return;
    if (confirm(`Delete provider "${p.name}"? This cannot be undone.`)) {
        mockData.providers = mockData.providers.filter(x => x.id !== id);
        showToast('Provider deleted.', 'success');
        renderProviderRows();
    }
}

// Shared validation for modal forms (required inputs/selects + email format)
function validateModalForm(form) {
    let valid = true;
    form.querySelectorAll('.field-error').forEach(el => (el.textContent = ''));
    form.querySelectorAll('input, select').forEach(el => el.classList.remove('invalid'));

    form.querySelectorAll('[data-required="true"]').forEach(input => {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (!input.value.trim()) {
            input.classList.add('invalid');
            if (errorEl) errorEl.textContent = 'This field is required.';
            valid = false;
        }
    });
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        const errorEl = document.getElementById(`${emailInput.id}-error`);
        if (errorEl) errorEl.textContent = 'Enter a valid email address.';
        valid = false;
    }
    return valid;
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
