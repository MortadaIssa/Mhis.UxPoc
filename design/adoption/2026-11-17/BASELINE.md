# Adoption baseline: MHIS UX POC (2026-11-17)

Kit 4.2.1, `adopt` path. No project file was changed to produce this baseline.

## How it was measured

- **Server:** a scratch static server served `Mhis.UxPoc/wwwroot` unchanged, plus a small shim. `?as=<demo account>` signs that account in, and `#<page>` opens the page through the app's own `navigateTo()`. The app has no per-screen URLs, so this was the only way to reach signed-in screens without changing code.
- **Screens:** 25, live, covering all 5 demo accounts and sign-in.
- **Scripts:** `ui-lint` ran at 1440×900 and 390×844, `ux-check` at 1440×900, and `--forms` on the sign-in, both profile screens and Contact Us.
- **Review:** the independent `ux-reviewer` agent walked the main tasks live with the keyboard. The full report is in `UX-REVIEW.md` in this folder.
- **Scope used:** English only and desktop-first. UX-BRIEF puts "Mobile data-entry design" out of scope, so 390 results are recorded at low weight.

## Scores (ux-review.md scale 1–5)

**Verdict: FAIL.** The average is 2.81. The bar for an existing product is 3.5, and no dimension may be below 3.

| Dimension | Score |
|---|---|
| Task fit | 3 |
| Clarity and status | 3 |
| Consistency | 3 |
| Error prevention and recovery | **2** |
| Efficiency | 3 |
| Accessibility | **2** |
| Language / RTL | N/A (English only) |
| Visual craft | 3.5 |
| Content and microcopy | 3 |

| Screen | Avg | Screen | Avg |
|---|---|---|---|
| Login | 3.75 | Contact Us | 3.63 |
| NGO Home (existing, 4Ws-only) | 3.25 | Admin Home | 3.50 |
| New / Rejected NGO Home | 3.50 | Organization Registrations + Review | 3.13 |
| Organization Profile (existing) | 2.75 | Organization Management | 3.75 |
| Organization Profile (new / resubmit) | 2.63 | User Management | 3.63 |
| Activities list | 3.00 | Event Reviews / Duplicates / Custom Values | 3.38 |
| Add Activity (search + editor) | 2.75 | Audience Groups / Announcement History | 3.13 |
| Facilities / Providers | 3.25 | **App shell** (sidebar, top bar, notifications, account menu) | **2.75** |
| 4Ws / SU Dashboards | 3.50 | Surveys | 3.50 |
| Events Calendar | 3.13 | Resources & Help | 3.75 |

## Script results

| Check | Result | Reach |
|---|---|---|
| ui-lint `focus` | FAIL: the active sidebar item shows no focus ring, because `.nav-item.active` box-shadow overrides `.nav-item:focus` (style.css:325–335). The ring token itself is a 14% opacity glow (style.css:85). | 25 of 25 screens |
| ux-check `keyboard:click-only` | FAIL: 42 calendar month cells (`div.cal-month-cell`); 4 admin Home tiles (`div.tile-action`) | 2 screens |
| ux-check / ui-lint `contrast` | FAIL: `.announcement-meta` dates are 2.73:1 | NGO Home |
| ux-check `forms` (sign-in) | FAIL: an empty submit grows the card 8px, moves the submit button 3px and shows no field errors | Login |
| ux-check `landmarks` | FAIL: no `<main>` on sign-in | Login |
| ux-check `landmarks` (warning) | 2 navigation landmarks, 1 without a label | 19 screens |
| ux-check `axe:region` (warning) | content outside landmarks | 24 screens |
| ux-check `headings` (warning) | h1 → h3 jumps | 6 screens |
| ux-check `loading:*` | Reported on 5 screens, but **these are artifacts of the test shim**: Home renders before the target page. They will be re-checked once real deep links exist. | — |
| ui-lint tokens (warnings) | 4 font weights (aim 3); 7–12 font sizes per screen (aim ≤ 6); spacing off the 4px scale (10, 14, 34, 22, 3, 5, 7, 9px); radius 10px is not a token; text colour `rgb(95,113,137)` is not a token | all screens |
| ui-lint 390 (low weight) | the top-bar account button overflows the page sideways (414px) on 24 screens; the calendar is 800px wide | all |
| structure-check | No kit profile fits (plain HTML/JS, no package.json). With `--mode off`, it found colour literals outside tokens (`style.css` has 42 outside `:root`, plus `data.js:395-397` and `notifications.js:22`) and 7 files over 400 lines (activities.js 848, reviews.js 678, data.js 652, …). It found no AI-slop patterns. | — |
| Advisories | N/A: no npm dependencies; .NET 10 static host. The vendored lucide.min.js was not audited. | — |

## Top problems (severity × reach; source: the ux-review)

1. **Sev 4, system.** Notifications are clickable `div`s (notifications.js:93), so keyboard users can't open them or reach their actions. The bell's accessible name is "3". (WCAG 2.1.1, 4.1.2)
2. **Sev 4, system.** An unsaved activity is lost with no warning on Log Out (handleSignOut checks only `profileDirty`, core.js:410), browser Back and refresh. UX-BRIEF: "Leaving the activity editor with unsaved changes, by any route … asks for confirmation."
3. **Sev 3, system.** Dialogs and the account menu have no `role="dialog"`/`aria-modal`. Focus isn't moved in, trapped or returned, and Esc does nothing.
4. **Sev 3, system.** The focus ring is invisible: a 14% glow, and it disappears entirely on the active nav item.
5. **Sev 3, system.** Validation has no reserved message slots, no `aria-invalid`/`aria-describedby`, no error summary or focus move, errors don't clear when fixed, and some appear only as toasts. On the New NGO profile the first error is above the viewport.
6. **Sev 3, system.** Focus drops to `<body>` after "Select activity", each "Continue" and Approve.
7. **Sev 3, system.** No URL routing: Back leaves MHIS, refresh goes to Home, and there are no deep links. This also blocks per-screen verification.
8. **Sev 3, screen.** "Change activity" promises to reset only the details that no longer apply, but it wipes every field (activities.js:727).
9. **Sev 3, screen/rework.** UX-BRIEF's "Add Facility in a modal without leaving the activity form" is missing.
10. **Sev 2, system.** Row actions are inconsistent and mostly icon-only. UX-BRIEF says "Edit visible, the rest under More Actions".

Also open:
- Admin Home tiles can't be reached by keyboard.
- Calendar cells can't be reached by keyboard.
- The announcement dates fail contrast.
- Approving a registration has no confirmation, even when the "personal email" warning shows.
- Save is not sticky on long forms.
- The mock data contradicts itself: 128 vs 5 activities, announcements dated 2024, and an approved NGO is told its profile is "under review".
- For the incomplete NGO, some controls silently land on Home.
- The Activities list has 8 columns, while the brief asks for 5.
- The editor button labels differ from the brief.

## Screenshots and raw output

- `base/<screen>-1440.png`, `base/<screen>-390.png`, and `base/<screen>.{lint1440,lint390,ux1440}.{txt,json}`
- Reviewer walk screenshots: `rev/shots/`
