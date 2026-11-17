// ===== Navigation policy =====
const NAV_DEFINITIONS = {
    'home': { label: 'Home', icon: 'house' },
    'organization-profile': { label: 'Organization Profile', icon: 'building-2' },
    'facilities': { label: 'Facilities', icon: 'building' },
    'providers': { label: 'Providers', icon: 'users' },
    'activities': { label: 'Activities', icon: 'clipboard-list' },
    'surveys': { label: 'Surveys', icon: 'file-text' },
    'su-dashboard': { label: 'Dashboard', icon: 'layout-dashboard' },
    'my-dashboard': { label: 'Dashboard', icon: 'layout-dashboard' },
    'events-calendar': { label: 'Events Calendar', icon: 'calendar-days' },
    'resources-help': { label: 'Resources & Help', icon: 'circle-help' },
    'organization-registrations': { label: 'Organization Registrations', icon: 'file-check' },
    'event-reviews': { label: 'Event Reviews', icon: 'calendar-check' },
    'facility-duplicates': { label: 'Potential Duplicate Facilities', icon: 'git-merge' },
    'pending-custom-values': { label: 'Pending Custom Values', icon: 'list-plus' },
    'organization-management': { label: 'Organization Management', icon: 'building-2' },
    'user-management': { label: 'User Management', icon: 'users-round' },
    'audience-groups': { label: 'Audience Groups', icon: 'megaphone' },
    'announcement-history': { label: 'Announcement History', icon: 'history' },
    'whats-new-management': { label: "What's New Management", icon: 'newspaper' },
    'contact-us': { label: 'Contact Us', icon: 'mail' }
};

function getNavigationForCurrentUser() {
    if (isAdminUser()) {
        return [
            { type: 'item', page: 'home' },
            { type: 'section', label: 'Organizations & Users' },
            { type: 'item', page: 'organization-registrations', subsection: true },
            { type: 'item', page: 'organization-management', subsection: true },
            { type: 'item', page: 'user-management', subsection: true },
            { type: 'section', label: 'Reviews' },
            { type: 'item', page: 'event-reviews', subsection: true },
            { type: 'item', page: 'facility-duplicates', subsection: true },
            { type: 'item', page: 'pending-custom-values', subsection: true },
            { type: 'section', label: 'Announcements' },
            { type: 'item', page: 'audience-groups', subsection: true },
            { type: 'item', page: 'announcement-history', subsection: true }
        ];
    }

    if (!isCurrentNgoApproved()) {
        // An organization without an approved registration cannot reach the
        // operational modules yet.
        return [
            { type: 'item', page: 'home' },
            { type: 'item', page: 'organization-profile' },
            { type: 'item', page: 'resources-help' },
            { type: 'item', page: 'contact-us' }
        ];
    }

    // One shell: the platforms appear as named sidebar groups, never as
    // separate areas the user has to switch into. The Advanced Dashboard is
    // opened from the 4Ws Dashboard page, not from the sidebar.
    const substanceUse = isSubstanceUseEligible()
        ? [
            { type: 'section', label: 'Substance Use Platform' },
            { type: 'item', page: 'su-dashboard', subsection: true },
            { type: 'item', page: 'surveys', subsection: true }
        ]
        : [];

    return [
        { type: 'item', page: 'home' },
        { type: 'item', page: 'events-calendar' },
        { type: 'section', label: 'Organization' },
        { type: 'item', page: 'organization-profile', label: 'Profile', subsection: true },
        { type: 'item', page: 'facilities', subsection: true },
        { type: 'item', page: 'providers', subsection: true },
        { type: 'section', label: '4Ws Platform' },
        { type: 'item', page: 'my-dashboard', subsection: true },
        { type: 'item', page: 'activities', subsection: true },
        ...substanceUse,
        { type: 'section', label: 'Resources & Support' },
        { type: 'item', page: 'resources-help', subsection: true },
        { type: 'item', page: 'contact-us', subsection: true }
    ];
}

function getAllowedPages() {
    const pages = getNavigationForCurrentUser()
        .filter(entry => entry.type === 'item')
        .map(entry => entry.page);

    if (isAdminUser()) {
        // Reached from a list page, not from the sidebar.
        pages.push('registration-review', 'event-review', 'facility-duplicate-review', 'organization-detail');
    }
    return pages;
}

