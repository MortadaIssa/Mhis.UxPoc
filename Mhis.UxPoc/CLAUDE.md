# MHIS UX POC — Instructions for Claude Code

## Purpose

This repository is a clickable, desktop-first UX proof of concept for the MHIS
web application (Lebanon's National Mental Health Programme system).

It is **not** a production application and must never be treated as one. The
goal is to demonstrate a substantially clearer user experience to the client
while preserving the existing MHIS business functionality and visual identity.

## Sources of truth — read before making UX changes

1. `docs/UX-BRIEF.md` — the approved redesign direction. This is the
   highest-priority source; if anything else conflicts with it, follow it.
2. `reference/Overall Business Cases.md` — what the real MHIS application
   does and who its users are.
3. `docs/UX-REFERENCE-NOTES.md` — a condensed, screen-by-screen distillation
   of `reference/Current User Experience Catalog.md` and the 21 screenshots
   in `reference/images/`. **Read this instead of opening the raw catalog or
   the images.** It was produced once by reading all of them so that future
   sessions don't have to re-spend tokens on the images. Only open the
   original catalog/images directly if `docs/UX-REFERENCE-NOTES.md` is
   missing a detail you specifically need.

The screenshots describe the *current, problematic* experience and existing
business functions/branding — they are not designs to reproduce.

## Non-negotiable UX decisions

- Replace the Platforms concept with a persistent left sidebar.
- Do not display MHIS, 4Ws, Substance Use, or Admin as platforms.
- Preserve the MHIS green visual identity, but not the current navigation
  structure.
- NGOs and administrators must have different navigation.
- Facilities and Providers are independent sections, not Organization Profile
  tabs.
- Surveys are part of the common MHIS frontend and are visible only to
  eligible NGOs.
- Events Calendar must be a labelled navigation item, not only an icon.
- Dashboards must be directly accessible without entering a 4Ws platform.
- Static/informational pages must be grouped under Resources & Help.
- Notifications remain notifications — no Inbox, messaging center, task
  center, or communication module. Long notifications may open in a modal.
- Do not turn the application into a workflow or journey-management
  interface.
- Show status only when it is necessary to explain access or an available
  action.
- Activity forms are dynamic. The selected sub-activity determines the tabs
  and fields. Never assume Location, Beneficiaries, Funding, or any other tab
  exists for every activity.
- Do not redesign the contents of the existing 4Ws dashboards.
- The POC is desktop-first. Do not simplify desktop data-entry screens for
  mobile use.

## Scope restrictions

- Implement only what the current request explicitly asks for.
- Do not scaffold future iterations or add speculative features.
- Do not add an Inbox.
- Do not create backend services, APIs, databases, authentication,
  authorization, repositories, or domain layers. Do not add production
  architecture.
- Do not create unit tests unless explicitly requested.
- Do not introduce npm packages, UI frameworks, build systems, or external
  dependencies without approval.
- Do not create additional planning, phase, architecture, backlog, status, or
  summary Markdown files.
- Do not rewrite or modify files under `reference/`.
- Do not replace an accepted design globally unless explicitly requested.

## Technical approach

- The ASP.NET Core project (`Program.cs`) only serves static files
  (`UseDefaultFiles` + `UseStaticFiles`). There is no backend logic.
- The POC is plain HTML, CSS, and vanilla JavaScript — no build step, no
  framework.
- File layout actually in use (`app.js` was originally one 3,600+ line file;
  it was split into the modules below so an edit to one page doesn't require
  reading the whole thing — every file still shares one global scope via
  plain `<script>` tags, so there is no import/export or build step):
  - `wwwroot/index.html` — shell markup (login screen, top bar, sidebar
    mount point, shared modals) and the ordered list of `<script>` tags.
  - `wwwroot/js/demo-session.js` — the demo "session" layer: which demo
    account is signed in, NGO registration-lifecycle state
    (incomplete/pending/rejected/approved), and `localStorage` persistence.
    Loaded before everything else.
  - `wwwroot/js/data.js` — all mock data plus shared `appState`/`calendarView`.
  - `wwwroot/js/shared-ui.js` — reusable form modal, toast, and list-page
    select helper, used across pages.
  - `wwwroot/js/nav.js` — `NAV_DEFINITIONS` and sidebar rendering.
  - `wwwroot/js/core.js` — app init/event listeners, the `renderPage`
    dispatcher, `escapeHtml`, and the login/sign-in/sign-out flow.
  - `wwwroot/js/notifications.js` — notification list and account-menu
    dropdown.
  - `wwwroot/js/pages/*.js` — one file per destination: `home.js`,
    `resources.js`, `calendar.js`, `dashboards.js`, `organization.js`,
    `facilities.js`, `providers.js`, `activities.js` (Activities + Surveys,
    which are cross-referenced), `registration.js` (NGO registration
    lifecycle), `admin.js` (administrator registration review).
  - `wwwroot/css/style.css` — all styling.
  - When adding a new page-level render function, put it in the matching
    `wwwroot/js/pages/*.js` file (or add a new one and register its
    `<script>` tag in `index.html`) rather than growing an existing file
    with unrelated pages.
- Use reusable JavaScript rendering functions only where they reduce
  duplication.
- Use semantic HTML and accessible labels.
- Use Lucide icons via the vendored script at `wwwroot/js/vendor/lucide.min.js`
  (see Icon rendering below) if icons are needed — do not point `index.html`
  back at the jsDelivr CDN.
- Use simulated navigation, filtering, modals, forms, and notifications —
  there is no real backend to call.
- The project must continue to build and run after every iteration.

### Icon rendering (Lucide)

Icons are rendered two different ways in this codebase — know which one you
are touching:

1. **Static chrome icons** (top bar bell/account/chevron in `index.html`) are
   hand-authored inline `<svg>` markup. They always render; they do not
   depend on the Lucide JS library at all.
2. **Everything else** (sidebar nav, page content, table row actions) is
   emitted by `app.js` as `<i data-lucide="icon-name"></i>` placeholders.
   These stay empty `<i>` tags until `window.lucide.createIcons()` runs and
   replaces them with real SVGs.

Because of (2), **any code path that sets `innerHTML` on a container holding
`data-lucide` placeholders must call `refreshLucideIcons()` (defined in
`app.js`) immediately after**, or those icons will silently stay blank. This
is the most common way icons "stop appearing" after an edit — search for the
existing `refreshLucideIcons()` / `window.lucide.createIcons()` call sites in
`app.js` for the pattern before adding a new render path.

The Lucide library itself is loaded from `wwwroot/js/vendor/lucide.min.js`,
committed to the repo, **not** from a CDN. It was previously loaded from
`https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js`; that is
what caused every `data-lucide` icon (everything except the two static top-bar
SVGs) to silently stop rendering — `window.lucide` never gets defined if that
external request is slow, blocked by a proxy/firewall, or serves a bad/partial
response, and `refreshLucideIcons()`'s `if (window.lucide && ...)` guard fails
completely silently, with no console error. Vendoring the file removes that
external dependency entirely — a requirement for a client demo that has to
work regardless of the demo machine's network. Do not revert to a CDN
`<script src>` for Lucide. If the icon set ever needs updating, download a
fresh `lucide.min.js`, run it through `node --check` to confirm it isn't
truncated before committing it, and overwrite the vendored file.

## Visual direction

- Professional government/NGO enterprise application.
- Preserve the established dark-green MHIS brand.
- Clean white or soft-neutral content background; generous but controlled
  spacing.
- Avoid excessive cards, badges, colors, explanatory paragraphs, and
  decorative graphics.
- Primary actions must be immediately recognizable; avoid icon-only actions
  when their purpose isn't obvious.
- Keep tables readable and avoid unnecessary columns.
- The left sidebar is the primary application navigation; the top bar
  contains only global utilities (notifications, account controls).

## UI consistency

- Use Lucide line icons exclusively throughout the POC. Never use emoji,
  Unicode symbols, OS icons, or mixed icon libraries as interface icons.
- Follow the CSS variables and component styles already defined in
  `style.css`.
- New pages must visually reuse the established sidebar, top bar, typography,
  buttons, cards, tables, modals, spacing, and notification styles.
- Do not redesign accepted shared components in later iterations unless
  explicitly requested.

## Activity UX rules

- MHIS Activities are reporting/logging records for work the NGO has already
  performed or is currently implementing — MHIS is not an activity-planning
  tool.
- Activity add/edit must use a dedicated full page, never a modal, drawer, or
  long popup.
- Users must be able to discover an activity by code, catalog wording, or
  plain-language description without first visiting the catalog.
- Activity form sections are dynamic — never assume Location, Facilities,
  Providers, Beneficiaries, Funding, or any other section applies to every
  activity.
- Reference screenshots explain business content only; never copy them as
  target UX.

## Working behavior

Before editing:

- Read the requested files.
- Confirm the exact bounded change in a short response.
- Ask a question only if a missing decision materially prevents
  implementation.

After editing:

- Build or run the application and fix errors introduced by the change.
- Provide a short list of changed files and what can now be demonstrated.
- Do not generate extra documentation beyond what was asked for.
