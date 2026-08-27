// ===== New NGO registration lifecycle =====
function renderRegistrationStatusHomePage() {
    const registration = getCurrentRegistration();
    const orgName = registration ? registration.organization : '';

    let bodyHTML = '';
    if (registration.status === REGISTRATION_STATUS.incomplete) {
        bodyHTML = `
            <div class="section-card">
                <div class="section-header"><h3>Complete your organization profile</h3></div>
                <div class="section-content">
                    <p class="status-text">Your account has been created. Complete the organization profile and submit it so that NMHP can review your registration.</p>
                    <p class="status-text">The rest of MHIS becomes available once your registration is approved.</p>
                    <div class="action-buttons">
                        <button class="btn btn-primary" id="goToProfileBtn">
                            <i data-lucide="building-2"></i><span>Complete Organization Profile</span>
                        </button>
                    </div>
                </div>
            </div>`;
    } else if (registration.status === REGISTRATION_STATUS.pendingReview) {
        bodyHTML = `
            <div class="section-card">
                <div class="section-header"><h3>Registration submitted</h3></div>
                <div class="section-content">
                    <p class="status-text">Your organization profile was submitted on ${escapeHtml(registration.submittedDate)} and is being reviewed by NMHP.</p>
                    <p class="status-text">You will be notified once the review is complete. The remaining MHIS modules stay unavailable until then.</p>
                    <div class="action-buttons">
                        <button class="btn btn-secondary" id="goToProfileBtn">
                            <i data-lucide="eye"></i><span>View Submitted Profile</span>
                        </button>
                    </div>
                </div>
            </div>`;
    } else {
        bodyHTML = `
            <div class="section-card">
                <div class="section-header"><h3>Registration returned by NMHP</h3></div>
                <div class="section-content">
                    <div class="reason-box">
                        <div class="reason-box-label">Reason</div>
                        <p>${escapeHtml(registration.rejectionReason)}</p>
                    </div>
                    <p class="status-text">Update your organization profile and resubmit it for review.</p>
                    <div class="action-buttons">
                        <button class="btn btn-primary" id="goToProfileBtn">
                            <i data-lucide="pencil"></i><span>Update and Resubmit</span>
                        </button>
                    </div>
                </div>
            </div>`;
    }

    return `
        <div class="home-page">
            <div class="welcome-section">
                <h1 class="welcome-heading">Welcome, ${escapeHtml(orgName)}</h1>
                ${renderRegStatusPill(registration.status)}
            </div>
            ${bodyHTML}
        </div>`;
}

function attachRegistrationStatusHomeListeners() {
    document.getElementById('goToProfileBtn')?.addEventListener('click', () => navigateTo('organization-profile'));
}

function registrationStatusClass(status) {
    switch (status) {
        case REGISTRATION_STATUS.approved: return 'approved';
        case REGISTRATION_STATUS.rejected: return 'rejected';
        case REGISTRATION_STATUS.pendingReview: return 'pending';
        default: return 'incomplete';
    }
}

function registrationStatusIcon(status) {
    switch (status) {
        case REGISTRATION_STATUS.approved: return 'circle-check';
        case REGISTRATION_STATUS.rejected: return 'circle-x';
        case REGISTRATION_STATUS.pendingReview: return 'clock';
        default: return 'circle-alert';
    }
}

function renderRegStatusPill(status) {
    return `<div class="reg-status reg-status-${registrationStatusClass(status)}"><i data-lucide="${registrationStatusIcon(status)}"></i><span>${escapeHtml(status)}</span></div>`;
}