function renderSidebarNav() {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = getNavigationForCurrentUser().map(entry => {
        if (entry.type === 'section') {
            return `<div class="nav-section-title">${escapeHtml(entry.label)}</div>`;
        }
        const def = NAV_DEFINITIONS[entry.page];
        const classes = `nav-item${entry.subsection ? ' nav-subsection' : ''}${entry.page === appState.currentPage ? ' active' : ''}`;
        return `
            <a href="#" class="${classes}" data-page="${escapeHtml(entry.page)}">
                <i class="nav-icon" data-lucide="${escapeHtml(def.icon)}"></i>
                <span class="nav-label">${escapeHtml(entry.label || def.label)}</span>
            </a>`;
    }).join('');

    nav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    refreshLucideIcons();
}

// ===== Breadcrumb =====
// Pages reached from a list page (not from the sidebar) sit under that list
// page in the breadcrumb, and keep its sidebar item highlighted.
const BREADCRUMB_PARENTS = {
    'registration-review': 'organization-registrations',
    'event-review': 'event-reviews',
    'facility-duplicate-review': 'facility-duplicates',
    'organization-detail': 'organization-management'
};

function getNavEntryContext(page) {
    let section = null;
    for (const entry of getNavigationForCurrentUser()) {
        if (entry.type === 'section') {
            section = entry.label;
            continue;
        }
        if (entry.page === page) {
            return {
                // An item outside a group (Home, Events Calendar) has no
                // group in its breadcrumb.
                section: entry.subsection ? section : null,
                label: entry.label || NAV_DEFINITIONS[page].label
            };
        }
    }
    return null;
}

// The label of the view opened inside a sidebar page (a form, a detail
// view, a resource topic), or '' when the page shows its own list/landing.
function getBreadcrumbDetailLabel(page) {
    if (page === 'activities') {
        if (activitiesView.mode === 'discovery') return 'Add Activity';
        if (activitiesView.mode === 'editor' && activityEditor) {
            if (activityEditor.viewOnly) return 'View Activity';
            return activityEditor.id ? 'Edit Activity' : 'Add Activity';
        }
        return '';
    }
    if (page === 'resources-help') {
        const topic = getResourceTopic(resourcesHelpView.mode);
        return topic ? topic.label : '';
    }
    if (page === 'registration-review') {
        const r = getRegistrationById(adminView.selectedRegistrationId);
        return r ? r.organization : 'Registration Review';
    }
    if (page === 'organization-detail') {
        const org = getManagedOrganizationById(organizationManagementView.selectedId);
        return org ? org.name : 'Organization';
    }
    if (page === 'event-review') return 'Review Event';
    if (page === 'facility-duplicate-review') return 'Review Duplicate';
    return '';
}

function getBreadcrumbTrail(page) {
    if (page === 'home') {
        return [];
    }
    const navPage = BREADCRUMB_PARENTS[page] || page;
    const context = getNavEntryContext(navPage);
    if (!context) {
        return [];
    }
    const trail = [{ label: 'Home', page: 'home' }];
    if (context.section) {
        trail.push({ label: context.section });
    }
    trail.push({ label: context.label, page: navPage });
    const detail = getBreadcrumbDetailLabel(page);
    if (detail) {
        trail.push({ label: detail });
    }
    return trail;
}

function renderBreadcrumb(page) {
    const trail = getBreadcrumbTrail(page);
    if (!trail.length) {
        return '';
    }
    const parts = trail.map((crumb, index) => {
        if (index === trail.length - 1) {
            return `<span class="breadcrumb-current" aria-current="page">${escapeHtml(crumb.label)}</span>`;
        }
        if (crumb.page) {
            return `<a href="#" class="breadcrumb-link" data-crumb-page="${escapeHtml(crumb.page)}">${escapeHtml(crumb.label)}</a>`;
        }
        return `<span class="breadcrumb-text">${escapeHtml(crumb.label)}</span>`;
    });
    return `<nav class="breadcrumb" aria-label="Breadcrumb">${parts.join('<i data-lucide="chevron-right"></i>')}</nav>`;
}
