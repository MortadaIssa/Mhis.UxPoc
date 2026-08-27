// ===== Administrator: Announcements (Audience Groups + Announcement History) =====
// An Audience Group's criteria is evaluated live against current activities,
// not stored as a static membership list — this is what lets "send to this
// group" keep working correctly as organizations' activities change over
// time, instead of the admin having to redefine the audience every time.
let announcementsView = {
    groupSearch: '',
    historyGroupFilter: ''
};

function getAnnouncementGroupById(id) {
    return mockData.announcementGroups.find(g => g.id === id);
}

function getActivityTypeLabel(configId) {
    const cfg = mockData.activityConfigs.find(c => c.id === configId);
    return cfg ? cfg.subActivity : configId;
}

function getFundingSourceOptions() {
    return [...new Set(mockData.activities.map(a => a.data.donor).filter(Boolean))];
}

function activityMatchesGroupCriteria(activity, criteria) {
    const typeOk = !criteria.activityTypes.length || criteria.activityTypes.includes(activity.configId);
    const locationOk = !criteria.locations.length || criteria.locations.includes(activity.data.governorate);
    const fundingOk = !criteria.fundingSources.length || criteria.fundingSources.includes(activity.data.donor);
    return typeOk && locationOk && fundingOk;
}

function getGroupMemberOrganizations(group) {
    const { activityTypes, locations, fundingSources, organizations } = group.criteria;
    const hasActivityFilters = activityTypes.length || locations.length || fundingSources.length;
    const viaActivities = hasActivityFilters
        ? mockData.activities.filter(a => activityMatchesGroupCriteria(a, group.criteria)).map(a => a.organization)
        : [];
    return [...new Set([...viaActivities, ...organizations])];
}

function renderGroupCriteriaSummary(group) {
    const { activityTypes, locations, fundingSources, organizations } = group.criteria;
    const parts = [];
    if (activityTypes.length) {
        parts.push(activityTypes.map(getActivityTypeLabel).join(', '));
    }
    if (locations.length) {
        parts.push(locations.join(', '));
    }
    if (fundingSources.length) {
        parts.push(`Funded by ${fundingSources.join(', ')}`);
    }
    if (organizations.length) {
        parts.push(`${organizations.length} selected organization${organizations.length === 1 ? '' : 's'}`);
    }
    return parts.length ? parts.join(' · ') : 'No criteria set';
}

function getFilteredAnnouncementGroups() {
    const query = announcementsView.groupSearch.trim().toLowerCase();
    return mockData.announcementGroups.filter(g => !query || g.name.toLowerCase().includes(query));
}

function renderMultiSelect(id, label, options, selectedValues) {
    const opts = options.map(o => {
        const value = typeof o === 'string' ? o : o.value;
        const text = typeof o === 'string' ? o : o.label;
        return `<option value="${escapeHtml(value)}"${selectedValues.includes(value) ? ' selected' : ''}>${escapeHtml(text)}</option>`;
    }).join('');
    return `
        <div class="form-field">
            <label for="${id}">${escapeHtml(label)}</label>
            <select id="${id}" multiple size="4">${opts}</select>
        </div>`;
}

