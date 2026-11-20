# DESIGN.md: MHIS UX POC

> This project's design decisions. The generic rules live in the `design-kit` skill (v4.2.1).
> Claude: read this before any UI work, keep it current, and never delete entries from the decision log (§5).
> `docs/UX-BRIEF.md` stays the approved redesign direction; this file records how the kit applies to it.

---

## 1. Brief

```yaml
project: "MHIS UX POC (Lebanon National Mental Health Programme information system)"
mode: "web-app"
path: "adopt → polish"
main_topic: "NGO staff report mental-health activities, surveys, facilities and providers to NMHP; NMHP admins review and manage organizations"
ui_decisions: "docs/UX-BRIEF.md (approved direction, highest priority) + CLAUDE.md 'Non-negotiable UX decisions'"
requirements: "docs/UX-BRIEF.md (no R-ids yet)"
screen_specs: "none: existing screens are the spec"
users_and_roles: "Existing NGO (full), NGO not eligible for Substance Use (4Ws only), new NGO (profile incomplete / awaiting review), NGO with a returned registration, NMHP administrator"
primary_task: "NGO: log an activity it performed; Admin: review and approve registrations"
context_of_use: "desktop, office, periodic reporting"
languages: [en]
brand_source: "NMHP Mental Health BRIDGE theme (bridge.nmhp-lb.com)"
current_tools: "the current MHIS application (reference/)"
constraints: "clickable POC only: plain HTML/CSS/vanilla JS served by ASP.NET static files; no packages, no build, no backend; desktop-first; WCAG 2.2 AA basics"
success_signal: "the client sees a clearly simpler MHIS in a walkthrough"
```

---

## 2. Direction

```
Chosen direction:      the existing POC (approved iteratively by the client; see UX-BRIEF.md, updated 2026-11-18)
Idea in one sentence:  one MHIS shell with a persistent role-based sidebar; each reporting platform is its own area (own sidebar, Overview, Back to MHIS), entered from MHIS Home or the sidebar
Density · type · navigation · accent use: comfortable · Inter · left sidebar + breadcrumb · teal #097d63 for primary actions and active nav
What makes it specific to this business:   4Ws / Substance Use platform groups, dynamic activity forms per sub-activity, NGO registration lifecycle
What we deliberately don't do:  inbox or messaging, workflow or journey management, a hidden Platforms dropdown, user roles, first-visit page variants, mobile data entry
```

### Domain and market
```
Primary view:          table (lists) + full-page editor (activities)
```

---

## 3. System

```
Canonical token file:  Mhis.UxPoc/wwwroot/css/style.css (:root block at the top)
Components:            Mhis.UxPoc/wwwroot/js/shared-ui.js (form modal, confirm dialog, toast, list select) + style.css classes
Fonts:                 interface: Inter (self-hosted, wwwroot/fonts) · Arabic: n/a
Shape:                 radius tokens 6/8/12/16/24 · borders + low shadows
Icons:                 Lucide (vendored wwwroot/js/vendor/lucide.min.js) · line icons only
Scope:                 dark mode no · RTL no · widths checked 1440 / 1280 (desktop-first)
Known inconsistencies: (adoption baseline 2026-11-17)
  - 4 font weights (aim 3), 7–12 font sizes per screen (aim ≤ 6)
  - spacing off the 4px scale (10, 14, 34, 22px…), radius 10px not a token
  - 42 colour literals in style.css outside :root, plus data.js:395-397 and notifications.js:22
  - 7 JS files over 400 lines
  Not scheduled: cleaning these is a global restyle of an accepted design (CLAUDE.md), so it waits for an explicit request.
```

---

## 4. Gates

```
D  Discovery:   n/a for existing areas (shell, ngo, admin); adopted 2026-11-17
P  POC:         n/a: the running POC is the approved design
I  Implement:   IN PROGRESS: adoption fix plan, groups A/B/D (POC scope)
Q  Verify:      FAIL (baseline 2.81 / 5) · report: design/adoption/2026-11-17/BASELINE.md · plan: design/adoption/2026-11-17/PLAN.md
Changes that reopen the POC: new interactions or screens (e.g. Add Facility modal, Activities list columns, row-action pattern)
```

---

## 5. Decision log

