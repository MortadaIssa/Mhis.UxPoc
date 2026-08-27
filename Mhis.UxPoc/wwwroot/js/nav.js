// ===== Navigation policy =====
const NAV_DEFINITIONS = {
    'home': { label: 'Home', icon: 'house' },
    'organization-profile': { label: 'Organization Profile', icon: 'building-2' },
    'facilities': { label: 'Facilities', icon: 'building' },
    'providers': { label: 'Providers', icon: 'users' },
    'activities': { label: 'Activities', icon: 'clipboard-list' },
    'surveys': { label: 'Surveys', icon: 'file-text' },
    'my-dashboard': { label: 'My Dashboard', icon: 'layout-dashboard' },
    'advanced-dashboard': { label: 'Advanced Dashboard', icon: 'bar-chart-3' },
    'events-calendar': { label: 'Events Calendar', icon: 'calendar-days' },
    'resources-help': { label: 'Resources & Help', icon: 'circle-help' },
    'organization-registrations': { label: 'Organization Registrations', icon: 'file-check' }
};

function getNavigationForCurrentUser() {
    if (isAdminUser()) {
        return [
            { type: 'item', page: 'home' },
            { type: 'item', page: 'organization-registrations' },
            { type: 'item', page: 'resources-help' }
        ];
    }

    if (!isCurrentNgoApproved()) {
        // An organization without an approved registration cannot reach the
        // operational modules yet.
        return [
            { type: 'item', page: 'home' },
            { type: 'item', page: 'organization-profile' },
            { type: 'item', page: 'resources-help' }
        ];
    }

    return [
        { type: 'item', page: 'home' },
        { type: 'item', page: 'organization-profile' },
        { type: 'item', page: 'facilities' },
        { type: 'item', page: 'providers' },
        { type: 'item', page: 'activities' },
        { type: 'item', page: 'surveys' },
        { type: 'section', label: 'Dashboards' },
        { type: 'item', page: 'my-dashboard', subsection: true },
        { type: 'item', page: 'advanced-dashboard', subsection: true },
        { type: 'item', page: 'events-calendar' },
        { type: 'item', page: 'resources-help' }
    ];
}

function getAllowedPages() {
    const pages = getNavigationForCurrentUser()
        .filter(entry => entry.type === 'item')
        .map(entry => entry.page);

    if (isAdminUser()) {
        // Reached from the registrations list, not from the sidebar.
        pages.push('registration-review');
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
                <span class="nav-label">${escapeHtml(def.label)}</span>
            </a>`;
    }).join('');

    nav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    refreshLucideIcons();
}

