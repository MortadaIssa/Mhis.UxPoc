# UX scorecard: MHIS UX POC — adoption baseline (adopt.md §2)

> See `reference/ux-review.md`. Reviewer: design-kit ux-reviewer (expert review, no users) · Date: 2026-11-17 ·
> Build: `Mhis.UxPoc/wwwroot` served unchanged by the scratch shim at http://localhost:5310/ (`?as=<account>#<page>`) ·
> Widths: 1440 (primary), 390 (low weight; mobile data entry is out of scope per the brief) · Language: English only.

Every finding below is **Expert review**. "Live" = reproduced in the browser (Playwright walk or kit script);
"Code" = read from source, not reproduced live.

## Scope (ux-review.md §9)

- **Mode:** web app / portal (POC, plain HTML/CSS/vanilla JS, no build).
- **Requirements trace substitute:** `docs/UX-BRIEF.md` (locked) + `CLAUDE.md` "Non-negotiable UX decisions". No DESIGN.md,
  REQUIREMENTS-TRACE.md or SCREEN-SPECs exist, so there are no R-ids; findings cite the brief section instead (e.g.
  "Brief › Add Activity").
- **Sample (25 screens, all requested):** login; ngo-existing: home, events-calendar, organization-profile, facilities,
  providers, my-dashboard, activities (+ Add Activity discovery and editor), su-dashboard, surveys, resources-help,
  contact-us; ngo-4ws-only: home; ngo-new: home, organization-profile; ngo-rejected: home (+ profile); admin: home,
  organization-registrations (+ registration review), organization-management (+ detail tabs), user-management,
  event-reviews, facility-duplicates, pending-custom-values, audience-groups (+ send dialog), announcement-history.
- **References applied:** WCAG 2.2 AA, APG, Nielsen, CW (cognitive walkthrough), ISO 9241-110 principles, kit
  `ux-patterns.md`, `components.md`, `app-ui.md` §4–13, `code-review.md` §1, GOV.UK (error summary).
