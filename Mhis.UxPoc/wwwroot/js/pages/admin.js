// ===== Administrator: organization registrations =====
let adminView = {
    selectedRegistrationId: null,
    statusFilter: '',
    search: ''
};

function renderAdminHomePage() {
    const pending = countRegistrationsByStatus(REGISTRATION_STATUS.pendingReview);
    const eventsPending = countEventReviewsByStatus(EVENT_REVIEW_STATUS.pendingReview);
    const duplicatesPending = countFacilityDuplicatesByStatus(FACILITY_DUPLICATE_STATUS.pendingReview);
    const customValuesPending = countPendingCustomValuesByStatus(CUSTOM_VALUE_STATUS.pendingReview);
    return `
        <div class="home-page">
            <div class="welcome-section">
                <h1 class="welcome-heading">Welcome, NMHP Administrator</h1>
            </div>

            <div class="summary-tiles">
                <div class="tile tile-action" data-admin-tile="registrations">
                    <div class="tile-label">New Organization Registrations</div>
                    <div class="tile-value">${pending}</div>
                </div>
                <div class="tile tile-action" data-admin-tile="event-reviews">
                    <div class="tile-label">Events to Review</div>
                    <div class="tile-value">${eventsPending}</div>
                </div>
                <div class="tile tile-action" data-admin-tile="facility-duplicates">
                    <div class="tile-label">Potential Duplicate Facilities</div>
                    <div class="tile-value">${duplicatesPending}</div>
                </div>
                <div class="tile tile-action" data-admin-tile="pending-custom-values">
                    <div class="tile-label">Pending Custom Values</div>
                    <div class="tile-value">${customValuesPending}</div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-primary" id="adminRegistrationsBtn">
                    <i data-lucide="file-check"></i><span>Review Organization Registrations</span>
                </button>
                <button class="btn btn-secondary" id="adminUserManagementBtn">
                    <i data-lucide="users-round"></i><span>User Management</span>
                </button>
                <button class="btn btn-secondary" id="adminCreateAnnouncementBtn">
                    <i data-lucide="megaphone"></i><span>Create Announcement</span>
                </button>
            </div>
        </div>`;
}

function attachAdminHomeListeners() {
    const goToRegistrations = () => {
        adminView.statusFilter = REGISTRATION_STATUS.pendingReview;
        navigateTo('organization-registrations');
    };
    document.getElementById('adminRegistrationsBtn')?.addEventListener('click', goToRegistrations);
    document.querySelector('[data-admin-tile="registrations"]')?.addEventListener('click', goToRegistrations);
    document.getElementById('adminUserManagementBtn')?.addEventListener('click', () => navigateTo('user-management'));
    document.getElementById('adminCreateAnnouncementBtn')?.addEventListener('click', () => navigateTo('audience-groups'));

    document.querySelector('[data-admin-tile="event-reviews"]')?.addEventListener('click', () => {
        reviewsView.eventStatusFilter = EVENT_REVIEW_STATUS.pendingReview;
        navigateTo('event-reviews');
    });
    document.querySelector('[data-admin-tile="facility-duplicates"]')?.addEventListener('click', () => {
        reviewsView.duplicateStatusFilter = FACILITY_DUPLICATE_STATUS.pendingReview;
        navigateTo('facility-duplicates');
    });
    document.querySelector('[data-admin-tile="pending-custom-values"]')?.addEventListener('click', () => {
        reviewsView.customValueStatusFilter = CUSTOM_VALUE_STATUS.pendingReview;
        navigateTo('pending-custom-values');
    });
}

function getFilteredRegistrations() {
    const query = adminView.search.trim().toLowerCase();
    return getRegistrations().filter(r => {
        const matchesStatus = !adminView.statusFilter || r.status === adminView.statusFilter;
        const matchesQuery = !query || r.organization.toLowerCase().includes(query) || (r.acronym || '').toLowerCase().includes(query);
        return matchesStatus && matchesQuery;
    });
}