// ===== Audience Groups (list page) =====
function renderAudienceGroupsPage() {
    const groups = getFilteredAnnouncementGroups();
    const rowsHTML = groups.length
        ? groups.map(g => {
            const recipients = getGroupMemberOrganizations(g);
            const lastSent = getLastSentDateForGroup(g.id);
            return `
                <tr>
                    <td>
                        <div class="cell-primary">${escapeHtml(g.name)}</div>
                        ${g.description ? `<div class="cell-secondary">${escapeHtml(g.description)}</div>` : ''}
                    </td>
                    <td>${escapeHtml(renderGroupCriteriaSummary(g))}</td>
                    <td>${recipients.length} organization${recipients.length === 1 ? '' : 's'}</td>
                    <td>${lastSent ? escapeHtml(lastSent) : 'Never'}</td>
                    <td class="actions-col">
                        <button class="icon-action" title="Send Announcement" aria-label="Send Announcement" data-action="send" data-id="${g.id}"><i data-lucide="send"></i></button>
                        <button class="icon-action" title="Edit" aria-label="Edit" data-action="edit" data-id="${g.id}"><i data-lucide="pencil"></i></button>
                        <button class="icon-action" title="Duplicate" aria-label="Duplicate" data-action="duplicate" data-id="${g.id}"><i data-lucide="copy"></i></button>
                        <button class="icon-action" title="View Log" aria-label="View Log" data-action="log" data-id="${g.id}"><i data-lucide="history"></i></button>
                        <button class="icon-action danger" title="Delete" aria-label="Delete" data-action="delete" data-id="${g.id}"><i data-lucide="trash-2"></i></button>
                    </td>
                </tr>`;
        }).join('')
        : '<tr><td colspan="5" class="empty-cell">No audience groups match the current search.</td></tr>';

    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Audience Groups</h1>
                <button class="btn btn-primary" id="addAudienceGroupBtn">
                    <i data-lucide="plus"></i><span>New Group</span>
                </button>
            </div>
            <div class="list-toolbar">
                <div class="search-group">
                    <i data-lucide="search"></i>
                    <input type="search" id="audienceGroupSearch" placeholder="Search groups..." aria-label="Search groups" value="${escapeHtml(announcementsView.groupSearch)}" />
                </div>
            </div>
            <div class="result-count">${groups.length} group${groups.length === 1 ? '' : 's'}</div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Group Name</th><th>Criteria</th><th>Recipients</th><th>Last Sent</th><th class="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
            </table>
        </div>`;
}

function attachAudienceGroupsListeners() {
    document.getElementById('audienceGroupSearch').addEventListener('input', (e) => {
        announcementsView.groupSearch = e.target.value;
        renderPage('audience-groups');
        document.getElementById('audienceGroupSearch').focus();
    });

    document.getElementById('addAudienceGroupBtn').addEventListener('click', () => openAudienceGroupForm());

    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.getAttribute('data-id'));
            const action = btn.getAttribute('data-action');
            if (action === 'edit') {
                openAudienceGroupForm(id);
            } else if (action === 'duplicate') {
                duplicateAnnouncementGroup(id);
            } else if (action === 'delete') {
                confirmDeleteAnnouncementGroup(id);
            } else if (action === 'send') {
                openSendAnnouncementForm(id);
            } else if (action === 'log') {
                announcementsView.historyGroupFilter = getAnnouncementGroupById(id).name;
                navigateTo('announcement-history');
            }
        });
    });
}

// ===== Audience Group mutations =====
function openAudienceGroupForm(id) {
    const editing = typeof id === 'number';
    const g = editing
        ? getAnnouncementGroupById(id)
        : { name: '', description: '', criteria: { activityTypes: [], locations: [], fundingSources: [], organizations: [] } };

    const activityTypeOptions = mockData.activityConfigs.map(c => ({ value: c.id, label: c.subActivity }));

    openFormModal(editing ? 'Edit Audience Group' : 'New Audience Group', `
        <form id="audienceGroupForm" class="modal-form" novalidate>
            <div class="form-field">
                <label for="grp-name">Group Name <span class="required">*</span></label>
                <input type="text" id="grp-name" value="${escapeHtml(g.name)}" data-required="true" />
                <div class="field-error" id="grp-name-error"></div>
            </div>
            <div class="form-field">
                <label for="grp-description">Description</label>
                <textarea id="grp-description" rows="2">${escapeHtml(g.description || '')}</textarea>
            </div>
            <p class="status-text">An organization matches this group if it has an activity satisfying every criterion selected below, or if it is explicitly picked under Organizations. Leave a list empty to skip that criterion. Hold Ctrl (Cmd on Mac) to select multiple options.</p>
            <div class="form-grid">
                ${renderMultiSelect('grp-activity-types', 'Activity Type', activityTypeOptions, g.criteria.activityTypes)}
                ${renderMultiSelect('grp-locations', 'Location', mockData.governorates, g.criteria.locations)}
                ${renderMultiSelect('grp-funding-sources', 'Funding Source', getFundingSourceOptions(), g.criteria.fundingSources)}
                ${renderMultiSelect('grp-organizations', 'Organizations', getAnnouncementOrganizationDirectory(), g.criteria.organizations)}
            </div>
        </form>`,
        `<button type="button" class="btn btn-secondary" id="cancelAudienceGroupBtn">Cancel</button>
         <button type="button" class="btn btn-primary" id="saveAudienceGroupBtn">${editing ? 'Save Changes' : 'Create Group'}</button>`,
        true);

    document.getElementById('cancelAudienceGroupBtn').addEventListener('click', closeFormModal);
    document.getElementById('saveAudienceGroupBtn').addEventListener('click', () => {
        const form = document.getElementById('audienceGroupForm');
        if (!validateModalForm(form)) {
            return;
        }

        const getSelected = (selectId) => Array.from(document.getElementById(selectId).selectedOptions).map(o => o.value);
        const criteria = {
            activityTypes: getSelected('grp-activity-types'),
            locations: getSelected('grp-locations'),
            fundingSources: getSelected('grp-funding-sources'),
            organizations: getSelected('grp-organizations')
        };
        const name = document.getElementById('grp-name').value.trim();
        const description = document.getElementById('grp-description').value.trim();

        if (editing) {
            g.name = name;
            g.description = description;
            g.criteria = criteria;
            showToast('Audience group updated.', 'success');
        } else {
            mockData.announcementGroups.push({
                id: Math.max(0, ...mockData.announcementGroups.map(x => x.id)) + 1,
                name, description, criteria
            });
            showToast('Audience group created.', 'success');
        }
        closeFormModal();
        renderPage('audience-groups');
    });
}

function duplicateAnnouncementGroup(id) {
    const g = getAnnouncementGroupById(id);
    if (!g) {
        return;
    }
    mockData.announcementGroups.push({
        id: Math.max(0, ...mockData.announcementGroups.map(x => x.id)) + 1,
        name: `${g.name} (Copy)`,
        description: g.description,
        criteria: {
            activityTypes: [...g.criteria.activityTypes],
            locations: [...g.criteria.locations],
            fundingSources: [...g.criteria.fundingSources],
            organizations: [...g.criteria.organizations]
        }
    });
    showToast('Audience group duplicated.', 'success');
    renderPage('audience-groups');
}

function confirmDeleteAnnouncementGroup(id) {
    const g = getAnnouncementGroupById(id);
    if (!g) {
        return;
    }
    showConfirmDialog({
        title: 'Delete Audience Group',
        message: `Delete "${g.name}"? Its past announcement logs will still be visible in Announcement History. This cannot be undone.`,
        confirmLabel: 'Delete',
        tone: 'danger',
        onConfirm: () => {
            mockData.announcementGroups = mockData.announcementGroups.filter(x => x.id !== id);
            showToast('Audience group deleted.', 'success');
            renderPage('audience-groups');
        }
    });
}

function openSendAnnouncementForm(id) {
    const g = getAnnouncementGroupById(id);
    if (!g) {
        return;
    }
    const recipients = getGroupMemberOrganizations(g);

    openFormModal(`Send Announcement — ${g.name}`, `
        <form id="sendAnnouncementForm" class="modal-form" novalidate>
            <div class="form-field">
                <label for="ann-title">Title <span class="required">*</span></label>
                <input type="text" id="ann-title" data-required="true" />
                <div class="field-error" id="ann-title-error"></div>
            </div>
            <div class="form-field">
                <label for="ann-message">Message <span class="required">*</span></label>
                <textarea id="ann-message" rows="5" data-required="true"></textarea>
                <div class="field-error" id="ann-message-error"></div>
            </div>
            <p class="status-text">${recipients.length
                ? `Will be sent to ${recipients.length} organization${recipients.length === 1 ? '' : 's'}: ${escapeHtml(recipients.join(', '))}`
                : 'No organizations currently match this group’s criteria — sending now will reach no one.'}</p>
        </form>`,
        `<button type="button" class="btn btn-secondary" id="cancelSendAnnouncementBtn">Cancel</button>
         <button type="button" class="btn btn-primary" id="confirmSendAnnouncementBtn">Send</button>`);

    document.getElementById('cancelSendAnnouncementBtn').addEventListener('click', closeFormModal);
    document.getElementById('confirmSendAnnouncementBtn').addEventListener('click', () => {
        const form = document.getElementById('sendAnnouncementForm');
        if (!validateModalForm(form)) {
            return;
        }
        const title = document.getElementById('ann-title').value.trim();
        const message = document.getElementById('ann-message').value.trim();
        const sentCount = sendAnnouncement(g.id, title, message);
        closeFormModal();
        showToast(`Announcement sent to ${sentCount} organization${sentCount === 1 ? '' : 's'}.`, 'success');
        renderPage('audience-groups');
    });
}

function sendAnnouncement(groupId, title, message) {
    const g = getAnnouncementGroupById(groupId);
    const recipients = getGroupMemberOrganizations(g);
    mockData.announcementLogs.push({
        id: Math.max(0, ...mockData.announcementLogs.map(x => x.id)) + 1,
        groupId: g.id,
        groupName: g.name,
        title,
        message,
        sentDate: new Date().toISOString().slice(0, 10),
        sentBy: 'NMHP Administrator',
        recipients
    });
    return recipients.length;
}

// ===== Announcement History (combined + per-group log) =====
function getFilteredAnnouncementLogs() {
    return mockData.announcementLogs
        .filter(l => !announcementsView.historyGroupFilter || l.groupName === announcementsView.historyGroupFilter)
        .slice()
        .sort((a, b) => b.sentDate.localeCompare(a.sentDate));
}

function renderAnnouncementHistoryPage() {
    const logs = getFilteredAnnouncementLogs();
    const groupNames = mockData.announcementGroups.map(g => g.name);

    const rowsHTML = logs.length
        ? logs.map(l => `
            <tr>
                <td>${escapeHtml(l.groupName)}</td>
                <td>
                    <div class="cell-primary">${escapeHtml(l.title)}</div>
                    <div class="cell-secondary">${escapeHtml(l.message)}</div>
                </td>
                <td>${escapeHtml(l.sentDate)}</td>
                <td>${l.recipients.length}</td>
                <td>${escapeHtml(l.sentBy)}</td>
            </tr>`).join('')
        : '<tr><td colspan="5" class="empty-cell">No announcements have been sent yet.</td></tr>';

    return `
        <div class="page">
            <div class="page-header">
                <h1 class="page-title">Announcement History</h1>
            </div>
            <div class="list-toolbar">
                ${renderSelect('announcementHistoryGroupFilter', 'Group', groupNames, announcementsView.historyGroupFilter)}
            </div>
            <div class="result-count">${logs.length} announcement${logs.length === 1 ? '' : 's'}</div>
            <table class="data-table">
                <thead>
                    <tr><th>Group</th><th>Announcement</th><th>Sent Date</th><th>Recipients</th><th>Sent By</th></tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
            </table>
        </div>`;
}

function attachAnnouncementHistoryListeners() {
    document.getElementById('announcementHistoryGroupFilter').addEventListener('change', (e) => {
        announcementsView.historyGroupFilter = e.target.value;
        renderPage('announcement-history');
    });
}