function renderRegistrationProfilePage() {
    const r = getCurrentRegistration();
    const readOnly = r.status === REGISTRATION_STATUS.pendingReview || r.status === REGISTRATION_STATUS.approved;
    const focal = area => r.focalPersons.find(f => f.area === area) || { name: '', email: '', mobile: '' };
    const fourWs = focal('4Ws');
    const substance = focal('Substance Use');

    const field = (id, label, value, required, type = 'text') => `
        <div class="form-field">
            <label for="${id}">${escapeHtml(label)}${required ? ' <span class="required">*</span>' : ''}</label>
            <input type="${type}" id="${id}" value="${escapeHtml(value || '')}"${required && !readOnly ? ' data-required="true"' : ''}${readOnly ? ' disabled' : ''} />
            <div class="field-error" id="${id}-error"></div>
        </div>`;

    let bannerHTML = '';
    if (r.status === REGISTRATION_STATUS.rejected) {
        bannerHTML = `
            <div class="reason-box">
                <div class="reason-box-label">Registration returned by NMHP</div>
                <p>${escapeHtml(r.rejectionReason)}</p>
            </div>`;
    } else if (r.status === REGISTRATION_STATUS.pendingReview) {
        bannerHTML = `<div class="info-banner">Submitted on ${escapeHtml(r.submittedDate)}. The profile cannot be changed while NMHP is reviewing it.</div>`;
    }

    const actionsHTML = readOnly ? '' : `
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">${r.status === REGISTRATION_STATUS.rejected ? 'Resubmit for Review' : 'Submit for Review'}</button>
            <button type="button" class="btn btn-secondary" id="regProfileSaveBtn">Save Draft</button>
        </div>`;

    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Organization Profile</h1>
                ${renderRegStatusPill(r.status)}
            </div>
            ${bannerHTML}
            <form id="registrationProfileForm" class="profile-form" novalidate>
                <section class="profile-section">
                    <h2 class="profile-section-title">General Information</h2>
                    <div class="form-grid">
                        ${field('reg-name', 'Organization Name', r.organization, true)}
                        ${field('reg-acronym', 'Acronym', r.acronym, false)}
                        ${field('reg-phone', 'Institution Phone Number', r.phone, true)}
                        ${field('reg-mobile', 'Institution Mobile Number', r.mobile, false)}
                        ${field('reg-email', 'Institution Email', r.email, true, 'email')}
                        ${field('reg-director-name', 'Director Name', r.directorName, true)}
                        ${field('reg-director-email', 'Director Email', r.directorEmail, true, 'email')}
                        ${field('reg-director-mobile', 'Director Mobile Number', r.directorMobile, false)}
                        ${field('reg-sectors', 'Sectors / Areas of Responsibility', r.sectors, true)}
                        ${field('reg-website', 'Organization Website', r.website, false, 'url')}
                    </div>
                </section>

                <section class="profile-section">
                    <h2 class="profile-section-title">4Ws Focal Person</h2>
                    <div class="form-grid">
                        ${field('reg-4ws-name', 'Name', fourWs.name, true)}
                        ${field('reg-4ws-email', 'Email', fourWs.email, true, 'email')}
                        ${field('reg-4ws-mobile', 'Mobile', fourWs.mobile, false)}
                    </div>
                </section>

                <section class="profile-section">
                    <h2 class="profile-section-title">Substance Use Focal Person</h2>
                    <div class="form-grid">
                        ${field('reg-su-name', 'Name', substance.name, true)}
                        ${field('reg-su-email', 'Email', substance.email, true, 'email')}
                        ${field('reg-su-mobile', 'Mobile', substance.mobile, false)}
                    </div>
                </section>

                ${actionsHTML}
            </form>
        </div>`;
}

function attachRegistrationProfileListeners() {
    const form = document.getElementById('registrationProfileForm');
    const r = getCurrentRegistration();
    const readOnly = r.status === REGISTRATION_STATUS.pendingReview || r.status === REGISTRATION_STATUS.approved;
    if (readOnly) {
        return;
    }

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => { appState.profileDirty = true; });
    });

    const collect = () => {
        r.organization = form.querySelector('#reg-name').value.trim();
        r.acronym = form.querySelector('#reg-acronym').value.trim();
        r.phone = form.querySelector('#reg-phone').value.trim();
        r.mobile = form.querySelector('#reg-mobile').value.trim();
        r.email = form.querySelector('#reg-email').value.trim();
        r.directorName = form.querySelector('#reg-director-name').value.trim();
        r.directorEmail = form.querySelector('#reg-director-email').value.trim();
        r.directorMobile = form.querySelector('#reg-director-mobile').value.trim();
        r.sectors = form.querySelector('#reg-sectors').value.trim();
        r.website = form.querySelector('#reg-website').value.trim();
        r.focalPersons = [
            {
                area: '4Ws',
                name: form.querySelector('#reg-4ws-name').value.trim(),
                email: form.querySelector('#reg-4ws-email').value.trim(),
                mobile: form.querySelector('#reg-4ws-mobile').value.trim()
            },
            {
                area: 'Substance Use',
                name: form.querySelector('#reg-su-name').value.trim(),
                email: form.querySelector('#reg-su-email').value.trim(),
                mobile: form.querySelector('#reg-su-mobile').value.trim()
            }
        ];
        saveDemoState();
    };

    document.getElementById('regProfileSaveBtn').addEventListener('click', () => {
        collect();
        appState.profileDirty = false;
        showToast('Draft saved. Submit the profile when it is complete.', 'success');
        updateTopBarIdentity();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateProfileForm(form)) {
            showToast('Complete the required fields before submitting.', 'error');
            return;
        }
        collect();
        submitRegistrationForReview(r.id);
        appState.profileDirty = false;
        updateTopBarIdentity();
        renderSidebarNav();
        showToast('Profile submitted. NMHP is reviewing your registration.', 'success');
        navigateTo('home');
    });
}