function renderOrganizationRegistrationsPage() {
    const records = getFilteredRegistrations();
    const rowsHTML = records.length
        ? records.map(r => `
            <tr>
                <td>
                    <div class="cell-primary">${escapeHtml(r.organization)}</div>
                    <div class="cell-secondary">${escapeHtml(r.acronym || '')}</div>
                </td>
                <td>${escapeHtml(r.submittedDate || 'Not submitted')}</td>
                <td><span class="reg-status reg-status-${registrationStatusClass(r.status)}"><i data-lucide="${registrationStatusIcon(r.status)}"></i><span>${escapeHtml(r.status)}</span></span></td>
                <td>${escapeHtml(r.accountAccess)}</td>
                <td class="actions-cell">
                    <button type="button" class="btn btn-link" data-review="${r.id}">Review</button>
                </td>
            </tr>`).join('')
        : '<tr><td colspan="5" class="empty-cell">No registrations match the current filters.</td></tr>';

    const statusOptions = [
        REGISTRATION_STATUS.incomplete,
        REGISTRATION_STATUS.pendingReview,
        REGISTRATION_STATUS.approved,
        REGISTRATION_STATUS.rejected
    ];

    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Organization Registrations</h1>
            </div>
            <div class="list-toolbar">
                <div class="search-group">
                    <i data-lucide="search"></i>
                    <input type="search" id="registrationSearch" placeholder="Search organizations..." aria-label="Search organizations" value="${escapeHtml(adminView.search)}" />
                </div>
                ${renderSelect('registrationStatusFilter', 'Registration Status', statusOptions, adminView.statusFilter)}
            </div>
            <div class="result-count">${records.length} registration${records.length === 1 ? '' : 's'}</div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Submitted</th>
                        <th>Registration Status</th>
                        <th>Account Access</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
            </table>
        </div>`;
}

function attachOrganizationRegistrationsListeners() {
    document.getElementById('registrationSearch').addEventListener('input', (e) => {
        adminView.search = e.target.value;
        renderPage('organization-registrations');
        document.getElementById('registrationSearch').focus();
    });

    document.getElementById('registrationStatusFilter').addEventListener('change', (e) => {
        adminView.statusFilter = e.target.value;
        renderPage('organization-registrations');
    });

    document.querySelectorAll('[data-review]').forEach(btn => {
        btn.addEventListener('click', () => {
            adminView.selectedRegistrationId = Number(btn.getAttribute('data-review'));
            navigateTo('registration-review');
        });
    });
}

function renderRegistrationReviewPage() {
    const r = getRegistrationById(adminView.selectedRegistrationId);
    if (!r) {
        return renderOrganizationRegistrationsPage();
    }

    const row = (label, value) => `
        <div class="detail-row">
            <div class="detail-label">${escapeHtml(label)}</div>
            <div class="detail-value">${escapeHtml(value || '-')}</div>
        </div>`;

    const focalHTML = r.focalPersons.map(f => `
        <tr>
            <td>${escapeHtml(f.area)}</td>
            <td>${escapeHtml(f.name || '-')}</td>
            <td>${escapeHtml(f.email || '-')}</td>
            <td>${escapeHtml(f.mobile || '-')}</td>
        </tr>`).join('');

    let actionsHTML = '';
    if (r.status === REGISTRATION_STATUS.pendingReview) {
        actionsHTML = `
            <div class="form-actions">
                <button type="button" class="btn btn-primary" id="approveRegistrationBtn">Approve</button>
                <button type="button" class="btn btn-secondary" id="rejectRegistrationBtn">Reject</button>
            </div>`;
    } else if (r.status === REGISTRATION_STATUS.rejected) {
        actionsHTML = `
            <div class="reason-box">
                <div class="reason-box-label">Rejection reason sent to the organization</div>
                <p>${escapeHtml(r.rejectionReason)}</p>
            </div>`;
    } else if (r.status === REGISTRATION_STATUS.incomplete) {
        actionsHTML = '<div class="info-banner">This organization has not submitted its profile yet.</div>';
    } else {
        actionsHTML = '<div class="info-banner">This registration has been approved.</div>';
    }

    return `
        <div class="page">
            <button type="button" class="link-back" id="registrationBackBtn"><i data-lucide="arrow-left"></i> Back to Organization Registrations</button>
            <div class="page-header">
                <h1 class="page-title">${escapeHtml(r.organization)}</h1>
                ${renderRegStatusPill(r.status)}
            </div>
            <p class="status-text">Submitted registration details are read-only. NMHP can approve or reject the registration but cannot change the submitted information.</p>

            <section class="profile-section">
                <h2 class="profile-section-title">General Information</h2>
                ${row('Organization Name', r.organization)}
                ${row('Acronym', r.acronym)}
                ${row('Institution Phone Number', r.phone)}
                ${row('Institution Mobile Number', r.mobile)}
                ${row('Institution Email', r.email)}
                ${row('Director Name', r.directorName)}
                ${row('Director Email', r.directorEmail)}
                ${row('Director Mobile Number', r.directorMobile)}
                ${row('Sectors / Areas of Responsibility', r.sectors)}
                ${row('Organization Website', r.website)}
                ${row('Submitted', r.submittedDate)}
                ${row('Account Access', r.accountAccess)}
            </section>

            <section class="profile-section">
                <h2 class="profile-section-title">Focal Persons</h2>
                <table class="data-table">
                    <thead>
                        <tr><th>Area</th><th>Name</th><th>Email</th><th>Mobile</th></tr>
                    </thead>
                    <tbody>${focalHTML}</tbody>
                </table>
            </section>

            ${actionsHTML}
        </div>`;
}

function attachRegistrationReviewListeners() {
    document.getElementById('registrationBackBtn')?.addEventListener('click', () => navigateTo('organization-registrations'));

    document.getElementById('approveRegistrationBtn')?.addEventListener('click', () => {
        const r = approveRegistration(adminView.selectedRegistrationId);
        showToast(`${r.organization} has been approved.`, 'success');
        renderPage('registration-review');
    });

    document.getElementById('rejectRegistrationBtn')?.addEventListener('click', () => {
        openFormModal(
            'Reject Registration',
            `<div class="form-field">
                <label for="rejectReason">Reason <span class="required">*</span></label>
                <textarea id="rejectReason" rows="4"></textarea>
                <div class="field-error" id="rejectReason-error"></div>
            </div>`,
            `<button type="button" class="btn btn-secondary" id="cancelRejectBtn">Cancel</button>
             <button type="button" class="btn btn-primary" id="confirmRejectBtn">Reject Registration</button>`
        );

        document.getElementById('cancelRejectBtn').addEventListener('click', closeFormModal);
        document.getElementById('confirmRejectBtn').addEventListener('click', () => {
            const reason = document.getElementById('rejectReason').value.trim();
            if (!reason) {
                document.getElementById('rejectReason-error').textContent = 'A reason is required.';
                return;
            }
            const r = rejectRegistration(adminView.selectedRegistrationId, reason);
            closeFormModal();
            showToast(`${r.organization} has been rejected.`, 'success');
            renderPage('registration-review');
        });
    });
}
