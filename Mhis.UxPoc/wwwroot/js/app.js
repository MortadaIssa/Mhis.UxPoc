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
    // Dynamic activity configurations. Each config lists ONLY the sections/fields it needs.
    // The activity form renders strictly from the selected config — no fixed tabs.
    activityConfigs: [
        {
            id: "facility-service",
            code: "3.2",
            subCode: "3.2.1",
            activity: "Service Provision",
            subActivity: "Facility-Based Mental Health Service",
            definition: "Clinical or psychosocial services delivered to individuals at a health facility, such as counselling, psychological intervention, or case management.",
            keywords: ["service", "counselling", "counseling", "psychological intervention", "clinical", "case management", "support provided to children", "individual support", "therapy", "mhpss service"],
            sections: [
                {
                    key: "general", title: "Activity Details", fields: [
                        { id: "title", label: "Activity Title", type: "text", required: true },
                        { id: "startDate", label: "Implementation Start Date", type: "date", required: true },
                        { id: "endDate", label: "Implementation End Date", type: "date", required: true },
                        { id: "description", label: "Description", type: "textarea", required: false }
                    ]
                },
                {
                    key: "location", title: "Location & Facility", fields: [
                        { id: "facility", label: "Facility", type: "select", required: true, optionsFrom: "facilities" },
                        { id: "governorate", label: "Governorate", type: "select", required: true, optionsFrom: "governorates" },
                        { id: "locality", label: "Locality", type: "text", required: false }
                    ]
                },
                {
                    key: "beneficiaries", title: "Beneficiaries", fields: [
                        { id: "beneficiaryType", label: "Beneficiary Type", type: "select", required: true, options: ["Adults", "Children", "Families", "Mixed"] },
                        { id: "beneficiaryCount", label: "Number of Beneficiaries", type: "number", required: true }
                    ]
                },
                {
                    key: "funding", title: "Funding", fields: [
                        { id: "donor", label: "Donor", type: "text", required: false },
                        { id: "budget", label: "Budget (USD)", type: "number", required: false }
                    ]
                }
            ]
        },
        {
            id: "awareness",
            code: "6.1",
            subCode: "6.1.2",
            activity: "Awareness & Information",
            subActivity: "Community Awareness Campaign",
            definition: "Public information and awareness work that spreads mental health messages to communities through campaigns, events, or media.",
            keywords: ["community awareness", "awareness", "campaign", "mental health messages", "information session", "public", "stigma", "outreach messaging", "radio", "social media"],
            sections: [
                {
                    key: "general", title: "Activity Details", fields: [
                        { id: "title", label: "Activity Title", type: "text", required: true },
                        { id: "startDate", label: "Implementation Start Date", type: "date", required: true },
                        { id: "endDate", label: "Implementation End Date", type: "date", required: true },
                        { id: "theme", label: "Campaign Theme", type: "text", required: true }
                    ]
                },
                {
                    key: "beneficiaries", title: "Beneficiaries", fields: [
                        { id: "audience", label: "Target Audience", type: "select", required: true, options: ["General Public", "Youth", "Health Workers", "Caregivers"] },
                        { id: "reach", label: "Estimated Reach", type: "number", required: true }
                    ]
                },
                {
                    key: "funding", title: "Funding", fields: [
                        { id: "donor", label: "Donor", type: "text", required: false },
                        { id: "budget", label: "Budget (USD)", type: "number", required: false }
                    ]
                }
            ]
        },
        {
            id: "coordination",
            code: "8.4",
            subCode: "8.4.1",
            activity: "Coordination & Policy",
            subActivity: "Policy / Research Coordination",
            definition: "Coordination, working-group, policy, or research work carried out with partners at national or sub-national level.",
            keywords: ["coordination", "policy", "research", "working group", "advocacy", "guidelines", "assessment", "study", "partners meeting"],
            sections: [
                {
                    key: "general", title: "Activity Details", fields: [
                        { id: "title", label: "Activity Title", type: "text", required: true },
                        { id: "startDate", label: "Implementation Start Date", type: "date", required: true },
                        { id: "endDate", label: "Implementation End Date", type: "date", required: true },
                        { id: "partners", label: "Coordinating Partners", type: "text", required: false }
                    ]
                },
                {
                    key: "funding", title: "Funding", fields: [
                        { id: "donor", label: "Donor", type: "text", required: false },
                        { id: "budget", label: "Budget (USD)", type: "number", required: false }
                    ]
                }
            ]
        },
        {
            id: "training",
            code: "5.3",
            subCode: "5.3.2",
            activity: "Capacity Building",
            subActivity: "Training of Health Workers",
            definition: "Training, coaching, or supervision delivered to providers and health workers to strengthen mental health service capacity.",
            keywords: ["training", "we trained health workers", "capacity building", "coaching", "supervision", "workshop", "provider training", "trained staff", "skills"],
            sections: [
                {
                    key: "general", title: "Activity Details", fields: [
                        { id: "title", label: "Activity Title", type: "text", required: true },
                        { id: "startDate", label: "Implementation Start Date", type: "date", required: true },
                        { id: "endDate", label: "Implementation End Date", type: "date", required: true },
                        { id: "topic", label: "Training Topic", type: "text", required: true }
                    ]
                },
                {
                    key: "providers", title: "Providers", fields: [
                        { id: "providerType", label: "Providers Trained", type: "select", required: true, options: ["Psychiatrists", "Psychologists", "Social Workers", "Psychiatric Nurses", "General Practitioners", "Mixed"] },
                        { id: "providerCount", label: "Number of Providers Trained", type: "number", required: true },
                        { id: "trainer", label: "Lead Trainer", type: "text", required: false }
                    ]
                },
                {
                    key: "beneficiaries", title: "Beneficiaries", fields: [
                        { id: "beneficiaryCount", label: "Indirect Beneficiaries Reached", type: "number", required: false }
                    ]
                },
                {
                    key: "funding", title: "Funding", fields: [
                        { id: "donor", label: "Donor", type: "text", required: false },
                        { id: "budget", label: "Budget (USD)", type: "number", required: false }
                    ]
                }
            ]
        }
    ],
    activities: [
        {
            id: 1, configId: "facility-service", state: "published",
            data: { title: "Weekly Counselling Sessions", startDate: "2025-01-06", endDate: "2026-06-30", description: "Ongoing individual counselling.", facility: "Central Health Clinic", governorate: "Beirut", locality: "Achrafieh", beneficiaryType: "Adults", beneficiaryCount: 120, donor: "WHO", budget: 45000 },
            updated: "2025-05-12"
        },
        {
            id: 2, configId: "awareness", state: "draft",
            data: { title: "World Mental Health Day Campaign", startDate: "2025-10-01", endDate: "2025-10-10", theme: "Mental Health for All", audience: "General Public", reach: 5000 },
            updated: "2025-05-20"
        },
        {
            id: 3, configId: "coordination", state: "completed",
            data: { title: "National MHPSS Working Group", startDate: "2024-02-01", endDate: "2024-12-15", partners: "MoPH, UNICEF, NMHP", donor: "UNICEF", budget: 20000 },
            updated: "2024-12-16"
        },
        {
            id: 4, configId: "facility-service", state: "completed",
            data: { title: "Mobile Clinic Outreach", startDate: "2024-03-01", endDate: "2024-09-30", description: "Rural outreach sessions.", facility: "Mount Lebanon Mobile Unit", governorate: "Mount Lebanon", locality: "Hazmieh", beneficiaryType: "Mixed", beneficiaryCount: 300, donor: "EU", budget: 60000 },
            updated: "2024-10-02"
        },
        {
            id: 5, configId: "training", state: "published",
            data: { title: "PM+ Training for Health Workers", startDate: "2025-04-01", endDate: "2026-03-31", topic: "Problem Management Plus", providerType: "General Practitioners", providerCount: 28, trainer: "Dr. Nour Khalil", beneficiaryCount: 900, donor: "WHO", budget: 32000 },
            updated: "2025-05-18"
        }
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

    if (page === 'activities') {
        // A direct sidebar click always returns to the My Activities list.
        activitiesView.mode = 'list';
        activityEditor = null;
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
            container.innerHTML = renderActivitiesPage();
            attachActivitiesListeners();
            break;
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
        activitiesView.mode = 'discovery';
        activitiesView.discoveryQuery = '';
        navigateTo('activities');
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

    const focalHTML = mockData.focalPersons.map(f => `
        <tr>
            <td>${escapeHtml(f.area)}</td>
            <td>${escapeHtml(f.name)}</td>
            <td>${escapeHtml(f.email)}</td>
            <td>${escapeHtml(f.mobile)}</td>
        </tr>`).join('');

    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Organization Profile</h1>
            </div>

            <form id="profileForm" class="profile-form" novalidate>
                <section class="profile-section">
                    <h2 class="profile-section-title">General Information</h2>
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
                    </div>
                </section>

                <section class="profile-section">
                    <h2 class="profile-section-title">Contact Information</h2>
                    <div class="form-grid">
                        ${field('org-phone', 'Institution Phone Number', p.phone, true)}
                        ${field('org-mobile', 'Institution Mobile Number', p.mobile, false)}
                        ${field('org-email', 'Institution Email', p.email, true, 'email')}
                        ${field('org-director-name', 'Director Name', p.directorName, true)}
                        ${field('org-director-email', 'Director Email', p.directorEmail, true, 'email')}
                        ${field('org-director-mobile', 'Director Mobile Number', p.directorMobile, false)}
                    </div>
                </section>

                <section class="profile-section">
                    <h2 class="profile-section-title">Areas of Work</h2>
                    <div class="form-grid">
                        ${field('org-sectors', 'Sectors / Areas of Responsibility', p.sectors, false)}
                    </div>
                </section>

                <section class="profile-section">
                    <h2 class="profile-section-title">Online Presence</h2>
                    <div class="form-grid">
                        ${field('org-website', 'Organization Website', p.website, false, 'url')}
                        ${field('org-linkedin', 'LinkedIn Profile', p.linkedin, false, 'url')}
                        ${field('org-daleel', 'Daleel Madani Link', p.daleelMadani, false, 'url')}
                    </div>
                </section>

                <section class="profile-section">
                    <h2 class="profile-section-title">Organization Focal Persons</h2>
                    <table class="data-table">
                        <thead>
                            <tr><th>Area</th><th>Name</th><th>Email</th><th>Mobile</th></tr>
                        </thead>
                        <tbody>${focalHTML}</tbody>
                    </table>
                </section>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                    <button type="button" class="btn btn-secondary" id="profileCancelBtn">Cancel</button>
                </div>
            </form>
        </div>`;
}

function attachOrganizationProfileListeners() {
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

// ===== Activities =====
// The Activities destination has three in-page views: 'list' (My Activities),
// 'discovery' (catalog smart search) and 'editor' (full-page guided stepper).
// No add/edit modal is used anywhere in this module.
let activitiesView = { mode: 'list', discoveryQuery: '' };
let activityEditor = null;

function getActivityConfig(configId) {
    return mockData.activityConfigs.find(c => c.id === configId);
}

function isActivityCompleted(activity) {
    // Completed = end date in the past (view-only), regardless of stored state.
    const end = activity.data && activity.data.endDate ? new Date(activity.data.endDate) : null;
    if (activity.state === 'completed') return true;
    if (!end) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return end < today;
}

function activityStateLabel(activity) {
    if (isActivityCompleted(activity)) return 'Completed';
    return activity.state === 'draft' ? 'Draft' : 'Published';
}

function renderActivitiesPage() {
    if (activitiesView.mode === 'discovery') return renderActivityDiscovery();
    if (activitiesView.mode === 'editor') return renderActivityEditorPage();
    return renderMyActivitiesList();
}

function attachActivitiesListeners() {
    if (activitiesView.mode === 'discovery') return attachActivityDiscoveryListeners();
    if (activitiesView.mode === 'editor') return attachActivityEditorListeners();
    return attachMyActivitiesListeners();
}

function showActivitiesView(mode) {
    activitiesView.mode = mode;
    renderPage('activities');
}

// ---------- My Activities list ----------
function renderMyActivitiesList() {
    const configOptions = mockData.activityConfigs
        .map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.code)} — ${escapeHtml(c.subActivity)}</option>`)
        .join('');
    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">My Activities</h1>
                <button class="btn btn-primary" id="logActivityBtn">
                    <i data-lucide="plus"></i><span>Log Activity</span>
                </button>
            </div>
            <div class="list-toolbar">
                <div class="search-group">
                    <i data-lucide="search"></i>
                    <input type="search" id="activitySearch" placeholder="Search my activities..." aria-label="Search my activities" />
                </div>
                <div class="filter-group">
                    <label for="activityTypeFilter">Activity</label>
                    <select id="activityTypeFilter">
                        <option value="">All</option>
                        ${configOptions}
                    </select>
                </div>
                <div class="filter-group">
                    <label for="activityStateFilter">Record</label>
                    <select id="activityStateFilter">
                        <option value="">All</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
            <div class="result-count" id="activityCount"></div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Code</th><th>Activity</th><th>Location</th><th>Facility</th>
                        <th>Implementation Dates</th><th>Last Updated</th><th class="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody id="activityTableBody"></tbody>
            </table>
        </div>`;
}

function attachMyActivitiesListeners() {
    document.getElementById('logActivityBtn').addEventListener('click', () => startActivityDiscovery());
    document.getElementById('activitySearch').addEventListener('input', renderActivityRows);
    document.getElementById('activityTypeFilter').addEventListener('change', renderActivityRows);
    document.getElementById('activityStateFilter').addEventListener('change', renderActivityRows);
    renderActivityRows();
}

function activitySectionKeys(cfg) {
    return cfg ? cfg.sections.map(s => s.key) : [];
}

function renderActivityRows() {
    const rows = getFilteredActivities();
    const body = document.getElementById('activityTableBody');
    document.getElementById('activityCount').textContent = `${rows.length} activit${rows.length === 1 ? 'y' : 'ies'} found`;
    if (rows.length === 0) {
        body.innerHTML = `<tr><td colspan="7" class="empty-row">No activities match your filters.</td></tr>`;
        return;
    }
    body.innerHTML = rows.map(a => {
        const cfg = getActivityConfig(a.configId);
        const completed = isActivityCompleted(a);
        const keys = activitySectionKeys(cfg);
        const hasLocation = keys.includes('location');
        const hasFacility = keys.includes('location'); // facility lives in the Location section
        const location = hasLocation
            ? escapeHtml([a.data.governorate, a.data.locality].filter(Boolean).join(', ') || '—')
            : '<span class="muted">Not required</span>';
        const facility = hasFacility
            ? escapeHtml(a.data.facility || '—')
            : '<span class="muted">Not required</span>';
        const period = `${escapeHtml(a.data.startDate || '—')} → ${escapeHtml(a.data.endDate || '—')}`;
        const label = activityStateLabel(a);
        const labelClass = completed ? 'completed' : (a.state === 'draft' ? 'draft' : 'published');
        let actions = '';
        if (completed) {
            actions = `<button class="icon-action" title="View" aria-label="View" data-action="view" data-id="${a.id}"><i data-lucide="eye"></i></button>`;
        } else {
            actions = `
                <button class="icon-action" title="Edit" aria-label="Edit" data-action="edit" data-id="${a.id}"><i data-lucide="pencil"></i></button>
                <button class="icon-action" title="Duplicate" aria-label="Duplicate" data-action="duplicate" data-id="${a.id}"><i data-lucide="copy"></i></button>`;
            if (a.state === 'draft') {
                actions += `<button class="icon-action danger" title="Delete" aria-label="Delete" data-action="delete" data-id="${a.id}"><i data-lucide="trash-2"></i></button>`;
            }
        }
        return `
            <tr>
                <td>${escapeHtml(cfg ? cfg.code : '—')}</td>
                <td>
                    <div class="cell-primary">${escapeHtml(a.data.title || 'Untitled activity')}</div>
                    <div class="cell-secondary">${escapeHtml(cfg ? cfg.subActivity : '')}</div>
                </td>
                <td>${location}</td>
                <td>${facility}</td>
                <td>${period}</td>
                <td>
                    ${escapeHtml(a.updated || '—')}
                    <span class="state-chip ${labelClass}">${escapeHtml(label)}</span>
                </td>
                <td class="actions-col">${actions}</td>
            </tr>`;
    }).join('');

    body.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const action = btn.getAttribute('data-action');
            if (action === 'view') openActivityEditor(id, true);
            else if (action === 'edit') openActivityEditor(id, false);
            else if (action === 'duplicate') duplicateActivity(id);
            else if (action === 'delete') deleteActivity(id);
        });
    });
    if (window.lucide) window.lucide.createIcons();
}

function getFilteredActivities() {
    const q = (document.getElementById('activitySearch')?.value || '').toLowerCase();
    const type = document.getElementById('activityTypeFilter')?.value || '';
    const state = document.getElementById('activityStateFilter')?.value || '';
    return mockData.activities.filter(a => {
        const cfg = getActivityConfig(a.configId);
        const title = (a.data.title || '').toLowerCase();
        const matchesQ = !q || title.includes(q) ||
            (cfg && (`${cfg.code} ${cfg.activity} ${cfg.subActivity}`.toLowerCase().includes(q)));
        const matchesType = !type || a.configId === type;
        const category = isActivityCompleted(a) ? 'completed' : a.state;
        const matchesState = !state || category === state;
        return matchesQ && matchesType && matchesState;
    });
}

function duplicateActivity(id) {
    const src = mockData.activities.find(a => a.id === id);
    if (!src) return;
    const copy = {
        id: Math.max(0, ...mockData.activities.map(a => a.id)) + 1,
        configId: src.configId,
        state: 'draft',
        data: Object.assign({}, src.data, { title: `${src.data.title} (Copy)` }),
        updated: new Date().toISOString().slice(0, 10)
    };
    mockData.activities.push(copy);
    showToast('Activity duplicated as a draft.', 'success');
    renderActivityRows();
}

function deleteActivity(id) {
    const a = mockData.activities.find(x => x.id === id);
    if (!a) return;
    if (confirm(`Delete draft activity "${a.data.title}"? This cannot be undone.`)) {
        mockData.activities = mockData.activities.filter(x => x.id !== id);
        showToast('Activity deleted.', 'success');
        renderActivityRows();
    }
}

// ---------- Activity discovery (smart catalog search) ----------
function startActivityDiscovery() {
    activitiesView.discoveryQuery = '';
    showActivitiesView('discovery');
}

function scoreCatalogMatch(cfg, query) {
    const q = query.trim().toLowerCase();
    if (!q) return { score: 0, reason: '' };
    let score = 0;
    let reason = '';
    const words = q.split(/\s+/).filter(w => w.length > 2);

    if (cfg.code.toLowerCase() === q || cfg.subCode.toLowerCase() === q) { score += 100; reason = `Matched code ${cfg.code}`; }
    else if (cfg.code.toLowerCase().startsWith(q) || cfg.subCode.toLowerCase().startsWith(q)) { score += 80; reason = `Matched code ${cfg.subCode}`; }

    const name = `${cfg.activity} ${cfg.subActivity}`.toLowerCase();
    if (name.includes(q)) { score += 60; reason = reason || 'Matches the activity name'; }

    cfg.keywords.forEach(k => {
        const kl = k.toLowerCase();
        if (kl === q || q.includes(kl) || kl.includes(q)) {
            score += 40;
            reason = reason || `Matches "${k}"`;
        }
    });

    // Plain-language: count overlapping meaningful words against keywords + definition
    const haystack = `${name} ${cfg.definition} ${cfg.keywords.join(' ')}`.toLowerCase();
    let hits = 0;
    let hitWord = '';
    words.forEach(w => {
        if (haystack.includes(w)) { hits++; hitWord = hitWord || w; }
    });
    if (hits > 0) {
        score += hits * 12;
        reason = reason || `Relevant to "${hitWord}"`;
    }
    return { score, reason };
}

function renderActivityDiscovery() {
    const q = activitiesView.discoveryQuery;
    return `
        <div class="page">
            <div class="page-header">
                <div>
                    <button class="link-back" id="discoveryBackBtn"><i data-lucide="arrow-left"></i> Back to My Activities</button>
                    <h1 class="page-title">Log Activity</h1>
                    <p class="page-lead">What activity are you reporting?</p>
                </div>
            </div>
            <div class="discovery-search">
                <div class="search-group large">
                    <i data-lucide="search"></i>
                    <input type="search" id="discoverySearch" value="${escapeHtml(q)}"
                        placeholder="Search by code (e.g. 6.1), activity name, or describe the work performed..."
                        aria-label="Search the activity catalog" autocomplete="off" />
                </div>
                <p class="helper-text">Try a code like <strong>6.1</strong>, a term like <strong>community awareness</strong>, or plain language like <strong>we trained health workers</strong>.</p>
            </div>
            <div id="discoveryResults" class="discovery-results"></div>
        </div>`;
}

function attachActivityDiscoveryListeners() {
    document.getElementById('discoveryBackBtn').addEventListener('click', () => showActivitiesView('list'));
    const input = document.getElementById('discoverySearch');
    input.addEventListener('input', () => {
        activitiesView.discoveryQuery = input.value;
        renderDiscoveryResults();
    });
    renderDiscoveryResults();
    input.focus();
}

function renderDiscoveryResults() {
    const container = document.getElementById('discoveryResults');
    const q = activitiesView.discoveryQuery.trim();
    const isPlainLanguage = q.split(/\s+/).length >= 3;

    let items;
    if (!q) {
        items = mockData.activityConfigs.map(cfg => ({ cfg, score: 1, reason: '' }));
    } else {
        items = mockData.activityConfigs
            .map(cfg => ({ cfg, ...scoreCatalogMatch(cfg, q) }))
            .filter(x => x.score > 0)
            .sort((a, b) => b.score - a.score);
    }

    if (items.length === 0) {
        container.innerHTML = `<div class="empty-state">No catalog matches for "<strong>${escapeHtml(q)}</strong>". Try a different term or a code.</div>`;
        return;
    }

    container.innerHTML = items.map(({ cfg, reason }) => `
        <div class="catalog-card">
            <div class="catalog-card-main">
                <div class="catalog-code">${escapeHtml(cfg.code)} · ${escapeHtml(cfg.subCode)}</div>
                <div class="catalog-name">${escapeHtml(cfg.activity)}</div>
                <div class="catalog-sub">${escapeHtml(cfg.subActivity)}</div>
                <p class="catalog-def">${escapeHtml(cfg.definition)}</p>
                ${(q && isPlainLanguage && reason) ? `<div class="catalog-why"><i data-lucide="sparkles"></i> Why this matches: ${escapeHtml(reason)}</div>` : ''}
            </div>
            <div class="catalog-card-action">
                <button class="btn btn-primary" data-select="${escapeHtml(cfg.id)}">Select activity</button>
            </div>
        </div>`).join('');

    container.querySelectorAll('button[data-select]').forEach(btn => {
        btn.addEventListener('click', () => openActivityEditor(null, false, btn.getAttribute('data-select')));
    });
    if (window.lucide) window.lucide.createIcons();
}

// ---------- Full-page guided editor ----------
function editorSteps(cfg) {
    // Steps come from activity metadata + a final Review step.
    const steps = cfg.sections.map(s => ({ key: s.key, title: s.title }));
    steps.push({ key: '__review', title: 'Review' });
    return steps;
}

function openActivityEditor(id, viewOnly, configId) {
    const editing = typeof id === 'number';
    const existing = editing ? mockData.activities.find(a => a.id === id) : null;
    activityEditor = {
        id: editing ? existing.id : null,
        configId: editing ? existing.configId : (configId || ''),
        state: editing ? existing.state : 'draft',
        data: editing ? Object.assign({}, existing.data) : {},
        originalData: editing ? JSON.stringify(existing.data) : JSON.stringify({}),
        viewOnly: !!viewOnly,
        step: 0,
        visited: {},
        dirty: false
    };
    showActivitiesView('editor');
}

function renderActivityEditorPage() {
    const s = activityEditor;
    const cfg = getActivityConfig(s.configId);
    if (!cfg) {
        // Should not happen; fall back to discovery.
        return renderActivityDiscovery();
    }
    const steps = editorSteps(cfg);
    const readonly = s.viewOnly;
    const title = readonly ? 'View Activity' : (s.id ? 'Edit Activity' : 'Log Activity');

    const stepperHTML = steps.map((step, i) => {
        const classes = ['stepper-item'];
        if (i === s.step) classes.push('current');
        if (s.visited[step.key] && i !== s.step) classes.push('done');
        if (s.stepIssues && s.stepIssues[step.key]) classes.push('attention');
        return `
            <button type="button" class="${classes.join(' ')}" data-step="${i}">
                <span class="stepper-index">${s.visited[step.key] && i !== s.step ? '<i data-lucide=\'check\'></i>' : (i + 1)}</span>
                <span class="stepper-label">${escapeHtml(step.title)}</span>
            </button>`;
    }).join('<span class="stepper-line"></span>');

    return `
        <div class="page activity-editor">
            <div class="editor-topbar">
                <button class="link-back" id="editorBackBtn"><i data-lucide="arrow-left"></i> Back to My Activities</button>
                <h1 class="page-title">${title}</h1>
                ${readonly ? '<span class="readonly-tag">Read-only · completed record</span>' : ''}
            </div>

            <div class="selected-activity">
                <div class="selected-activity-info">
                    <div class="catalog-code">${escapeHtml(cfg.code)} · ${escapeHtml(cfg.subCode)}</div>
                    <div class="selected-activity-name">${escapeHtml(cfg.activity)} — ${escapeHtml(cfg.subActivity)}</div>
                    <div class="selected-activity-def">${escapeHtml(cfg.definition)}</div>
                </div>
                ${readonly ? '' : '<button class="btn btn-secondary" id="changeActivityBtn">Change activity</button>'}
            </div>

            <div class="stepper" id="activityStepper">${stepperHTML}</div>

            <div id="editorValidationSummary"></div>

            <form id="activityEditorForm" class="editor-form" novalidate>
                <div id="editorStepBody">${renderEditorStep()}</div>
            </form>

            <div class="editor-actions">
                <button type="button" class="btn btn-secondary" id="editorCancelBtn">Cancel</button>
                <div class="editor-actions-right">
                    ${s.step > 0 ? '<button type="button" class="btn btn-secondary" id="editorBackStepBtn">Back</button>' : ''}
                    ${readonly ? '' : '<button type="button" class="btn btn-secondary" id="editorSaveDraftBtn">Save Draft</button>'}
                    ${renderEditorPrimaryAction()}
                </div>
            </div>
        </div>`;
}

function renderEditorPrimaryAction() {
    const s = activityEditor;
    const cfg = getActivityConfig(s.configId);
    const steps = editorSteps(cfg);
    const isLast = s.step === steps.length - 1;
    if (s.viewOnly) {
        return isLast ? '' : '<button type="button" class="btn btn-primary" id="editorContinueBtn">Continue</button>';
    }
    if (isLast) {
        return '<button type="button" class="btn btn-primary" id="editorPublishBtn">Publish Activity</button>';
    }
    return '<button type="button" class="btn btn-primary" id="editorContinueBtn">Continue</button>';
}

function renderEditorStep() {
    const s = activityEditor;
    const cfg = getActivityConfig(s.configId);
    const steps = editorSteps(cfg);
    const step = steps[s.step];

    if (step.key === '__review') {
        return renderEditorReview();
    }
    const section = cfg.sections.find(sec => sec.key === step.key);
    const readonly = s.viewOnly;
    return `
        <section class="activity-section">
            <h3 class="activity-section-title">${escapeHtml(section.title)}</h3>
            <div class="form-grid">
                ${section.fields.map(f => renderActivityField(f, s.data[f.id], readonly)).join('')}
            </div>
        </section>`;
}

function renderEditorReview() {
    const s = activityEditor;
    const cfg = getActivityConfig(s.configId);
    const blocks = cfg.sections.map(section => {
        const rows = section.fields.map(f => {
            const v = s.data[f.id];
            return `<div class="review-row"><dt>${escapeHtml(f.label)}</dt><dd>${v == null || v === '' ? '<span class="muted">—</span>' : escapeHtml(String(v))}</dd></div>`;
        }).join('');
        return `<div class="review-block"><h4>${escapeHtml(section.title)}</h4><dl>${rows}</dl></div>`;
    }).join('');
    return `
        <section class="activity-section">
            <h3 class="activity-section-title">Review</h3>
            <p class="helper-text">Review the recorded details below, then ${s.viewOnly ? 'close this record.' : 'publish the activity.'}</p>
            ${blocks}
        </section>`;
}

function renderActivityField(f, value, readonly) {
    const v = value == null ? '' : value;
    const req = f.required ? ' <span class="required">*</span>' : '';
    const dis = readonly ? ' disabled' : '';
    const dataReq = f.required ? ' data-required="true"' : '';
    let control;
    if (f.type === 'textarea') {
        control = `<textarea id="af-${f.id}" data-field="${f.id}"${dataReq}${dis}>${escapeHtml(v)}</textarea>`;
    } else if (f.type === 'select') {
        let opts = f.options;
        if (!opts && f.optionsFrom === 'facilities') opts = mockData.facilities.map(x => x.name);
        if (!opts && f.optionsFrom === 'governorates') opts = mockData.governorates;
        opts = opts || [];
        const optHtml = opts.map(o => `<option value="${escapeHtml(o)}"${String(o) === String(v) ? ' selected' : ''}>${escapeHtml(o)}</option>`).join('');
        control = `<select id="af-${f.id}" data-field="${f.id}"${dataReq}${dis}><option value="">Select...</option>${optHtml}</select>`;
    } else {
        control = `<input type="${f.type}" id="af-${f.id}" data-field="${f.id}" value="${escapeHtml(v)}"${dataReq}${dis} />`;
    }
    return `
        <div class="form-field">
            <label for="af-${f.id}">${escapeHtml(f.label)}${req}</label>
            ${control}
            <div class="field-error" id="af-${f.id}-error"></div>
        </div>`;
}

function attachActivityEditorListeners() {
    const s = activityEditor;
    document.getElementById('editorBackBtn').addEventListener('click', () => editorCancel());
    document.getElementById('editorCancelBtn').addEventListener('click', () => editorCancel());

    const changeBtn = document.getElementById('changeActivityBtn');
    if (changeBtn) changeBtn.addEventListener('click', editorChangeActivity);

    document.querySelectorAll('#activityStepper .stepper-item').forEach(btn => {
        btn.addEventListener('click', () => editorGoToStep(parseInt(btn.getAttribute('data-step'))));
    });

    const backStep = document.getElementById('editorBackStepBtn');
    if (backStep) backStep.addEventListener('click', () => editorGoToStep(s.step - 1));

    const continueBtn = document.getElementById('editorContinueBtn');
    if (continueBtn) continueBtn.addEventListener('click', () => editorGoToStep(s.step + 1));

    const saveDraft = document.getElementById('editorSaveDraftBtn');
    if (saveDraft) saveDraft.addEventListener('click', editorSaveDraft);

    const publish = document.getElementById('editorPublishBtn');
    if (publish) publish.addEventListener('click', editorPublish);

    bindEditorFieldInputs();
    if (window.lucide) window.lucide.createIcons();
}

function bindEditorFieldInputs() {
    document.querySelectorAll('#editorStepBody [data-field]').forEach(el => {
        const handler = () => {
            activityEditor.data[el.getAttribute('data-field')] = el.value;
            activityEditor.dirty = JSON.stringify(activityEditor.data) !== activityEditor.originalData;
        };
        el.addEventListener('input', handler);
        el.addEventListener('change', handler);
    });
}

function currentStepKey() {
    const cfg = getActivityConfig(activityEditor.configId);
    return editorSteps(cfg)[activityEditor.step].key;
}

function stepMissingRequired(stepKey) {
    const cfg = getActivityConfig(activityEditor.configId);
    const section = cfg.sections.find(sec => sec.key === stepKey);
    if (!section) return [];
    return section.fields.filter(f => f.required && (activityEditor.data[f.id] == null || String(activityEditor.data[f.id]).trim() === ''));
}

function editorGoToStep(target) {
    const cfg = getActivityConfig(activityEditor.configId);
    const steps = editorSteps(cfg);
    if (target < 0 || target >= steps.length) return;

    // Mark the step we are leaving as visited and flag missing required data (amber, not red).
    const leavingKey = currentStepKey();
    activityEditor.visited[leavingKey] = true;
    activityEditor.stepIssues = activityEditor.stepIssues || {};
    if (!activityEditor.viewOnly && leavingKey !== '__review') {
        activityEditor.stepIssues[leavingKey] = stepMissingRequired(leavingKey).length > 0;
    }

    activityEditor.step = target;
    document.getElementById('editorStepBody').innerHTML = renderEditorStep();
    refreshStepper();
    rebuildEditorActions();
    bindEditorFieldInputs();
    document.getElementById('editorValidationSummary').innerHTML = '';
    if (window.lucide) window.lucide.createIcons();
    document.querySelector('.activity-editor').scrollIntoView({ block: 'start', behavior: 'smooth' });
}

function refreshStepper() {
    const cfg = getActivityConfig(activityEditor.configId);
    const steps = editorSteps(cfg);
    const stepper = document.getElementById('activityStepper');
    stepper.querySelectorAll('.stepper-item').forEach((btn, i) => {
        const key = steps[i].key;
        btn.classList.toggle('current', i === activityEditor.step);
        btn.classList.toggle('done', !!activityEditor.visited[key] && i !== activityEditor.step);
        btn.classList.toggle('attention', !!(activityEditor.stepIssues && activityEditor.stepIssues[key]));
        const idx = btn.querySelector('.stepper-index');
        if (activityEditor.visited[key] && i !== activityEditor.step) idx.innerHTML = "<i data-lucide='check'></i>";
        else idx.textContent = (i + 1);
    });
}

function rebuildEditorActions() {
    const s = activityEditor;
    const cfg = getActivityConfig(s.configId);
    const steps = editorSteps(cfg);
    const right = document.querySelector('.editor-actions-right');
    let html = '';
    if (s.step > 0) html += '<button type="button" class="btn btn-secondary" id="editorBackStepBtn">Back</button>';
    if (!s.viewOnly) html += '<button type="button" class="btn btn-secondary" id="editorSaveDraftBtn">Save Draft</button>';
    html += renderEditorPrimaryAction();
    right.innerHTML = html;

    const backStep = document.getElementById('editorBackStepBtn');
    if (backStep) backStep.addEventListener('click', () => editorGoToStep(s.step - 1));
    const continueBtn = document.getElementById('editorContinueBtn');
    if (continueBtn) continueBtn.addEventListener('click', () => editorGoToStep(s.step + 1));
    const saveDraft = document.getElementById('editorSaveDraftBtn');
    if (saveDraft) saveDraft.addEventListener('click', editorSaveDraft);
    const publish = document.getElementById('editorPublishBtn');
    if (publish) publish.addEventListener('click', editorPublish);
}

function editorChangeActivity() {
    const proceed = !activityEditor.dirty || confirm('Changing the activity will reset details that no longer apply. Continue?');
    if (!proceed) return;
    startActivityDiscovery();
}

function editorCancel() {
    if (activityEditor && activityEditor.dirty && !activityEditor.viewOnly) {
        const proceed = confirm('Discard your changes and return to My Activities?');
        if (!proceed) return;
    }
    activityEditor = null;
    showActivitiesView('list');
}

function editorSaveDraft() {
    persistActivity('draft');
    showToast('Draft saved successfully.', 'success');
    activityEditor = null;
    showActivitiesView('list');
}

function editorPublish() {
    const cfg = getActivityConfig(activityEditor.configId);
    const issuesBySection = [];
    cfg.sections.forEach(section => {
        const missing = section.fields.filter(f => f.required && (activityEditor.data[f.id] == null || String(activityEditor.data[f.id]).trim() === ''));
        if (missing.length > 0) {
            issuesBySection.push({ key: section.key, title: section.title, fields: missing });
            activityEditor.stepIssues = activityEditor.stepIssues || {};
            activityEditor.stepIssues[section.key] = true;
        }
    });

    if (issuesBySection.length > 0) {
        renderValidationSummary(issuesBySection);
        refreshStepper();
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    persistActivity('published');
    showToast('Activity published successfully.', 'success');
    activityEditor = null;
    showActivitiesView('list');
}

function renderValidationSummary(issuesBySection) {
    const cfg = getActivityConfig(activityEditor.configId);
    const steps = editorSteps(cfg);
    const summary = document.getElementById('editorValidationSummary');
    summary.innerHTML = `
        <div class="validation-summary">
            <div class="validation-summary-title"><i data-lucide="alert-triangle"></i> Please complete the required fields before publishing</div>
            <ul>
                ${issuesBySection.map(sec => {
                    const stepIndex = steps.findIndex(st => st.key === sec.key);
                    return `<li><button type="button" class="validation-link" data-goto-step="${stepIndex}">${escapeHtml(sec.title)}</button>: ${sec.fields.map(f => escapeHtml(f.label)).join(', ')}</li>`;
                }).join('')}
            </ul>
        </div>`;
    summary.querySelectorAll('button[data-goto-step]').forEach(btn => {
        btn.addEventListener('click', () => {
            editorGoToStep(parseInt(btn.getAttribute('data-goto-step')));
            // Show inline errors on the target section fields.
            highlightMissingInStep();
        });
    });
    if (window.lucide) window.lucide.createIcons();
    summary.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function highlightMissingInStep() {
    const missing = stepMissingRequired(currentStepKey());
    missing.forEach(f => {
        const input = document.getElementById(`af-${f.id}`);
        const err = document.getElementById(`af-${f.id}-error`);
        if (input) input.classList.add('invalid');
        if (err) err.textContent = 'This field is required.';
    });
}

function persistActivity(state) {
    const s = activityEditor;
    const today = new Date().toISOString().slice(0, 10);
    if (s.id) {
        const existing = mockData.activities.find(a => a.id === s.id);
        existing.configId = s.configId;
        existing.data = Object.assign({}, s.data);
        existing.state = state;
        existing.updated = today;
    } else {
        mockData.activities.push({
            id: Math.max(0, ...mockData.activities.map(a => a.id)) + 1,
            configId: s.configId,
            state: state,
            data: Object.assign({}, s.data),
            updated: today
        });
    }
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
