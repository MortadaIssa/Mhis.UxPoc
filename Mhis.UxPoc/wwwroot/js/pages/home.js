// Home Page
// One home for the whole system. The reporting platforms lead the page, each
// as a card with its identity, a glance at the organization's progress, and
// two actions: report something new, or open the dashboard.

// 4Ws: the same headline figures the 4Ws Dashboard opens with, so the numbers
// match what the user sees after selecting Check Progress.
function getFourWsHomeFigures() {
    const kpis = dashboardTabs[0].kpis;
    const valueOf = label => (kpis.find(k => k.label === label) || { value: '-' }).value;
    return [
        { value: valueOf('Total Activities'), label: 'Activities' },
        { value: valueOf('Ongoing'), label: 'Ongoing' },
        { value: valueOf('Beneficiaries Reached'), label: 'Beneficiaries' }
    ];
}

// Substance Use: surveys run on a yearly cycle, so progress is shown for the
// current reporting year (one survey per survey type).
function getSubstanceUseCycle() {
    const year = mockData.surveyYears[0];
    const surveys = mockData.surveys.filter(s => s.year === year);
    return {
        year,
        expected: mockData.surveyTypes.length,
        submitted: surveys.filter(s => s.status === 'Submitted').length,
        drafts: surveys.filter(s => s.status === 'Draft').length
    };
}

function renderFourWsProgress() {
    return `
        <div class="platform-stats">
            ${getFourWsHomeFigures().map(f => `
                <div class="platform-stat">
                    <div class="platform-stat-value">${escapeHtml(f.value)}</div>
                    <div class="platform-stat-label">${escapeHtml(f.label)}</div>
                </div>`).join('')}
        </div>`;
}

function renderSubstanceUseProgress() {
    const c = getSubstanceUseCycle();
    const percent = c.expected ? Math.round((c.submitted / c.expected) * 100) : 0;
    return `
        <div class="platform-cycle">
            <div class="platform-cycle-head">
                <span class="platform-cycle-year">${escapeHtml(c.year)} reporting year</span>
                <span class="platform-cycle-count"><strong>${c.submitted}</strong> of ${c.expected} surveys submitted</span>
            </div>
            <div class="platform-cycle-track" role="progressbar" aria-label="Surveys submitted for ${escapeHtml(c.year)}"
                aria-valuemin="0" aria-valuemax="${c.expected}" aria-valuenow="${c.submitted}">
                <div class="platform-cycle-fill" style="width: ${percent}%"></div>
            </div>
            <div class="platform-cycle-note">
                <i data-lucide="file-pen-line"></i>
                <span>${c.drafts ? `${c.drafts} draft${c.drafts === 1 ? '' : 's'} to complete` : 'No drafts in progress'}</span>
            </div>
        </div>`;
}

function renderPlatformAction({ id, page, icon, label, hint, primary }) {
    return `
        <button type="button" class="platform-action${primary ? ' primary' : ''}"${id ? ` id="${id}"` : ''}${page ? ` data-home-page="${page}"` : ''}>
            <span class="platform-action-icon"><i data-lucide="${icon}"></i></span>
            <span class="platform-action-text">
                <span class="platform-action-label">${escapeHtml(label)}</span>
                <span class="platform-action-hint">${escapeHtml(hint)}</span>
            </span>
            <i data-lucide="arrow-right" class="platform-action-arrow"></i>
        </button>`;
}

function renderPlatformCard({ key, icon, title, tagline, aboutTopic, progressHTML, actions }, wide) {
    return `
        <section class="platform-card${wide ? ' platform-card-wide' : ''}" aria-labelledby="platform-title-${key}">
            <div class="platform-card-head">
                <div class="platform-card-icon"><i data-lucide="${icon}"></i></div>
                <div class="platform-card-heading">
                    <h2 class="platform-card-title" id="platform-title-${key}">${escapeHtml(title)}</h2>
                    <p class="platform-card-tagline">${escapeHtml(tagline)}</p>
                </div>
                <button type="button" class="platform-card-about" data-home-topic="${aboutTopic}" aria-label="About the ${escapeHtml(title)}">
                    <i data-lucide="info"></i><span>About</span>
                </button>
            </div>
            <div class="platform-card-progress">${progressHTML}</div>
            <div class="platform-card-actions">${actions.map(renderPlatformAction).join('')}</div>
        </section>`;
}

function getHomePlatformCards() {
    const cards = [{
        key: '4ws',
        icon: 'clipboard-list',
        title: '4Ws Platform',
        tagline: 'Who does What, Where and When',
        aboutTopic: 'about-4ws',
        progressHTML: renderFourWsProgress(),
        actions: [
            { id: 'addActivityBtn', icon: 'plus', label: 'Add Activity', hint: 'Report new work', primary: true },
            { page: 'my-dashboard', icon: 'trending-up', label: 'Check Progress', hint: 'Open dashboard' }
        ]
    }];

    if (isSubstanceUseEligible()) {
        cards.push({
            key: 'su',
            icon: 'file-text',
            title: 'Substance Use Platform',
            tagline: 'Annual prevention and treatment surveys',
            aboutTopic: 'about-su',
            progressHTML: renderSubstanceUseProgress(),
            actions: [
                { id: 'addSurveyBtn', icon: 'plus', label: 'Add Survey', hint: 'Start a new survey', primary: true },
                { page: 'su-dashboard', icon: 'trending-up', label: 'Check Progress', hint: 'Open dashboard' }
            ]
        });
    }
    return cards;
}

function renderHomePage() {
    const data = mockData;
    const announcements = data.announcements;
    const events = data.upcomingEvents;
    const cards = getHomePlatformCards();
    const single = cards.length === 1;

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
                <h1 class="welcome-heading">Welcome, ${escapeHtml(getCurrentNgoProfile().name)}</h1>
            </div>

            <div class="home-platforms${single ? ' single' : ''}">
                ${cards.map(card => renderPlatformCard(card, single)).join('')}
            </div>

            <div class="home-row">
                <div class="section-card">
                    <div class="section-header">
                        <h3>Recent Announcements</h3>
                    </div>
                    <div class="section-content">
                        ${announcementsHTML}
                    </div>
                </div>

                <button type="button" class="section-card home-clickable-card" id="upcomingEventsCard">
                    <div class="section-header">
                        <h3>Upcoming Events</h3>
                        <span class="section-header-link">View calendar <i data-lucide="chevron-right"></i></span>
                    </div>
                    <div class="section-content">
                        ${eventsHTML}
                    </div>
                </button>
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
    document.getElementById('addSurveyBtn')?.addEventListener('click', () => {
        navigateTo('surveys');
        showToast('Adding a survey is not simulated in this prototype.', 'info');
    });
    document.querySelectorAll('[data-home-page]').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.getAttribute('data-home-page')));
    });
    document.querySelectorAll('[data-home-topic]').forEach(btn => {
        btn.addEventListener('click', () => {
            resourcesHelpView.mode = btn.getAttribute('data-home-topic');
            navigateTo('resources-help');
        });
    });
    document.getElementById('upcomingEventsCard')?.addEventListener('click', () => {
        navigateTo('events-calendar');
    });
}
