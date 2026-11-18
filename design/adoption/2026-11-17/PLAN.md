# Adoption fix plan: MHIS UX POC (2026-11-17)

Items are ordered by severity × reach. Every item stays inside the plain HTML/CSS/JS approach and adds no packages. Each one is verified by re-running `ui-lint` and `ux-check` on the affected screens, plus a keyboard walk.

## Group A: Accessibility and safety system fixes (recommended first)

These are shared files. Each fix repairs many screens, and none of them changes the approved look beyond a visible focus ring.

| # | Problem → fix | Files | Rule | Risk |
|---|---|---|---|---|
| A1 | The focus ring is invisible and is lost on the active nav item. Fix: make it a solid 2px brand ring via `:focus-visible` on every control, and have `.nav-item.active:focus-visible` combine the inset bar with the ring. | style.css (`--focus-ring` and the nav rules) | WCAG 2.4.7 / 2.4.11; design-system focus | Low: the only visible change is the ring for keyboard users |
| A2 | Notifications are click-only `div`s and the bell is named "3". Fix: make each item a `<button>` (or a list of buttons) and name the bell "Notifications, 3 unread". | notifications.js, index.html | WCAG 2.1.1, 4.1.2 | Low |
| A3 | Dialogs and the account menu have no semantics or focus handling. Fix: one shared dialog helper with `role=dialog`, `aria-modal`, a label, focus moved in and trapped, Esc to close, and focus returned to the trigger. The account menu becomes a menu button that Esc closes. | shared-ui.js, core.js, index.html | ux-patterns §2, components (Dialog, Menu) | Medium: every modal goes through it |
| A4 | An unsaved activity is lost on Log Out, Back or refresh. Fix: add `hasUnsavedActivityChanges()` to `handleSignOut` and a `beforeunload` guard while the editor is dirty. | core.js | UX-BRIEF "any route"; kit rule 6 | Low |
| A5 | Focus drops to `<body>` after step changes and actions. Fix: after each re-render, move focus to the new step's heading, or to a status message after Approve/Save. | core.js, activities.js, admin.js | WCAG 2.4.3; ux-patterns §3 | Low |
| A6 | Some elements can't be reached by keyboard. Fix: make the calendar month cells buttons (or one roving-tabindex grid) and make the admin Home tiles links/buttons. | calendar.js, home.js | WCAG 2.1.1 | Low |
| A7 | The announcement dates fail contrast at 2.73:1. Fix: use `--color-text-secondary` (passes AA). | style.css | WCAG 1.4.3 | None |
| A8 | Landmarks and headings are incomplete. Fix: add `<main>` on sign-in, label the two navs, and fix the h1→h3 jumps. | index.html, the affected pages | WCAG 1.3.1 | None |

## Group B: Validation pattern (one shared fix)

| # | Problem → fix | Files | Rule | Risk |
|---|---|---|---|---|
| B1 | Validation has no message slots, no linkage, no summary or focus move, errors don't clear, and some are toast-only. Fix: one shared field helper that reserves a message slot under each field (so nothing moves), sets `aria-invalid` and `aria-describedby`, and moves focus to the first invalid field (or a summary on long forms). Errors clear as fields are fixed, and messages are field-specific. Apply it to sign-in, both profile forms, Contact Us, the modal forms and the activity editor. | shared-ui.js, login.js, registration.js, organization.js, activities.js, style.css | ux-patterns §3, §3.1; components (FormField) | Medium: it touches every form, but the look of the fields stays the same |

## Group C: Deep links (enables verification, fixes Back and refresh)

| # | Problem → fix | Files | Rule | Risk |
|---|---|---|---|---|
| C1 | The URL never changes. Fix: hash routing (`#activities`, `#activities/new`, …) wired into the existing `navigateTo`. Back, forward and refresh then keep the page, and the existing unsaved-changes guard runs on `hashchange`. This also gives `dk-verify` a real URL for each screen, so the scratch shim can go. | core.js, nav.js | ux-patterns (navigation state); enforcement verify pages | Medium: it touches navigation. No visual change. |

## Group D: Screen fixes

