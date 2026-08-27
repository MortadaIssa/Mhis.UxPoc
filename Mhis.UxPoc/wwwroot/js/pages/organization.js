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

