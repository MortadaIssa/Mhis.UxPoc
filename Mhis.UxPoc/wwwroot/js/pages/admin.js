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

            <div class="section-card">
                <div class="section-header">
                    <h3>Needs Your Attention</h3>
                </div>
                <div class="section-content">
                    <div class="summary-tiles">
                        <div class="tile tile-action" data-admin-tile="registrations">
                            <div class="tile-icon"><i data-lucide="file-check"></i></div>
                            <div class="tile-value">${pending}</div>
                            <div class="tile-label">New Organization Registrations</div>
                        </div>
                        <div class="tile tile-action" data-admin-tile="event-reviews">
                            <div class="tile-icon"><i data-lucide="calendar-check"></i></div>
                            <div class="tile-value">${eventsPending}</div>
                            <div class="tile-label">Events to Review</div>
                        </div>
                        <div class="tile tile-action" data-admin-tile="facility-duplicates">
                            <div class="tile-icon"><i data-lucide="git-merge"></i></div>
                            <div class="tile-value">${duplicatesPending}</div>
                            <div class="tile-label">Potential Duplicate Facilities</div>
                        </div>
                        <div class="tile tile-action" data-admin-tile="pending-custom-values">
                            <div class="tile-icon"><i data-lucide="list-plus"></i></div>
                            <div class="tile-value">${customValuesPending}</div>
                            <div class="tile-label">Pending Custom Values</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <h3>Quick Actions</h3>
                </div>
                <div class="section-content">
                    <div class="resource-card-grid">
                        <button type="button" class="resource-card" id="adminRegistrationsBtn">
                            <div class="resource-card-icon"><i data-lucide="file-check"></i></div>
                            <div class="resource-card-label">Review Organization Registrations</div>
                            <div class="resource-card-description">Approve or reject pending organization applications.</div>
                        </button>
                        <button type="button" class="resource-card" id="adminOrganizationManagementBtn">
                            <div class="resource-card-icon"><i data-lucide="building-2"></i></div>
                            <div class="resource-card-label">Organization Management</div>
                            <div class="resource-card-description">Check an organization's profile, facilities, and providers.</div>
                        </button>
                        <button type="button" class="resource-card" id="adminUserManagementBtn">
                            <div class="resource-card-icon"><i data-lucide="users-round"></i></div>
                            <div class="resource-card-label">User Management</div>
                            <div class="resource-card-description">Manage organization accounts and access.</div>
                        </button>
                        <button type="button" class="resource-card" id="adminCreateAnnouncementBtn">
                            <div class="resource-card-icon"><i data-lucide="megaphone"></i></div>
                            <div class="resource-card-label">Create Announcement</div>
                            <div class="resource-card-description">Compose and send a message to organizations.</div>
                        </button>
                    </div>
                </div>
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
    document.getElementById('adminOrganizationManagementBtn')?.addEventListener('click', () => navigateTo('organization-management'));
    document.getElementById('adminUserManagementBtn')?.addEventListener('click', () => navigateTo('user-management'));
    document.getElementById('adminCreateAnnouncementBtn')?.addEventListener('click', () => openComposeAnnouncementForm());

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
                <td>
                    ${escapeHtml(r.email || '—')}
                    ${r.status === REGISTRATION_STATUS.pendingReview && findPersonalEmailMatch(r)
                        ? '<div class="cell-flag"><i data-lucide="triangle-alert"></i><span>Possible personal email</span></div>'
                        : ''}
                </td>
                <td>${escapeHtml(r.submittedDate || 'Not submitted')}</td>
                <td><span class="reg-status reg-status-${registrationStatusClass(r.status)}"><i data-lucide="${registrationStatusIcon(r.status)}"></i><span>${escapeHtml(r.status)}</span></span></td>
                <td class="actions-cell">
                    ${r.status === REGISTRATION_STATUS.incomplete
                        ? ''
                        : r.status === REGISTRATION_STATUS.pendingReview
                            ? `<button type="button" class="icon-action" title="Review" aria-label="Review ${escapeHtml(r.organization)}" data-review="${r.id}"><i data-lucide="file-check"></i></button>`
                            : `<button type="button" class="icon-action" title="View" aria-label="View ${escapeHtml(r.organization)}" data-review="${r.id}"><i data-lucide="eye"></i></button>`}
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
                        <th>Email</th>
                        <th>Submitted</th>
                        <th>Registration Status</th>
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

// ===== Possible personal email =====
// A pattern cannot tell a shared mailbox (info@ngo.org) from a person's
// address on the same domain (yourname@ngo.org). Instead, the sign-in email
// is compared with the people named in the same profile: if it contains the
// director's or a focal person's name, NMHP is warned before approving.
const PERSON_NAME_TITLES = ['dr', 'mr', 'mrs', 'ms', 'prof', 'eng'];

function getPersonNameParts(name) {
    return (name || '')
        .toLowerCase()
        .split(/[\s.\-']+/)
        .map(part => part.replace(/[^a-z]/g, ''))
        .filter(part => part.length >= 3 && !PERSON_NAME_TITLES.includes(part));
}

function findPersonalEmailMatch(registration) {
    const email = registration.email || '';
    const localPart = email.split('@')[0].toLowerCase().replace(/[^a-z]/g, '');
    if (!localPart) {
        return null;
    }
    const people = [{ name: registration.directorName, role: 'Director' }]
        .concat((registration.focalPersons || []).map(f => ({ name: f.name, role: `${f.area} Focal Person` })));
    return people.find(person => getPersonNameParts(person.name).some(part => localPart.includes(part))) || null;
}

function renderPersonalEmailWarning(registration) {
    const match = findPersonalEmailMatch(registration);
    if (!match) {
        return '';
    }
    return `
        <div class="warning-banner" role="status">
            <i data-lucide="triangle-alert"></i>
            <span><strong>Possible personal email.</strong> The sign-in email ${escapeHtml(registration.email)} matches the name of ${escapeHtml(match.name)} (${escapeHtml(match.role)}). Organizations must sign in with a shared organization address, so check it before approving.</span>
        </div>`;
}

function renderRegistrationReviewPage() {
    const r = getRegistrationById(adminView.selectedRegistrationId);
    if (!r) {
        return renderOrganizationRegistrationsPage();
    }

    const values = {
        name: r.organization, acronym: r.acronym, phone: r.phone, mobile: r.mobile, email: r.email,
        directorName: r.directorName, directorEmail: r.directorEmail, directorMobile: r.directorMobile,
        sectors: r.sectors, website: r.website, linkedin: r.linkedin, daleelMadani: r.daleelMadani
    };

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
            <div class="page-header page-header-start">
                <h1 class="page-title">${escapeHtml(r.organization)}</h1>
                ${renderRegStatusPill(r.status)}
            </div>
            <p class="status-text">Submitted registration details are read-only. NMHP can approve or reject the registration but cannot change the submitted information.</p>
            ${r.submittedDate ? `<p class="status-text">Submitted on ${escapeHtml(r.submittedDate)}.</p>` : ''}
            ${r.status === REGISTRATION_STATUS.pendingReview ? renderPersonalEmailWarning(r) : ''}

            <div class="profile-form">
                ${renderOrgProfileFields(values, true)}
            </div>

            ${renderFocalPersonsSection(r.focalPersons, true)}

            ${actionsHTML}
        </div>`;
}

function attachRegistrationReviewListeners() {
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