- **NOT RUN:**
  - `ux-check --lang ar` — Arabic not in scope for this project (brief: English only). Language and RTL dimension scored **N/A**.
  - `ux-check` at 390 — not in the batch; phone is out of scope per brief. ui-lint 390 was run on all 25.
  - Market comparison (§5) — no discovery scan exists for this project.
  - Usability test with real users (§6) — none available.
  - `--forms` was run on login, organization-profile, new-profile and contact-us only (the batch's selection);
    activity editor, facility/provider modals, reject modal were walked by hand instead.
- **Script false positive:** `loading:flash` / `loading:size` on profile, su-dashboard and others point at
  `div.platform-cycle` — the Home progress bar, rendered for ~100 ms because the shim opens Home before navigating
  to `#page`. Not a product problem; excluded.

### Script results (1440 · 390 · ux-check 1440)

Raw files: `scratchpad/base/<screen>.lint1440.txt`, `.lint390.txt`, `.ux1440.txt`, screenshots `<screen>-1440.png`,
`<screen>-390.png`.

| Screen | ui-lint 1440 | ui-lint 390 | ux-check 1440 | Errors that matter |
|---|---|---|---|---|
| login | 1 E · 4 W | 2 E · 4 W | 2 E · 3 W | no visible focus on Explore card; 0 `<main>`; form shifts 8px on empty submit; 800px overflow at 390 |
| ngo-home | 2 E · 6 W | 3 E · 7 W | 1 E · 2 W | announcement dates 2.73:1 contrast (axe serious); 4 controls without visible focus; 2 primaries; 12 font sizes |
| ngo4ws-home | 2 E · 5 W | 3 E · 7 W | 1 E · 1 W | same as ngo-home |
| new-home / rejected-home | 1 E · 3–4 W | 2 E · 3–4 W | 0 E | active nav item focus not visible |
| ngo-profile / new-profile | 1 E · 5–6 W | 2 E · 5–6 W | 0 E (+ loading false positive) | focus; table nested in bordered box |
| ngo-activities | 1 E · 5 W | 2 E · 5 W | 0 E (+ false positive) | focus |
| ngo-calendar | 1 E · 5 W | 2 E · 5 W | 1 E · 2 W | **42 click-only day cells (WCAG 2.1.1)**; 6 non-token colours |
| ngo-facilities / providers | 1 E · 5 W | 2 E · 5 W | 0 E | focus |
| ngo-4ws-dashboard / su-dashboard | 1 E · 6 W | 2 E · 6 W | 0 E | h1→h3 jump; nested boxes |
| ngo-surveys / resources / contact | 1 E · 5 W | 2 E · 5–7 W | 0 E | focus |
| admin-home | 1 E · 5 W | 2 E · 7 W | 1 E · 3 W | **4 KPI tiles are click-only `div.tile-action` (WCAG 2.1.1)** |
| admin lists (registrations, org-mgmt, users, event-reviews, facility-dupes, custom-values, audience, ann-history) | 1 E · 5 W each | 2 E · 4–6 W | 0 E | focus |

Systemic on all 25: `focus` (active sidebar item, and others, show no visible focus), off-scale spacing (10/14/22/34px),
radius 10px not a token, `rgb(95,113,137)` / `rgb(138,154,176)` text colours not tokens, 7–12 font sizes, 4 weights,
sidebar `<nav>` without a label. At 390 every signed-in screen overflows (414px: top-bar account button) and the
sidebar never collapses (`rev/shots/phone-activities.png`).

## Tasks walked

| Task (brief section) | Role | Steps (mouse) | Completed? | Keyboard only? | Notes |
|---|---|---|---|---|---|
| T1 Add an activity: search by code / wording, dynamic sections, publish (Brief › Add Activity) | NGO (ngo-existing) | 1 Add Activity → 2 type "6.1" or "we trained health workers" → 3 Select activity → 4–7 fill sections (4 for 3.2, 2 for 8.4) → 8 Review → 9 Publish = **9 + fields** | Yes | **Partly** — focus drops to `<body>` after "Select activity" and after every "Continue"; user must Tab from the top of the page each step | Search by code and plain language works well (6.1 → 1 result; "we trained health workers" → 5.3, 3.2, 6.1). Dynamic steps verified: 3.2 = Details/Location & Facility/Beneficiaries/Funding/Review; 8.4 = Details/Funding/Review. #1, #5, #6, #7, #11 |
| T1b Unsaved-change guard (Brief › Breadcrumb: "by any route") | NGO | — | **Fails for Log Out, browser Back, refresh**; works for sidebar, breadcrumb, Cancel | — | Live: Log Out from a dirty editor signs out with no prompt; Back leaves the app. #1 |
| T2 Edit organization profile and save | NGO (ngo-existing) | 1 Profile → 2 edit → 3 scroll ~1500px → 4 Save Changes = 4 | Yes | Yes (Tab), but error focus not moved | Save off-screen on load (top 1513px). Empty name → inline error, focus stays on Save, no summary. Dirty guard on sidebar works; Cancel silently reverts. #6, #9 |
| T3 New NGO completes and submits registration (Brief › New NGO scenarios) | NGO (ngo-new) | 1 Complete Organization Profile → 2 fill 3 empty required fields → 3 scroll → 4 Submit for Review = 4 | Yes | Yes, with same error-focus problem | Empty submit: error toast + 3 inline errors; first error is above the viewport, focus stays on the button. After submit lands on Home "Pending Review" — good. #6, #9 |
| T3b Rejected NGO resubmits | NGO (ngo-rejected) | 1 Update and Resubmit → 2 edit → 3 Resubmit for Review = 3 | Yes | Yes | Reason shown on Home and Profile — good. |
| T4 Admin reviews and approves a registration (Brief › Registration review) | Admin | 1 Organization Registrations → 2 icon-only review button in row → 3 scroll ~1600px → 4 Approve = 4 | Yes | Yes | Personal-email warning works and is clear. Approve is one click, no confirm, focus drops to body. Reject requires a reason (good). #10, #12 |
| T5 Admin manages users: filter, deactivate, reset password (Brief › User Management) | Admin | 1 User Management → 2 filter → 3 icon-only Deactivate → 4 Confirm = 4 | Yes | Yes (dialog focus not moved, Esc does nothing) | Columns and filters match the brief. Access actions are icon-only (`user-x`, `key`). #2, #10 |
| T6 Read a notification and act on it; account menu (Brief › Notifications) | NGO | 1 bell → 2 click item → 3 modal → 4 "Review Facilities" = 4 | Mouse yes | **No** — notification items are `div`s with click handlers; not focusable. Account menu: no Esc, no arrow keys, no `aria-expanded` | #3, #2 |

## Walkthrough (ux-review.md §7)

| Task | Step | Screen | Knows what to do? | Notices the control? | Understands it? | Sees it worked? | Finding # |
|---|---|---|---|---|---|---|---|
| T1 | Start | NGO Home / Activities | Yes | Yes (Add Activity tile and page button) | Yes | Yes | — |
| T1 | Find sub-activity | Add Activity discovery | Yes (helper text with code/term/plain examples) | Yes | Yes; "Why this matches" helps | Yes | 18 (every card has a primary) |
| T1 | Fill a section, go on | Editor | Yes | Yes | Partly: "Continue" vs brief's "Save Work / Submit & Publish"; stepper ticks a step as done even when required fields are missing (amber only) | **No for keyboard/screen reader** — focus lands on `<body>` | 5, 11 |
| T1 | Needs a new facility | Editor › Location & Facility | **No** — no Add Facility in the form | No | — | — | 7 |
| T1 | Change sub-activity | Editor | Yes | Yes | **No** — dialog says "reset details that no longer apply", but every field is wiped (live: Activity Title "Kept data" → "") | No | 8 |
| T1 | Publish with gaps | Editor › Review | Yes | Yes | Yes (summary lists sections and fields) | Partly — errors stay red after they are fixed; focus stays on Publish | 6 |
| T1 | Leave mid-way | Any | — | — | — | **Log Out / Back lose the draft silently** | 1 |
| T2 | Save profile | Profile | Yes | **No** — Save is ~1500px below on a 900px screen | Yes | Yes (toast) | 9 |
| T3 | Submit registration | New NGO Profile | Yes (Home card directs) | Partly — Submit is off-screen | Yes | Errors: **No** — first error is above the viewport | 6, 9 |
| T4 | Open a pending registration | Registrations list | Yes | **Partly** — the row action is an unlabelled `file-check` icon, while Rejected/Approved rows use an eye | Partly | Yes | 10 |
| T4 | Approve | Registration Review | Yes | **No** — Approve/Reject are at the bottom of a ~1700px read-only form | Yes | Yes (toast + pill) | 12 |
| T5 | Deactivate a user | User Management | Yes | Partly — icon-only | Tooltip/aria-label only | Yes (confirm + toast + pill) | 10 |
| T6 | Act on "Action Required" | Notifications | Yes | Yes (mouse) / **No** (keyboard) | Yes | Yes | 3 |

## Problems

Severity 4 and 3 first. "Fix type" per adopt.md §3. All screenshots are under
`C:\Users\MORTAD~1\AppData\Local\Temp\claude\584dc3dfa64ff88b\bce52f0b-66df-4d13-baae-5c1f5ff54b74\scratchpad\` (`base\` = batch,
`rev\shots\` = walk).

| # | Screen | Heuristic | Sev | Live/Code | Problem | Fix (fix type) | Rule · source | Evidence |
|---|---|---|---|---|---|---|---|---|
| 1 | Add Activity editor (+ shell) | H5, H3 | **4** | Live | Unsaved activity work is lost with no warning when leaving by **Log Out** (`core.js:394-421` `handleSignOut` only checks `appState.profileDirty`, not `hasUnsavedActivityChanges()`), by **browser Back** (no history entries at all: the app never writes the URL; Back leaves MHIS) or by **refresh** (`startApp()` always `navigateTo('home')`, `core.js:349`; no `beforeunload`). Live: Log Out from a dirty editor went straight to sign-in. The brief requires the guard "by any route". | Route every exit through one guard: call `hasUnsavedActivityChanges()` in `handleSignOut`; add `beforeunload` while dirty; with #4, push a history entry per page so Back can be intercepted. (**System fix**, core.js) | ux-patterns §3 "Never lose input"; app-ui §5 "leaving with unsaved changes asks first"; Brief › Breadcrumb and page headers · Nielsen H5 | walk1 log; `rev/shots/act-guard.png` |
| 2 | All dialogs: confirm dialog, form modal, notification detail, reject, add facility/provider/focal person, send announcement; account menu | A11Y | **3** | Live + Code | Dialogs have no `role="dialog"`/`aria-modal`/`aria-labelledby` (`index.html` overlays); focus stays on the trigger behind the overlay (live: confirm opened with focus on the sidebar link; Add Facility modal with focus on `#addFacilityBtn`); Tab is not trapped; **Esc closes nothing** (confirm, form modal, notification panel, detail modal, account menu — all verified live); focus is not returned. Account button has no `aria-expanded`/`aria-haspopup`; menu items are `<a href="#">` with no arrow-key support. | One dialog helper in `shared-ui.js` (`openFormModal`, `showConfirmDialog`, notification detail): set roles, move focus to first field / least destructive button, trap Tab, Esc closes, restore focus; `alertdialog` for destructive confirms. Menu button pattern for account menu. (**System fix**, shared-ui.js + index.html + notifications.js) | components.md §4 Dialog, Popover; app-ui §8 · APG Dialog (Modal), APG Menu Button · WCAG 2.2 · 2.1.2, 2.4.3, 4.1.2 | walk1/2/4 logs; `rev/shots/fac-add-modal.png`, `act-guard.png`, `account-open.png` |
| 3 | Shell › Notifications (all signed-in screens) | A11Y | **4** | Live | Notification items are `<div class="notification-item">` with click listeners (`notifications.js:93,108`) — not focusable, no role. A keyboard or screen-reader user can open the panel but cannot open any notification, read long content, or reach its action ("Review Facilities", "View Event"), which only exist in the detail modal. The bell's accessible name is "3" (the badge text wins over `title`), so it announces "3, button". | Render each item as a `<button>` (or a link) with name "Type: title, time, unread"; give the bell `aria-label="Notifications, 3 unread"` and `aria-expanded`; Esc closes the panel and returns focus. (**System fix**, notifications.js / index.html) | ux-review §3 "accessibility barrier blocks a task" → 4; components §4 · WCAG 2.2 · 2.1.1, 4.1.2 · APG | walk2 log (T6); `rev/shots/notif-open.png`, `notif-panel.png` |
| 4 | Whole app | H3, H1 | **3** | Live + Code | No URL state. Navigation never updates the URL (live: after sidebar → Facilities the URL stayed `/?as=ngo-existing`); refresh always returns Home; browser Back leaves the application; list search/filters reset on every visit; no page can be bookmarked or shared (admins can't send "look at this registration"). | Hash routing in `core.js` (`navigateTo` writes `#page[/id]`, `hashchange`/`popstate` renders) and filters in the query string. Keep it build-free. (**System fix**, core.js + nav.js) | ux-patterns §4 "State in the URL… Back returns to the same place"; code-review §1 URL state · Nielsen H3 | walk3 log |
| 5 | Add Activity editor; Registration Review; any re-render | A11Y | **3** | Live | Focus is destroyed by `innerHTML` re-renders: after "Select activity" and after every "Continue" focus is on `<body>` (live); after Approve focus is on `<body>`. Keyboard and screen-reader users lose their place on every step of the main NGO task. | After a step change, move focus to the step heading (`tabindex="-1"`) and announce "Step 2 of 5: Location & Facility"; after page render, focus the `h1`. Stepper as ordered list with `aria-current="step"`. (**System fix**, core.js `renderPage` + activities.js `editorGoToStep`) | code-review §1 Focus; components §5 Stepper · WCAG 2.2 · 2.4.3 | walk1 log "focus after Continue: BODY" |
| 6 | All forms: activity editor, profile, registration profile, facility/provider modal, focal person, contact | H9, A11Y | **3** | Live | Validation is shared but weak: (a) no error summary and focus not moved on submit — on New NGO Profile the first error is above the viewport and only a toast says "Complete the required fields"; (b) errors never clear when fixed (live: still "This field is required." after typing); (c) no `aria-invalid`/`aria-describedby` (live: both null on `#profile-name`); (d) one generic message for every field ("This field is required.") instead of "Enter the director's email"; (e) errors as toasts. | One validation helper in `shared-ui.js`: per-field messages written for the field, `aria-invalid` + `aria-describedby`, clear on input, error summary "There is a problem" with links at the top of the form that receives focus; no error toasts. (**System fix**) | ux-patterns §3, §3.2 (error summary, wording); components §4 Toast "Errors are not toasts" · GOV.UK error summary · WCAG 2.2 · 3.3.1, 3.3.3, 4.1.2 | `rev/shots/new-profile-errors.png`, `act-editor-fielderr.png` |
| 7 | Add Activity editor › Location & Facility | Task fit, H3 | **3** | Live + Code | Brief requires "When an activity requires a facility, allow Add Facility through a modal without leaving the activity form." There is no Add Facility in the editor (facility is a plain `<select>` of existing facilities, `activities.js:609`). An NGO whose facility isn't registered must leave the form — which discards the activity (#1/#8). | Add "Add facility" next to the Facility select, reusing `openFacilityForm()` from facilities.js; on save, select the new facility. (**Screen fix**) | Brief › Facilities and Providers · Nielsen H3, H7 | code; `rev/shots/act-editor-2.png` |
| 8 | Add Activity editor › Change activity | H5, confusion "result differs from label" | **3** | Live | The dialog says "Changing the activity will reset details that no longer apply", but `startActivityDiscovery()` then `openActivityEditor()` creates a fresh editor: **every** field is wiped (live: Activity Title "Kept data" → "" even after re-selecting the same 3.2). The discovery screen also has no Cancel to return to the editor. | Carry over values for fields whose ids exist in the new configuration; name what will be dropped ("Location and Beneficiaries will be removed"); add "Back to editor". (**Screen fix**, activities.js:727-739) | ux-review §8 "Result differs from the label"; ux-patterns §3 Never lose input · Nielsen H5 | walk1 log T1b; `rev/shots/act-change-discovery.png` |
| 9 | Organization Profile (NGO, new NGO, resubmit) | Task fit, H7 | 2 | Live | Brief: "Keep Save or Submit for Review visible on long forms." Save Changes / Submit for Review sit at the bottom (top ≈1450–1513px on a 900px screen) and `.form-actions` is not sticky (style.css:1636). No save state ("Unsaved changes") anywhere. Cancel discards silently. | Sticky action bar (the editor's `.editor-actions` pattern already exists, style.css:2121) with "Unsaved changes" text when dirty. (**System fix**, style.css `.form-actions` variant) | Brief › Organization Profile; app-ui §5 Header save state, §7 sticky save bar | `rev/shots/profile-viewport.png`, `new-profile-viewport.png` |
| 10 | Lists: Activities, Facilities, Providers, Surveys, Registrations, Org Management, Users, Audience Groups, Announcement History | H4, H6, confusion "icon-only" | 2 | Live | Row actions differ per list and are mostly icon-only: eye/pencil/trash (Facilities), eye or `file-check` (Registrations — the main admin task's entry is an unlabelled icon, and differs by status), `user-x`/`key` (Users), five icons incl. paper-plane = **Send Announcement** (Audience Groups), but text "Review"/"Accept Merge" on Event Reviews / Custom Values. Brief: "Edit as a visible action. Secondary actions under More Actions"; CLAUDE.md: "avoid icon-only actions when their purpose isn't obvious". | One row-actions component: the main verb as a text button (Edit / Review / Send), the rest in a "More actions" menu (keyboard reachable). (**System fix**, shared-ui.js + each list renderer) | Brief › Facilities and Providers, Activities list; app-ui §4 Row actions, §12 "actions in a different place on each page" · Nielsen H4, H6 | `base/admin-registrations-1440.png`, `admin-users-1440.png`, `admin-audience-1440.png`, `ngo-facilities-1440.png` |
| 11 | Activities list + editor | Task fit, H2 | 2 | Live | Deviates from the locked brief: list has **8 columns** (Code, Activity, Location, Facility, Implementation Dates, Last Updated, Status, Actions) where the brief asks for 5 combined (Activity and Sub-Activity · Facility and Location · Period · Last Updated · Actions); a prominent **Status** pill column ("Completed" on every row) where the brief says not to display Activity Status prominently; "Not required" repeated in two columns. Editor actions are "Save Draft / Continue / Publish Activity" where the brief says "Save Work · Submit & Publish · Cancel". Seed data has only Completed records, so Edit / Duplicate / Delete and the Draft label can't be demonstrated until a draft is saved. | Align columns and labels to the brief (Code merges into the Activity cell; Facility + Location in one cell; status only as a subtle Draft label); add one draft and one in-progress record to the seed. (**Screen fix**) | Brief › Activities list, Add Activity | `rev/shots/act-list.png` |
| 12 | Registration Review (admin) | H7, H5, H8 | 2 | Live | Approve/Reject are at the end of a ~1700px page (top 1606px). The read-only submission is rendered as form inputs with red required asterisks, which reads like an editable form. Approve is one click, no confirmation and no undo, even when the "Possible personal email" warning is showing; focus then drops to `<body>`. | Detail-page layout (app-ui §6): actions in the header next to the status pill; values as label/value pairs, no asterisks; when the personal-email warning is shown, Approve confirms naming the email. (**Screen fix**, admin.js) | app-ui §6 Detail page; ux-patterns §2 (public/external actions confirm) · Nielsen H5, H7 | `rev/shots/admin-review-pending.png`, `admin-review-pending-viewport.png` |
| 13 | Focus indicator (all 25 screens) | A11Y | **3** | Live | `--focus-ring: 0 0 0 3px rgba(11,140,110,0.14)` (style.css:85) is a 14 %-opacity glow: barely visible on white sidebar items and invisible on table icon buttons (live screenshot of focused row "Edit" icon shows no ring). ui-lint: focus error on all 25 screens; Explore card on login has none. | Token change: 2px solid `--color-primary-green` outline with 2px offset via `:focus-visible` for every interactive element. (**System fix**, one token in style.css) | app-ui §13 "visible focus on every control" · WCAG 2.2 · 2.4.7, 1.4.11 | `rev/shots/focus-nav.png`, `focus-row.png`; all `*.lint1440.txt` |
| 14 | Admin Home | A11Y | **3** | Live (ux-check) | The four "Needs Your Attention" count tiles are `div.tile.tile-action` with click listeners — not reachable by keyboard (WCAG 2.1.1). Sidebar is the workaround. | Make the tiles `<button>`/links with names like "2 new organization registrations, review". (**Screen fix**, admin.js) | code-review §1 Hit areas (click on a div) · WCAG 2.2 · 2.1.1 | `base/admin-home.ux1440.txt` |
| 15 | NGO Home, 4Ws-only Home | A11Y | **3** | Live (axe) | Announcement dates `#8a9ab0` on pale green = 2.73:1 (non-token colour). | Use `--color-text-secondary`. (**System fix**, style.css `.announcement-meta`) | WCAG 2.2 · 1.4.3 | `base/ngo-home.ux1440.txt` |
| 16 | Events Calendar | A11Y, H1 | 2 | Live | 42 day cells react to click but are not keyboard reachable (Add Event and Day view are the alternatives). Pending vs approved is shown only by a lighter shade of the same colour (7-item legend); Saturday column truncates event names with no tooltip. | Cells as buttons (or drop the click); add a "Pending" text/icon marker on chips; title attribute or wrap. (**Screen fix**) | app-ui §9 "color never the only signal" · WCAG 2.2 · 1.4.1, 2.1.1 | `base/ngo-calendar-1440.png`, `ngo-calendar.ux1440.txt` |
| 17 | New NGO (incomplete) shell | H1, confusion "dead end" | 2 | Live | Top-bar Events Calendar shortcut is shown but silently lands on Home (calendar not allowed); notification "Action Required — Facility 'Central Health Clinic' requires verification" with "Review Facilities" also lands on Home; the new NGO gets the same 5 notifications as an approved NGO. Admin's calendar shortcut is titled "Events Calendar" but opens Event Reviews. | Hide shortcuts the account can't use; per-account notification seed; admin shortcut titled "Event Reviews". (**Screen fix**, core.js/notifications.js/data.js) | ux-review §8 dead end, result differs from label · Nielsen H1 | walk5 log |
| 18 | Mock data and formats (all screens) | H2, H4, content | 2 | Live | Contradictions a client will notice in a demo: Home and 4Ws Dashboard say **128 activities**, the Activities list shows **5**; Recent Announcements are dated March 2024 and "Upcoming Events" are March/April with no year while the calendar shows Nov 2026; an approved NGO sees "Your organization profile is currently under review". Dates use 4 formats ("2025-01-06 → 2026-06-30", "12 Feb 2025", "March 15, 2024", "2025-06-\n20" wrapping in Audience Groups / Announcement History). | One `formatDate()` in shared-ui.js ("12 Feb 2025"); reconcile counts with the seed or label dashboard figures as sample; refresh dates relative to today. (**System fix** for dates, data.js for seed) | app-ui §4 "dates in one format", §12 "suspiciously round numbers" · Nielsen H2, H4 | `base/ngo-home-1440.png`, `ngo-4ws-dashboard-1440.png`, `admin-audience-1440.png` |
| 19 | Status pills on New/Rejected Home and Registration Profile | H4 | 1 | Live | Brief: "A status pill sits next to the page title". On New and Rejected Home the pill is on its own line under the title; on the registration Organization Profile the header uses `page-header` (pill pushed right) instead of `page-header-start`. | Use `page-header page-header-start`. (**Screen fix**, registration.js) | Brief › Breadcrumb and page headers | `rev/shots/new-home.png`, `rejected-home.png` |
| 20 | Registration profile vs NGO profile vs editor vs review | H4 | 2 | Live | Button order and primacy change per form: NGO Profile "Cancel · **Save Changes**" (primary right); Registration Profile "**Submit for Review** · Save Draft" (primary left); Registration Review "**Approve** · Reject" (primary left); Editor "Cancel … Save Draft · **Continue**". | One form-actions order (secondary then primary at the end), shared class. (**System fix**, style.css + renderers) | app-ui §3, §12 "actions in a different place on each page" · Nielsen H4 | screenshots above |
| 21 | Shell landmarks | A11Y | 2 | Live | Sidebar `<nav>` has no `aria-label`; active item has no `aria-current="page"`; no skip link; login screen has no `<main>`; Organization detail tabs have no `role="tab"`; dashboard heading jumps h1→h3. | `aria-label="Main"`, `aria-current`, skip link, `<main>` on login, APG tabs. (**System fix**, nav.js/index.html) | components §5 Sidebar, Tabs · WCAG 2.2 · 1.3.1, 2.4.1 | `*.ux1440.txt` structure sections |
| 22 | Visual system | CRAFT | 2 | Live (ui-lint) | 7–12 font sizes per screen (13.5px etc.), 4 weights, off-scale spacing (10/14/22/34px ×20–56), 10px radius not a token, 6 non-token colours on the calendar; KPI cards inside bordered panels and tables inside bordered cards on dashboards and profile (nested boxes); Home uses two primary tiles (Add Activity + Add Survey) side by side. | Tighten the token set in style.css `:root` (type scale ≤ 6, spacing on 4px, radius tokens), then swap literals. (**System fix**) | app-ui §12–13 · Laws (Hick, aesthetic-usability) | all `*.lint1440.txt` |
| 23 | Login + all signed-in screens at 390 | CRAFT | 2 (low weight) | Live | Phone is out of scope for data entry, but the sign-in page overflows to 800px wide at 390 and the signed-in shell overflows 414px with a non-collapsing sidebar taking half the screen. | Stack the login brand panel under 768px; collapse sidebar to a drawer. Do **not** simplify desktop data entry (locked). (**System fix**, style.css) | app-ui §2 App shell; org defaults widths | `base/login-390.png`, `rev/shots/phone-activities.png` |
| 24 | Contact Us | H7 | 1 | Live | Name and Email are empty for a signed-in organization. | Prefill from the account. (**Screen fix**) | ux-patterns §3 Defaults ("never ask what the app already knows") | `base/ngo-contact-1440.png` |
| 25 | Add Activity discovery | H8 | 1 | Live | Every catalog card carries its own primary "Select activity" (up to 4 primaries on screen, same label). | Make the whole card the selectable control, or a secondary button; one primary per view. | app-ui §13 one primary | `rev/shots/act-discovery.png` |
| 26 | Organization Profile | Task fit | 1 | Live | Brief lists "4Ws Focal Persons, and Substance Use Focal Persons" as sections; the build has one "Organization Focal Persons" table with a Platform column. New NGO submit succeeds with no focal person at all, while a rejection reason in the seed is "Substance Use focal person is missing". | Either two sections as the brief says, or confirm the single table with the client; decide whether a focal person is required to submit. (**Screen fix**, needs client decision) | Brief › Organization Profile | `base/ngo-profile-1440.png` |

### Code-review (code-review.md §1) — what will break under real use

| File:line | Check | Consequence | Sev |
|---|---|---|---|
| `js/core.js:394-421` | Unsaved guard | Log Out discards a dirty activity without asking (#1) | 4 |
| `js/core.js:329-350`, `navigateTo` 147-171 | URL state | Back exits the app; refresh resets to Home; no deep links (#4) | 3 |
| `js/core.js:24-26` | Label vs result | Admin "Events Calendar" button opens Event Reviews | 2 |
| `js/notifications.js:93,108` | Click on a div | Notifications unusable by keyboard (#3) | 4 |
| `js/pages/activities.js:671-692` | Focus after re-render | Focus lost each step (#5) | 3 |
| `js/pages/activities.js:648-657, 818-826` | Stale errors | `bindEditorFieldInputs` never clears `.invalid`/message (#6) | 3 |
| `js/pages/activities.js:727-739` | Data loss | Change activity resets all data (#8) | 3 |
| `js/pages/organization.js:25-27`, `registration.js:150-152` | Dirty tracking | Only `input` elements set `profileDirty`; focal-person edits do via callback, but any future `select`/`textarea` in the profile will not trigger the guard | 2 |
| `js/pages/admin.js:287-291` | Double submit / confirm | Approve has no confirm, no busy state; a second click on the re-rendered page is harmless only because the button disappears | 2 |
| `js/shared-ui.js` (openFormModal / showConfirmDialog) | Dialog focus | No focus move/trap/Esc/restore (#2) | 3 |
| `css/style.css:85` | Focus token | 14 % alpha ring (#13) | 3 |

## Per-screen scores (1–5)

Dimensions: TF Task fit · CS Clarity and status · CO Consistency · ER Error prevention and recovery · EF Efficiency ·
AX Accessibility · L10N Language and RTL (**N/A**, English only — excluded from averages) · VC Visual craft · CM Content and microcopy.
The shell problems (#1–5, #13, #21) count on every signed-in screen's AX/ER.

| Screen (account) | TF | CS | CO | ER | EF | AX | VC | CM | Avg | Main findings |
|---|---|---|---|---|---|---|---|---|---|---|
| Login (signed out) | 4 | 4 | 4 | 3 | 4 | 3 | 4 | 4 | **3.75** | 13, 21, 23; form shifts 8px |
| NGO Home (existing; 4Ws-only same) | 4 | 3 | 3 | 4 | 4 | 2 | 3 | 3 | **3.25** | 3, 13, 15, 18, 22 |
| New NGO Home / Rejected Home | 4 | 3 | 3 | 3 | 4 | 3 | 4 | 4 | **3.50** | 17, 19 |
| Organization Profile (existing) | 3 | 3 | 3 | 2 | 3 | 2 | 3 | 3 | **2.75** | 6, 9, 20, 26 |
| Organization Profile (new / resubmit) | 3 | 3 | 2 | 2 | 3 | 2 | 3 | 3 | **2.63** | 6, 9, 19, 20 |
| Activities list | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | **3.00** | 10, 11, 18 |
| Add Activity (discovery + editor) | 3 | 3 | 3 | 1 | 3 | 2 | 4 | 3 | **2.75** | 1, 5, 6, 7, 8, 11, 25 |
| Facilities / Providers | 3 | 4 | 3 | 3 | 3 | 2 | 4 | 4 | **3.25** | 2, 6, 10 |
| 4Ws Dashboard / Substance Use Dashboard | 4 | 3 | 4 | 4 | 4 | 3 | 3 | 3 | **3.50** | 18, 21, 22 |
| Surveys | 4 | 4 | 3 | 4 | 4 | 3 | 3 | 3 | **3.50** | 10, 22 (intro panel is extra prose) |
| Events Calendar | 4 | 3 | 3 | 3 | 3 | 2 | 3 | 4 | **3.13** | 16, 22 |
| Resources & Help | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 4 | **3.75** | 22 (cards in cards) |
| Contact Us | 4 | 4 | 4 | 3 | 3 | 3 | 4 | 4 | **3.63** | 6, 24 |
| Admin Home | 4 | 4 | 3 | 4 | 4 | 2 | 3 | 4 | **3.50** | 14, 22 |
| Organization Registrations + Review | 3 | 4 | 3 | 3 | 2 | 3 | 3 | 4 | **3.13** | 10, 12 |
| Organization Management (+ detail tabs) | 4 | 4 | 3 | 4 | 4 | 3 | 4 | 4 | **3.75** | 10, 21 |
| User Management | 4 | 4 | 3 | 4 | 4 | 3 | 4 | 3 | **3.63** | 2, 10 |
| Event Reviews / Potential Duplicate Facilities / Pending Custom Values | 4 | 4 | 3 | 3 | 4 | 3 | 3 | 3 | **3.38** | 10 ("Review" on approved items), 18, 22 |
| Audience Groups / Announcement History | 3 | 4 | 3 | 3 | 3 | 3 | 3 | 3 | **3.13** | 10 (Send is an icon), 18 (dates wrap); send dialog's button is a bare "Send" |
| Shell: sidebar, top bar, notifications, account menu | 3 | 3 | 4 | 1 | 3 | 1 | 4 | 3 | **2.75** | 1, 2, 3, 4, 13, 17, 21 |

## Scores (whole product, 1–5)

| Dimension | Score | Based on problems # |
|---|---|---|
| Task fit | 3 | 7, 9, 11, 12, 26 (brief structure largely followed: sidebar, groups, homes, dynamic forms, scenarios — good) |
| Clarity and status | 3 | 9 (no save state), 17, 18, 19 |
| Consistency | 3 | 10, 18, 20, 22 |
| Error prevention and recovery | 2 | 1 (sev 4), 6, 8, 12 |
| Efficiency | 3 | 4, 9, 12, 24 (activity search is a real strength) |
| Accessibility | 2 | 2, 3 (sev 4), 5, 13, 14, 15, 16, 21 |
| Language and RTL | N/A | English only per project scope |
| Visual craft | 3.5 | 22, 23 (clean BRIDGE look; lint drift) |
| Content and microcopy | 3 | 6 (generic errors), 11 (labels vs brief), 18 |
| **Average (8 scored)** | **2.81** | |

**Result: FAIL** — 2 severity-4 problems open (#1, #3), 9 severity-3 open (#2, #4, #5, #6, #7, #8, #13, #14, #15),
two dimensions below 3 (Error prevention 2, Accessibility 2), average 2.81 < 3.5 (polish threshold
for an existing product).

## Top 10 problems (severity × reach)

| Rank | # | Sev | Reach | Fix type | One line |
|---|---|---|---|---|---|
| 1 | 3 | 4 | every signed-in screen, every role | System (notifications.js, index.html) | Notifications can't be opened or acted on by keyboard; bell announced as "3" |
| 2 | 1 | 4 | main NGO task (Add/Edit Activity) | System (core.js) | Log Out / Back / refresh lose an unsaved activity with no warning — brief requires the guard on every route |
| 3 | 2 | 3 | every dialog and menu (≈12 dialogs, 2 menus) | System (shared-ui.js) | No dialog semantics, focus not moved/trapped/restored, Esc closes nothing |
| 4 | 13 | 3 | all 25 screens | System (one token) | Focus ring at 14 % opacity is effectively invisible |
| 5 | 6 | 3 | every form (7 forms) | System (shared validation) | No error summary/focus, errors don't clear, no aria links, generic messages, error toasts |
| 6 | 5 | 3 | Add Activity, every page render | System (core.js, activities.js) | Focus dropped to `<body>` after each step and render |
| 7 | 4 | 3 | whole app | System (core.js routing) | No URL state: Back leaves MHIS, refresh resets, no deep links, filters lost |
| 8 | 8 | 3 | Add Activity | Screen (activities.js) | "Change activity" wipes all data while promising only non-applicable details |
| 9 | 7 | 3 | Add Activity (facility-based activities) | Screen (activities.js + facilities.js) | Brief's "Add Facility in a modal without leaving the activity form" is missing |
| 10 | 10 | 2 | 9 list pages | System (row-actions component) | Inconsistent, mostly icon-only row actions; brief's "Edit visible + More Actions" not applied; Send Announcement hidden as an icon |

Next in line: #14 (admin home tiles not keyboard reachable, sev 3, Screen), #15 (contrast on Home, sev 3, System),
#11 (Activities list/labels vs brief, sev 2), #9 (sticky Save on long forms, brief requirement), #18 (data contradictions
and date formats).

### Top 5 fixes (system level)

1. **Accessible layers** (#2, #3): one dialog/popover helper in `shared-ui.js` used by confirm, form modal, notification
   panel/detail and account menu; notification items as buttons; bell named with the unread count.
2. **One exit guard + hash routing** (#1, #4): `core.js` writes `#page[/id]` on navigation, renders on `hashchange`,
   and every exit (sidebar, breadcrumb, top bar, notification, Log Out, Back, `beforeunload`) goes through
   `hasUnsavedActivityChanges() || appState.profileDirty`.
3. **Focus token + focus management** (#13, #5, #14): solid 2px `:focus-visible` outline token; focus the `h1` after
   render and the step heading after "Continue"; KPI tiles as buttons.
4. **Shared validation** (#6, #9, #20): field messages with `aria-describedby`, clear on fix, error summary that takes
   focus, sticky action bar with save state, one button order.
5. **Activity editor fixes against the brief** (#7, #8, #11): Add Facility modal in the form, keep compatible values on
   Change activity, brief's 5-column list and "Save Work / Submit & Publish / Cancel" labels, a Draft row in the seed.

## Conflicts with locked decisions (do not "fix" without the client)

- **Desktop-first / no mobile data-entry design (brief, CLAUDE.md):** #23 recommends only stacking the login page and
  a drawer sidebar; it does **not** recommend simplifying desktop forms. If the client considers even that out of scope,
  accept #23.
- **Activity editor as a stepper with Continue:** the brief says "Tabs are dynamic configuration, not a fixed sequence"
  and lists actions "Save Work / Submit & Publish / Cancel". The build's stepper is clickable (non-linear), which fits;
  the button labels do not. Recommendation is to align labels to the brief, not to change the brief.
- **Single focal-persons table (#26):** the brief names two sections; the current table is a reasonable reading but
  should be confirmed with the client rather than changed unilaterally.
- **Kit default "mark optional, not required" (ux-patterns §3.2) and "Arabic in every product" (org defaults):** the
  project uses asterisks and is English-only by brief; not raised as findings.
- **Admin "Needs Your Attention" tiles:** the brief bans Needs Attention only on the NGO home; the admin version is
  allowed (brief › Admin home asks for work-area counts). Kept; only keyboard access is raised (#14).
- **Notification bell with modal for long content, no Inbox:** respected; fixes stay inside the dropdown/modal.

## What already works well (keep)

- Brief structure is respected: one shell, no Platforms selector, role-based sidebars, breadcrumbs on every non-home
  page, pills next to titles on most detail pages, Advanced Dashboard as an external button.
- Activity discovery: search by code, catalog wording and plain language with a "Why this matches" reason; dynamic
  sections differ visibly between 3.2 (5 steps) and 8.4 (3 steps); publish validation lists the missing fields per section
  with links.
- New/rejected/pending NGO scenarios are clear and gated; rejection reason is shown on Home and Profile.
- Personal-email warning on registrations is precise and actionable.
- User Management matches the brief's columns and filters; destructive access changes confirm with the email named.
- List pages share a consistent toolbar, count line and empty-row message.
