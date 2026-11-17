// ===== Administrator: Organization Management =====
// A read-only, per-organization view of everything an approved organization
// has entered: its profile, its facilities and its providers. This is where
// NMHP checks an organization's data; registration review and account access
// stay on their own pages.
let organizationManagementView = {
    search: '',
    selectedId: null,
    tab: 'profile'
};

function getManagedOrganizations() {
    // The "Existing NGO" demo account uses the standard mock organization and
    // is not tracked in demoState.registrations (same as User Management).
    const p = mockData.organizationProfile;
    const organizations = [{
        id: 'existing',
        name: p.name,
        acronym: p.acronym,
        email: p.email,
        accountAccess: userManagementView.existingNgoAccess,
        profile: p,
        focalPersons: mockData.focalPersons,
        facilities: mockData.facilities,
        providers: mockData.providers
    }];

    getRegistrations()
        .filter(r => r.status === REGISTRATION_STATUS.approved)
        .forEach(r => {
            const records = mockData.organizationRecords[r.organization] || { facilities: [], providers: [] };
            organizations.push({
                id: `reg-${r.id}`,
                name: r.organization,
                acronym: r.acronym,
                email: r.email,
                accountAccess: r.accountAccess,
                profile: {
                    name: r.organization, acronym: r.acronym, phone: r.phone, mobile: r.mobile, email: r.email,
                    directorName: r.directorName, directorEmail: r.directorEmail, directorMobile: r.directorMobile,
                    sectors: r.sectors, website: r.website, linkedin: r.linkedin, daleelMadani: r.daleelMadani
                },
                focalPersons: r.focalPersons,
                facilities: records.facilities,
                providers: records.providers
            });
        });

    return organizations;
}

function getManagedOrganizationById(id) {
    return getManagedOrganizations().find(o => o.id === id) || null;
}

function getFilteredManagedOrganizations() {
    const query = organizationManagementView.search.trim().toLowerCase();
    return getManagedOrganizations().filter(o => !query
        || o.name.toLowerCase().includes(query)
        || (o.acronym || '').toLowerCase().includes(query)
        || (o.email || '').toLowerCase().includes(query));
}

// ---------- Organization list ----------
function renderOrganizationManagementPage() {
    const records = getFilteredManagedOrganizations();
    const rowsHTML = records.length
        ? records.map(o => `
            <tr>
                <td>
                    <div class="cell-primary">${escapeHtml(o.name)}</div>
                    <div class="cell-secondary">${escapeHtml(o.acronym || '')}</div>
                </td>
                <td>${escapeHtml(o.email || '-')}</td>
                <td>${o.facilities.length}</td>
                <td>${o.providers.length}</td>
                <td>${renderAccountAccessPill(o.accountAccess)}</td>
                <td class="actions-cell">
                    <button type="button" class="icon-action" title="View Organization" aria-label="View ${escapeHtml(o.name)}" data-view-organization="${o.id}"><i data-lucide="eye"></i></button>
                </td>
            </tr>`).join('')
        : '<tr><td colspan="6" class="empty-cell">No organizations match the current search.</td></tr>';

    return `
        <div class="page">
            <div class="page-header">
                <div>
                    <h1 class="page-title">Organization Management</h1>
                    <p class="page-lead">Open an approved organization to check its profile, facilities, and providers.</p>
                </div>
            </div>
            <div class="list-toolbar">
                <div class="search-group">
                    <i data-lucide="search"></i>
                    <input type="search" id="organizationManagementSearch" placeholder="Search organizations by name or email..." aria-label="Search organizations" value="${escapeHtml(organizationManagementView.search)}" />
                </div>
            </div>
            <div class="result-count">${records.length} organization${records.length === 1 ? '' : 's'}</div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Email</th>
                        <th>Facilities</th>
                        <th>Providers</th>
                        <th>Account Access</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
            </table>
        </div>`;
}