| # | Problem → fix | Files | Rule |
|---|---|---|---|
| D1 | "Change activity" wipes every field. Fix: keep the fields that still apply, as the dialog promises, and treat re-selecting the same activity as a no-op. | activities.js | kit rule 6 (nothing lost by surprise) |
| D2 | Registration Approve has no confirmation, even with the "personal email" warning. Fix: confirm when a warning is present. | admin.js | ux-patterns §2 |
| D3 | The mock data contradicts itself. Fix: align the Home counts with the list, use 2026 dates, use one date format, and remove "under review" for approved NGOs. | data.js, home.js | kit rule 9 (realistic content) |
| D4 | Some controls are dead for the incomplete NGO, and the admin's "Events Calendar" button opens Event Reviews. Fix: hide or relabel these controls. | core.js, notifications.js, home.js | Every control does what it says |
| D5 | Save is far down on long forms. Fix: a sticky action bar on the profile and the activity editor (UX-BRIEF asks for this). | style.css, registration.js, organization.js, activities.js | UX-BRIEF |

## Group E: Kit refresh and enforcement

| # | Item |
|---|---|
| E1 | Add `DESIGN.md`, extracted from the current system: the tokens in `style.css :root`, the components in `shared-ui.js`, and the locked decisions from UX-BRIEF and CLAUDE.md as the decision log. Record the conflicts below in §5. |
| E2 | `dk-state init --ui "Mhis.UxPoc/wwwroot/**/*.{js,css,html}"`, exempting `js/vendor/**` and `js/data.js`. Mark every built area `--existing`. Start with `enforce warn`. |
| E3 | `verify-config`: the commands are `dotnet build`, the base URL is `http://localhost:5232`, and the pages are the deep links from C1. Widths are 1440 and 1280 only, with the note "desktop-first, UX-BRIEF out of scope: mobile data-entry". `--structure off`, because there is no kit profile for plain HTML/JS. RTL is off. Each demo account gets a session through `dk-login --until storage:mhis-demo-state`. |
| E4 | In CLAUDE.md, add the kit's Design section (filled in) and fix the stale references (`app.js` → `core.js` for `refreshLucideIcons`). |
| E5 | `.github/copilot-instructions.md` is stale: it says `app.js`, `site.css`, `mock-data.js`, "Lucide through a CDN" and a dark-green brand. Align it with CLAUDE.md so Copilot doesn't reintroduce the CDN. |
| E6 | Add `.design-kit/` to `.gitignore`. |

## Not now: needs a decision or Gates D → P

| # | Item | Why it waits |
|---|---|---|
| R1 | Add Facility in a modal from the activity form (UX-BRIEF requires it; it is missing) | A new interaction, so it goes through D → P for the Activities area |
| R2 | Activities list: the brief asks for 5 combined columns, the build has 8 plus a prominent Status column | Changes an accepted screen, so it goes through D → P |
| R3 | Row actions: make them consistent ("Edit visible, rest under More Actions" per the brief) and stop using icon-only actions | Changes an accepted shared component across every list, so it needs your go-ahead |
| R4 | Token consolidation: 3 weights, ≤ 6 type sizes, 4px spacing, 10px radius → a token, colour literals → tokens | Visual drift on every screen, but a global restyle of an accepted design (CLAUDE.md: "do not replace an accepted design globally unless explicitly requested") |
| R5 | Split files over 400 lines (activities.js, reviews.js, data.js, …) | Structure: incremental, and only if you want it |

## Conflicts to discuss (precedence: agent-handoff.md "Conflicts and precedence")

| Topic | Kit / org default | Project | Result |
|---|---|---|---|
| Stack | Vite + React (org §1) | Plain HTML/JS, no packages (CLAUDE.md) | The project wins (level 3): `structure-check --structure off` |
| Font | IBM Plex (org §3, "To confirm") | Inter, BRIDGE theme (CLAUDE.md, a locked decision) | The project wins (level 2) |
| Languages | EN + AR (org §2) | English only (UX-BRIEF) | The project wins: RTL is N/A. Record it in DESIGN.md. |
| Widths | 1440 … 390 (org §4) | Desktop-first; mobile data entry out of scope (UX-BRIEF) | Verify at desktop widths only, with a `note=`. The 390 overflow is logged, not planned. |
| Docs files | `DESIGN.md`, `design/adoption/*`, `design/state.json` | "Do not create additional planning … status, or summary Markdown files" (CLAUDE.md) | **Your call** (asked) |
| Editor labels | — | The build says Save Draft / Continue / Publish Activity; the brief says Save Work / Submit & Publish / Cancel | Ask the client; don't change the brief |
| Focal persons | — | The brief has two sections; the build has one table with a Platform column | The client should confirm |
