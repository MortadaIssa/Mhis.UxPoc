// ===== Administrator: Organizations & Users (account access, separate from registration review) =====
let orgUsersView = {
    search: '',
    accessFilter: ''
};

function getFilteredOrgUsers() {
    const query = orgUsersView.search.trim().toLowerCase();
    return getRegistrations().filter(r => {
        if (r.status !== REGISTRATION_STATUS.approved) {
            return false;
        }
        const matchesAccess = !orgUsersView.accessFilter || r.accountAccess === orgUsersView.accessFilter;
        const matchesQuery = !query || r.organization.toLowerCase().includes(query) || (r.acronym || '').toLowerCase().includes(query);
        return matchesAccess && matchesQuery;
    });
}

function accountAccessClass(access) {
    return access === ACCOUNT_ACCESS.active ? 'approved' : 'incomplete';
}

function accountAccessIcon(access) {
    return access === ACCOUNT_ACCESS.active ? 'circle-check' : 'circle-alert';
}

function renderAccountAccessPill(access) {
    return `<span class="reg-status reg-status-${accountAccessClass(access)}"><i data-lucide="${accountAccessIcon(access)}"></i><span>${escapeHtml(access)}</span></span>`;
}

function renderOrganizationsUsersPage() {
    const records = getFilteredOrgUsers();
    const rowsHTML = records.length
        ? records.map(r => `
            <tr>
                <td>
                    <div class="cell-primary">${escapeHtml(r.organization)}</div>
                    <div class="cell-secondary">${escapeHtml(r.acronym || '')}</div>
                </td>
                <td>${escapeHtml(r.submittedDate || '-')}</td>
                <td>${escapeHtml(r.sectors || '-')}</td>
                <td>${renderAccountAccessPill(r.accountAccess)}</td>
                <td class="actions-cell">
                    ${r.accountAccess === ACCOUNT_ACCESS.active
                        ? `<button type="button" class="btn btn-link" data-deactivate="${r.id}">Deactivate</button>`
                        : `<button type="button" class="btn btn-link" data-activate="${r.id}">Activate</button>`}
                </td>
            </tr>`).join('')
        : '<tr><td colspan="5" class="empty-cell">No organizations match the current filters.</td></tr>';

    const accessOptions = [ACCOUNT_ACCESS.active, ACCOUNT_ACCESS.inactive];

    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Organizations & Users</h1>
            </div>
            <div class="list-toolbar">
                <div class="search-group">
                    <i data-lucide="search"></i>
                    <input type="search" id="orgUsersSearch" placeholder="Search organizations..." aria-label="Search organizations" value="${escapeHtml(orgUsersView.search)}" />
                </div>
                ${renderSelect('orgUsersAccessFilter', 'Account Access', accessOptions, orgUsersView.accessFilter)}
            </div>
            <div class="result-count">${records.length} organization${records.length === 1 ? '' : 's'}</div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Submitted</th>
                        <th>Sectors</th>
                        <th>Account Access</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
            </table>
        </div>`;
}

function attachOrganizationsUsersListeners() {
    document.getElementById('orgUsersSearch').addEventListener('input', (e) => {
        orgUsersView.search = e.target.value;
        renderPage('organizations-users');
        document.getElementById('orgUsersSearch').focus();
    });

    document.getElementById('orgUsersAccessFilter').addEventListener('change', (e) => {
        orgUsersView.accessFilter = e.target.value;
        renderPage('organizations-users');
    });

    document.querySelectorAll('[data-activate]').forEach(btn => {
        btn.addEventListener('click', () => {
            const r = activateAccountAccess(Number(btn.getAttribute('data-activate')));
            showToast(`${r.organization} has been activated.`, 'success');
            renderPage('organizations-users');
        });
    });

    document.querySelectorAll('[data-deactivate]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.getAttribute('data-deactivate'));
            const r = getRegistrationById(id);
            const confirmed = confirm(`Deactivate ${r.organization}? They will lose access to the system until reactivated.`);
            if (!confirmed) {
                return;
            }
            deactivateAccountAccess(id);
            showToast(`${r.organization} has been deactivated.`, 'success');
            renderPage('organizations-users');
        });
    });
}