function attachOrganizationManagementListeners() {
    document.getElementById('organizationManagementSearch').addEventListener('input', (e) => {
        organizationManagementView.search = e.target.value;
        renderPage('organization-management');
        document.getElementById('organizationManagementSearch').focus();
    });

    document.querySelectorAll('[data-view-organization]').forEach(btn => {
        btn.addEventListener('click', () => {
            organizationManagementView.selectedId = btn.getAttribute('data-view-organization');
            organizationManagementView.tab = 'profile';
            navigateTo('organization-detail');
        });
    });
}

// ---------- Organization detail (read-only) ----------
const ORGANIZATION_FACILITY_FIELDS = [
    ['Facility Name', 'name'], ['Facility Type', 'type'], ['Governorate', 'governorate'],
    ['Caza', 'caza'], ['Locality', 'locality'], ['Contact Number', 'contact']
];

const ORGANIZATION_PROVIDER_FIELDS = [
    ['Provider Name', 'name'], ['Provider Type / Profession', 'type'],
    ['Facility', 'facility'], ['Phone', 'phone'], ['Email', 'email']
];

function renderOrganizationRecordsTable(kind, fields, records, emptyText) {
    const rowsHTML = records.length
        ? records.map((record, index) => `
            <tr>
                ${fields.map(([, key]) => `<td>${escapeHtml(record[key] || '-')}</td>`).join('')}
                <td class="actions-col">
                    <button type="button" class="icon-action" title="View Details" aria-label="View details" data-org-record="${kind}" data-org-record-index="${index}"><i data-lucide="eye"></i></button>
                </td>
            </tr>`).join('')
        : `<tr><td colspan="${fields.length + 1}" class="empty-cell">${escapeHtml(emptyText)}</td></tr>`;

    return `
        <div class="list-toolbar organization-records-toolbar">
            <div class="result-count">${records.length} ${kind === 'facility' ? `facilit${records.length === 1 ? 'y' : 'ies'}` : `provider${records.length === 1 ? '' : 's'}`}</div>
            <button type="button" class="btn btn-secondary" data-org-export="${kind}">
                <i data-lucide="download"></i><span>Export</span>
            </button>
        </div>
        <table class="data-table">
            <thead>
                <tr>${fields.map(([label]) => `<th>${escapeHtml(label)}</th>`).join('')}<th class="actions-col">Actions</th></tr>
            </thead>
            <tbody>${rowsHTML}</tbody>
        </table>`;
}

// The organization's sign-in accounts. Access is managed in User Management.
function renderOrganizationUsersTable(org) {
    const users = getUsersOfOrganization(org.id);
    const rowsHTML = users.length
        ? users.map(u => `
            <tr>
                <td class="cell-primary">${escapeHtml(u.email)}</td>
                <td>${escapeHtml(u.role)}</td>
                <td>${renderAccountAccessPill(u.accountAccess)}</td>
            </tr>`).join('')
        : '<tr><td colspan="3" class="empty-cell">This organization has no users.</td></tr>';

    return `
        <div class="list-toolbar organization-records-toolbar">
            <div class="result-count">${users.length} user${users.length === 1 ? '' : 's'}</div>
            <button type="button" class="btn btn-secondary" id="manageOrganizationUsersBtn">
                <i data-lucide="users-round"></i><span>Manage in User Management</span>
            </button>
        </div>
        <table class="data-table">
            <thead>
                <tr><th>User (Sign-in Email)</th><th>Role</th><th>Account Access</th></tr>
            </thead>
            <tbody>${rowsHTML}</tbody>
        </table>`;
}

