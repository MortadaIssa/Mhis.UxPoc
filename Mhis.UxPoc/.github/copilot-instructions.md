# MHIS UX POC – Copilot Instructions

## Purpose

This repository contains a clickable desktop-first UX proof of concept for the MHIS web application.

It is not a production application and must not be treated as one.

The goal is to demonstrate a substantially clearer user experience while preserving the existing MHIS business functionality and visual identity.

## Sources of truth

Before making UX changes, read:

1. `docs/UX-BRIEF.md` – the approved redesign direction and highest-priority source.
2. `reference/Overall Business Cases.md` – existing business functionality.


The screenshots show the current problematic experience. They are references for existing functions and branding, not designs to reproduce.

If the screenshots conflict with `docs/UX-BRIEF.md`, follow `docs/UX-BRIEF.md`.

## Non-negotiable UX decisions

- Navigation is a persistent left sidebar. There is no hidden Platforms dropdown.
- For an approved NGO, the 4Ws Platform and the Substance Use Platform are separate areas inside the one MHIS shell, each with its own sidebar (Overview, work pages, Dashboard, Resources & Help, Contact Us, and Back to MHIS at the bottom, styled like the platform name block in a deeper green). Every sign-in lands on MHIS Home. Admin is never a platform. See `docs/UX-BRIEF.md` (Platform areas).
- Preserve the MHIS green visual identity, but do not preserve the current navigation structure.
- NGOs and administrators must have different navigation.
- Organization Profile is one page with four tabs: Organization Details, Focal Persons, Facilities, Providers. Registration and the administrator use the same tabs.
- Surveys are part of the common MHIS frontend and are visible only to eligible NGOs.
- Events Calendar is a labelled item in the MHIS sidebar; for an approved NGO, the top-bar calendar icon opens it from every area. The administrator has Events Calendar under Home (all organizations, with an Organization filter) and the same icon.
- Each platform's Dashboard is a direct item in that platform's sidebar.
- Static and informational pages are grouped under Resources & Help, which shows the topics of the area the user is in.
- Registration review decisions are Request Changes, Approve and Decline, in that order. Do not use "Rejected".
- Notifications remain notifications. Do not add an Inbox, messaging center, task center, or communication module.
- Long notifications may open in a modal.
- Do not turn the application into a workflow or journey-management interface.
- Show status only when it is necessary to explain access or an available action.
- Activity forms are dynamic. The selected sub-activity determines the tabs and fields.
- Never assume that Location, Beneficiaries, Funding, or any other tab exists for every activity.
- Do not redesign the contents of the existing 4Ws dashboards.
- The POC is desktop-first. Do not simplify desktop data-entry screens for mobile use.

## Scope restrictions

- Implement only what the current Copilot request explicitly asks for.
- Do not scaffold future iterations.
- Do not add speculative features.
- Do not add an Inbox.
- Do not create backend services, APIs, databases, authentication, authorization, repositories, or domain layers.
- Do not add production architecture.
- Do not create unit tests unless explicitly requested.
- Do not introduce npm packages, UI frameworks, build systems, or external dependencies without approval.
- Do not create additional planning, phase, architecture, backlog, status, or summary Markdown files.
- Do not rewrite or modify files under `reference/`.
- Do not replace an accepted design globally unless explicitly requested.

## Technical approach

- Use the ASP.NET Core project only to serve static files.
- Build the POC using HTML, CSS, and vanilla JavaScript.
- Keep the code simple and understandable.
- Use reusable JavaScript rendering functions only where they reduce duplication.
- Keep mock records in `wwwroot/js/data.js` and demo accounts/session in `wwwroot/js/demo-session.js`.
- Keep shell code in `wwwroot/js/core.js`, `nav.js`, `shared-ui.js`, `notifications.js`, and page code in `wwwroot/js/pages/*.js` (see CLAUDE.md for the layout).
- Keep styling in `wwwroot/css/style.css`.
- Use semantic HTML and accessible labels.
- Use Lucide icons from the vendored `wwwroot/js/vendor/lucide.min.js`; never load Lucide from a CDN.
- Use simulated navigation, filtering, modals, forms, and notifications.
- The project must continue to build and run after every iteration.

## Visual direction

- Professional government/NGO enterprise application.
- Follow the NMHP BRIDGE theme: Inter, teal `#097d63` primary (tokens at the top of `style.css`).
- Use a clean white or soft-neutral content background.
- Use generous but controlled spacing.
- Avoid excessive cards, badges, colors, explanatory paragraphs, and decorative graphics.
- Primary actions must be immediately recognizable.
- Avoid icon-only actions when their purpose is not obvious.
- Keep tables readable and avoid unnecessary columns.
- The left sidebar is the primary application navigation.
- The top bar contains only global utilities such as notifications and account controls.

## UI consistency

- Use Lucide line icons exclusively throughout the POC.
- Never use emoji, Unicode symbols, operating-system icons, or mixed icon libraries as interface icons.
- Follow the CSS variables and component styles already defined in `style.css`.
- New pages must visually reuse the established sidebar, top bar, typography, buttons, cards, tables, modals, spacing, and notification styles.
- Do not redesign accepted shared components in later iterations unless explicitly requested.

## Working behavior

Before editing:

- Read the requested files.
- Confirm the exact bounded change in a short response.
- Ask a question only if a missing decision materially prevents implementation.

After editing:

- Build or run the application.
- Fix errors introduced by the change.
- Provide a short list of changed files and what can now be demonstrated.

## Activity UX rules

- MHIS Activities are reporting/logging records for work the NGO has already performed or is currently implementing. MHIS is not an activity-planning tool.
- Activity add and edit experiences must use a dedicated full page, never a modal, drawer, or long popup.
- Users must be able to discover an activity by code, catalog wording, or plain-language description without first visiting the catalog.
- Activity form sections are dynamic. Never assume that Location, Facilities, Providers, Beneficiaries, Funding, or any other section applies to every activity.
- Existing screenshots explain business content only and must not be copied as the target UX.
- Do not generate additional documentation.
## Design

- UI/UX decisions live in `docs/DESIGN.md` (design kit) and `docs/UX-BRIEF.md`; follow them.