```
2026-11-17: Adopted design-kit 4.2.1 (adopt path), enforcement in warn mode; reason: /design-kit:adopt; by: Mortada Issa
2026-11-17: Kit files (this DESIGN.md, design/state.json, design/adoption/*) live in the repo, an explicit exception to CLAUDE.md "no extra planning/status Markdown"; reason: user answer "Repo, as kit expects"; by: Mortada Issa
2026-11-17: Fix scope is POC-level: "This is a POC just walkthough UI/UX problems and standard rules, instead of making it an application ready to publish" → chosen set "Visible UX + basic rules". In: change-activity data wipe, Log Out losing an unsaved activity, Approve confirmation, contradictory mock data, dead controls, sticky Save, field-level validation that doesn't jump or stay or appear only as a toast, visible focus ring, contrast, keyboard access to calendar days and admin tiles, Esc closes dialogs. Out: hash routing and deep links, screen-reader ARIA plumbing, beforeunload, file splits, token cleanup; by: Mortada Issa
2026-11-17: Conflict, stack: org default Vite + React vs project plain HTML/JS → project wins (level 3); structure-check runs with --structure off
2026-11-17: Conflict, font: org default IBM Plex vs Inter (BRIDGE theme, locked) → project wins (level 2)
2026-11-17: Conflict, languages: org default EN + AR vs English only (UX-BRIEF) → English only; RTL checks N/A
2026-11-17: Conflict, widths: org 1440 … 390 vs desktop-first (UX-BRIEF out of scope: mobile data-entry) → verify at 1440 and 1280; the 390 top-bar overflow is logged, not planned
2026-11-17: Open with client: the activity editor labels (build: Save Draft / Continue / Publish Activity; brief: Save Work / Submit & Publish / Cancel), and focal persons as two sections (brief) vs one table with a Platform column (build)
2026-11-17: dk-verify structure = none: no kit profile fits plain HTML/JS, and verify can't run the profile-free mode on it; the colour and size findings come from the manual baseline run (BASELINE.md) and their cleanup is deferred (PLAN R4, R5)
2026-11-17: Chunk 1 done (shell system fixes): visible :focus-visible ring (style.css), announcement date contrast, Esc closes dialog/panel/menu with focus return, focus moved into dialogs (Cancel first in confirms), notification items and admin tiles keyboard-operable (shared makeKeyboardActivatable), bell named "Notifications, N unread", calendar events keyboard-operable (day double-click stays a mouse shortcut for "Add Event"), Log Out asks before discarding an unsaved activity. Verified: ui-lint/ux-check errors cleared on 5 affected screens, 15/15 walk checks, dk-verify 29 pass / 2 fail (sign-in form, chunk 2)
2026-11-17: Validation messages are field-specific, built from the label ("Enter organization name", "Select governorate"); reason: user chose "Field-specific (Recommended)"; by: Mortada Issa
2026-11-17: On long forms an invalid Save jumps to and focuses the first invalid field, and "N fields need attention" shows beside the submit button; no error summary, no toast. The activity editor keeps its existing per-step summary (multi-step), now focused; reason: user chose "Jump to first error (Recommended)"; by: Mortada Issa
2026-11-17: Chunk 2 done (shared validation): validateForm/setFieldError/clearFieldError in shared-ui.js back validateProfileForm and validateModalForm (all callers), plus sign-in and the activity editor; one reserved 16px message line per field; aria-invalid and aria-describedby; errors clear when fixed; invalid fields stay red while focused; sign-in is a <main> landmark. The registration wizard keeps its own messages (already specific). Verified: sign-in ux-check --forms/--forms-server 0 errors and 0 warnings, 15/15 walk checks, dk-verify PASS 31/31
2026-11-17: Verification sessions are demo localStorage states (.design-kit/auth-<account>.json); no deep links, so dk-verify covers each account's landing screen and inner screens are checked with the adoption shim
2026-11-18: Platform areas (client meeting): the NGO account is shared by several people and NMHP does not want user roles, so each reporting platform is its own area inside the shell: own sidebar (Back to MHIS, Overview, work pages, Dashboard, Resources & Help, Contact Us), entered from the MHIS Home cards or the Reporting Platforms sidebar group in the same tab, top bar "MHIS / <platform>". Every sign-in lands on MHIS Home; no first-visit variants; by: Mortada Issa
2026-11-18: MHIS Home: platform cards (description, Read More dialog, Open), Recent Announcements, Upcoming Events. No Needs Attention, no focal persons on cards, no platform figures (they are on the platform Overview); by: Mortada Issa
2026-11-18: Organization Profile is one page with four tabs (Organization Details, Focal Persons in 4Ws / Substance Use sections, Facilities, Providers), shared by the NGO, the registration, Registration Review and Organization Management. Organization Details sections: Identity, Contact Details, Director, Areas of Responsibility (AORs), Links; labels drop "Institution". Providers are in scope again. This closes the focal-persons open point (two sections); by: Mortada Issa
2026-11-18: Registration: all tabs visible, only Organization Details required, "Before You Submit" panel with Submit for Review / Save Draft, profile locked while Pending Review; by: Mortada Issa
2026-11-18: Registration review: Approve (with confirmation), Request Changes (required message), Decline (required reason; not final, details later). Statuses Incomplete, Pending Review, Changes Requested, Approved, Declined; "Rejected" removed. Admin Reviews group: Organization Registrations, Event Review, Duplicate Facility Review, Custom Value Review; by: Mortada Issa
2026-11-18: Not now: Add Facility from the activity form (removed from UX-BRIEF), Needs Attention on Home, an Advanced Dashboard for Substance Use; by: Mortada Issa
2026-11-18: Shell scroll fix: .main-container takes the window height below the top bar, so the sidebar stays in place and the sticky action bars (Save Changes, editor actions, Before You Submit) work
2026-11-18: Registration resubmission: a submitted profile stays Pending Review, read-only and marked as submitted, with Update and Resubmit on Home and in the profile panel; resubmitting replaces the submission. Supersedes "profile locked while Pending Review" above; by: Mortada Issa
2026-11-18: Before You Submit is a track: progress bar, one clickable step per tab with a Required/Optional tag and its status, then Submit. Save Draft sits above Submit and shows only with unsaved changes; by: Mortada Issa
2026-11-18: Administrator queues renamed so "Review" is not repeated: group To Review with Submitted Profiles, Submitted Events, Possible Duplicate Facilities, Submitted Custom Values (supersedes the names above). Decision buttons ordered by use: Request Changes, Approve, then Decline outlined in red after a divider. No top-bar calendar icon for administrators or NGOs not approved yet; by: Mortada Issa
2026-11-18: Administrator Events Calendar: item under Home and the top-bar calendar icon (supersedes "no calendar icon for administrators" above). All organizations' events with an Organization filter; the administrator edits only NMHP events; event approval stays in Submitted Events; by: Mortada Issa
2026-11-18: Platform sidebar: Back to MHIS moves from the top to a pill at the bottom of the sidebar, so it reads as leaving the platform rather than as a menu item; by: Mortada Issa
2026-11-18: Fixes: sticky Save Changes and editor action bars reach the window bottom (no strip of the form shows under them); shared-mailbox checkbox aligned with its label; calendar month and week columns keep equal widths with long event titles
2026-11-18: Back to MHIS restyled: same shape and size as the platform name block at the top of the sidebar (no description), deeper green tint with a solid green arrow icon, instead of the small outlined pill; by: Mortada Issa
2026-11-20: Platform sidebars (client review of the POC): 4Ws Platform: Overview, Activities, My Dashboard, Advanced Dashboard; Substance Use Platform: Overview, Surveys, My Dashboard, Advanced Dashboard; Resources & Support and Back to MHIS unchanged. "My Dashboard" is a client-requested exception to "no My in sidebar labels"; the dashboard pages keep their titles (4Ws Dashboard, Substance Use Dashboard). Advanced Dashboard opens the "Opens in a new browser tab" page of the first POC, with Open Advanced Dashboard; the Advanced Dashboard button on the 4Ws Dashboard page is removed. Supersedes "Not now: an Advanced Dashboard for Substance Use" (2026-11-18); its Power BI link is still to come from NMHP; by: Mortada Issa
2026-11-20: Platform Overview actions: Add Activity, My Activities, Go to My Dashboard (Substance Use: Add Survey, My Surveys, Go to My Dashboard); At a Glance unchanged; by: Mortada Issa
2026-11-20: Organization Management (client request): Approved column (approval date, most recent first) with a "Not started" flag under the date when the organization has added no facility, activity or survey since approval, a Since Approval filter (Started / Not Started), and "Approved on" on the organization page, so NMHP can follow up. The POC reads a mock flag (contributedSinceApproval); the real application derives it from records created after the approval date; by: Mortada Issa
```
