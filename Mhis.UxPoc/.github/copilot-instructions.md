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

- Replace the Platforms concept with a persistent left sidebar.
- Do not display MHIS, 4Ws, Substance Use, or Admin as platforms.
- Preserve the MHIS green visual identity, but do not preserve the current navigation structure.
- NGOs and administrators must have different navigation.
- Facilities and Providers are independent sections, not Organization Profile tabs.
- Surveys are part of the common MHIS frontend and are visible only to eligible NGOs.
- Events Calendar must be a labelled navigation item, not only an icon.
- Dashboards must be directly accessible without entering a 4Ws platform.
- Static and informational pages must be grouped under Resources & Help.
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
- Keep mock records and persona data in `wwwroot/js/mock-data.js`.
- Keep interaction code in `wwwroot/js/app.js`.
- Keep styling in `wwwroot/css/site.css`.
- Use semantic HTML and accessible labels.
- Use Lucide icons through a CDN if icons are needed.
- Use simulated navigation, filtering, modals, forms, and notifications.
- The project must continue to build and run after every iteration.

## Visual direction

- Professional government/NGO enterprise application.
- Preserve the established dark-green MHIS brand.
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
- Follow the CSS variables and component styles already defined in `site.css`.
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