function renderOrganizationDetailPage() {
    const org = getManagedOrganizationById(organizationManagementView.selectedId);
    if (!org) {
        return renderOrganizationManagementPage();
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: 'building-2' },
        { id: 'facilities', label: `Facilities (${org.facilities.length})`, icon: 'building' },
        { id: 'providers', label: `Providers (${org.providers.length})`, icon: 'users' },
        { id: 'users', label: `Users (${getUsersOfOrganization(org.id).length})`, icon: 'users-round' }
    ];
    const activeTab = organizationManagementView.tab;

    const tabsHTML = tabs.map(tab => `
        <button class="tab ${tab.id === activeTab ? 'active' : ''}" data-organization-tab="${tab.id}">
            <i data-lucide="${tab.icon}"></i>
            <span>${escapeHtml(tab.label)}</span>
        </button>`).join('');

    return `
        <div class="page">
            <div class="page-header page-header-start">
                <h1 class="page-title">${escapeHtml(org.name)}</h1>
                ${renderAccountAccessPill(org.accountAccess)}
            </div>

            <div class="tabs">${tabsHTML}</div>

            <div class="tab-panel ${activeTab === 'profile' ? 'active' : ''}" data-organization-panel="profile">
                <div class="profile-form">
                    ${renderOrgProfileFields(org.profile, true)}
                </div>
                ${renderFocalPersonsSection(org.focalPersons, true)}
            </div>

            <div class="tab-panel ${activeTab === 'facilities' ? 'active' : ''}" data-organization-panel="facilities">
                ${renderOrganizationRecordsTable('facility', ORGANIZATION_FACILITY_FIELDS, org.facilities, 'This organization has not added any facilities yet.')}
            </div>

            <div class="tab-panel ${activeTab === 'providers' ? 'active' : ''}" data-organization-panel="providers">
                ${renderOrganizationRecordsTable('provider', ORGANIZATION_PROVIDER_FIELDS, org.providers, 'This organization has not added any providers yet.')}
            </div>

            <div class="tab-panel ${activeTab === 'users' ? 'active' : ''}" data-organization-panel="users">
                ${renderOrganizationUsersTable(org)}
            </div>
        </div>`;
}

function attachOrganizationDetailListeners() {
    const org = getManagedOrganizationById(organizationManagementView.selectedId);
    if (!org) {
        attachOrganizationManagementListeners();
        return;
    }

    document.querySelectorAll('[data-organization-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-organization-tab');
            organizationManagementView.tab = id;
            document.querySelectorAll('[data-organization-tab]').forEach(t => t.classList.toggle('active', t === btn));
            document.querySelectorAll('[data-organization-panel]').forEach(p => {
                p.classList.toggle('active', p.getAttribute('data-organization-panel') === id);
            });
        });
    });

    document.querySelectorAll('[data-org-record]').forEach(btn => {
        btn.addEventListener('click', () => {
            const isFacility = btn.getAttribute('data-org-record') === 'facility';
            const index = Number(btn.getAttribute('data-org-record-index'));
            const record = (isFacility ? org.facilities : org.providers)[index];
            const fields = isFacility ? ORGANIZATION_FACILITY_FIELDS : ORGANIZATION_PROVIDER_FIELDS;
            openFormModal(isFacility ? 'Facility Details' : 'Provider Details',
                `<dl class="detail-list">${fields.map(([label, key]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(record[key] || '-')}</dd></div>`).join('')}</dl>`,
                `<button class="modal-btn" id="detailCloseBtn">Close</button>`);
            document.getElementById('detailCloseBtn').addEventListener('click', closeFormModal);
        });
    });

    document.getElementById('manageOrganizationUsersBtn')?.addEventListener('click', () => {
        userManagementView.search = '';
        userManagementView.accessFilter = '';
        userManagementView.organizationFilter = org.name;
        navigateTo('user-management');
    });

    document.querySelectorAll('[data-org-export]').forEach(btn => {
        btn.addEventListener('click', () => {
            const kind = btn.getAttribute('data-org-export') === 'facility' ? 'facilities' : 'providers';
            showToast(`Exporting ${org.name}'s ${kind} is simulated in this POC.`, 'info');
        });
    });
}
