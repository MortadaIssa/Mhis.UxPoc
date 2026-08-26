# Current MHIS — Business & UX Reference Notes

Distilled once (2026-08-26) from `reference/Overall Business Cases.md`,
`reference/Current User Experience Catalog.md`, and all 21 screenshots in
`reference/images/`, so future sessions can read this single file instead of
re-opening the images. See `docs/UX-BRIEF.md` for the *target* design — this
file only describes the *current, real* application and why it's confusing.

## Business model in one page

Two user types: **NGO/organization** users and **Admin** (NMHP) users.

**NGO lifecycle:**
1. Registers a profile → stays inactive/unapproved until an Admin reviews and
   approves it (approval and "Active" account access are handled from the
   same Admin "Users Management" grid — this conflates two different
   concepts, see Pain Points below).
2. Once approved, defines **Facilities** (physical places where it operates).
   A facility has a support lifetime — start date, and optionally an end
   date, tracked *per NGO* (the same physical facility can be supported by
   multiple NGOs over different periods).
   - A background job flags facilities not reviewed in 6+ months and
     notifies the NGO. Until the NGO confirms/updates the list, they are
     **blocked from adding new activities**.
   - When an NGO adds a facility, the system searches for existing facilities
     within ~20 meters and only if a close match exists, creates a review
     record for Admin ("Facility Matching Review") to merge/link them —
     invisible to the NGO.
3. Registers **Activities** against sub-activities from a fixed catalog
   (~a 1.1/1.3/2.1-style code, defined outside this POC's scope — the catalog
   itself is out of bounds to restructure). Some activities are of type
   **Event**, which can be public or private and require Admin approval
   (approve/reject/request changes); Admin can export all events to Excel.
4. Some NGOs, based on which activities they've logged, become eligible for
   **Substance Use** surveys (currently a separate branded application, only
   reachable via Platforms → Substance Use).
5. Views **Dashboards** (in-app) and **Advanced Dashboards** (external Power
   BI link) built from its own activity data.
6. Sees **Notifications** — a mix of announcements (from Admin), action-
   required system notices (e.g. unreviewed facilities), and event updates.
7. Sees a shared **Calendar** of public events (all NGOs) and its own private
   events; can add events from the calendar too.
8. Reads static/informational pages (About NMHP, About MHIS, What's New,
   Glossary, Annual Reports) and can submit a Contact Us form.
9. Custom lookup values an NGO enters (when a dropdown doesn't have their
   option) go to Admin for review — Admin accepts as new or merges into an
   existing value ("Pending Custom Values").

**Guest (no login) experience:** a public grid + map of NGO activities with
filters (activity type, location, etc.) — no login required.

**Admin responsibilities:** approve/deactivate NGOs, approve/reject events,
resolve facility-duplicate matches, resolve pending custom lookup values,
manage provider types, manage Announcements (grouped by audience criteria)
and Announcement history, manage the "What's New" release notes.

## Screen-by-screen: current UX and why it's confusing

**Login** — Big half-screen decorative graphic with one quote; "View Mental
Health Services" doesn't look like a button; "Register now" is a small text
link. The decorative space is wasted — could preview the public activities
grid instead.

**Public Activities Grid / Map** — Guest-facing but dense/technical: raw
column names like "Referral Status" mean nothing to a guest. Getting back to
login requires noticing a tiny "NMHP" breadcrumb link, top right. Grid and
Map are separate tabs instead of a combined view. Export-to-Excel is exposed
to guests (probably unnecessary).

**MHIS Home Page (post-login)** — The core problem of the whole app: a
**"Platforms" mega-menu** (Admin / MHIS / 4Ws / Substance Use) that users must
discover and pick from, even though an NGO should never see "Admin" as an
option at all. New users land on a **blank home page** with no guidance —
they have to guess they need to fill their Organization Profile before
anything else, and that Profile lives under a top-right email dropdown, not
somewhere obvious. If facilities are missing, the app blocks *all* activity
creation and points to Profile → Facilities tab instead of letting the user
add a facility inline while creating the activity. A "Dashboard" top-nav
link exists but does nothing until you've drilled into Platforms → 4Ws first.
Warnings (e.g. "activities are incomplete, this affects dashboards") appear
without saying why or what to do.

**What's New** — Simple version/date/description list. Fine as-is, low
complexity.

**About NMHP / About MHIS** — Static text pages with a PDF download button.
Fine as-is.

**Profile** — Tabs: General Information, **Facilities**, **Providers**, 4Ws
Focal Person, Substance Use Focal Person. Facilities/Providers living under
Profile (rather than as their own sections) is called out as illogical in
the source notes — hence the POC's decision to make them independent nav
items. Edit mode is reached by scrolling all the way to the bottom of a long
read-only page to find an Edit button; Save/Cancel then also render at the
bottom-left (inconsistent with other pages, which use bottom-right).
Required fields are marked with a black star but inputs don't turn red until
you click Save — not preventive.

**Profile — validation** — Inconsistent per-field validation UX in the same
form: one field shows a message ("Required, Invalid Format") permanently
under the input, a sibling field just turns the border red with no
accessible tooltip/explanation at all.

**Facilities Management** (grid, reached via Profile → Facilities tab in the
current app) — Add button top-right, Export top-left, inline Edit/Delete
actions, sometimes an inline active/inactive checkbox toggle. Record count is
a plain number instead of "showing 30 of 1,870."

**Shared Calendar** — Color-coded by type (Event, Event Pending, Training,
Training Pending, Awareness Campaign, Awareness Campaign Pending, Canceled).
Month/Week/Day views, "+" to add an event. Public events added here directly;
events originating from Activities are treated as private to that NGO.

**Notifications** — One dropdown mixes announcement-type items (from Admin)
with system notices (e.g. "Facility Support Continuity Review Required")
and event updates, but the *default* notification type in the underlying
data model is "Announcement" even when the content is really a system
notice — a data-modeling problem more than a UI one. Clicking a notification
can open a modal with an action button that jumps to another tab/screen.

**4Ws Dashboard** — Reached only via Platforms → 4Ws → My Dashboard. Tabs:
Facilities, Activities, Beneficiaries, Funding, Coordination Mechanism, each
with tables/exports drillable by Governorate/Caza. Empty for NGOs that
haven't logged data yet. "Advanced Dashboard" link opens external Power BI.
Annual Reports link goes to an external site. The POC intentionally does NOT
redesign dashboard contents — only how you reach them.

**4W Activities (My Activities list)** — Button says "Create New Activity"
(inconsistent with "Add Facility" elsewhere — the naming isn't standardized
in the real app). Row actions (edit/duplicate/delete) sit in a first column
as stacked icons rather than a clean trailing actions column like Facilities
has. A "please refer to the list of activities" link points users to a
separate Activities Catalog page/table (Code, Description, Definition,
References) because picking the right sub-activity code (e.g. "4.1") isn't
self-explanatory from the list screen alone.

**Add New Activity / Choosing Sub Activity** — The current flow *did* already
evolve to a searchable sub-activity dropdown (with an (i) info icon per
option showing its definition as a tooltip) rather than a two-step
Activity→Sub-activity picker — this part is already reasonably good. Once a
sub-activity is picked, tabs appear dynamically (seen here: Activity,
Location, Beneficiaries, Funding) — different sub-activities show different
tabs/fields. Work can be Saved without publishing; Submit & Publish requires
all required fields, and only published activities count in dashboards/
reports.

**Substance Use** — A visually separate application (own green header, no
shared sidebar) reached via Platforms → Substance Use, with only 3 actions:
Home (a description of the platform), Surveys (list + add + edit), and "Back
to Portal" (an odd label for "return to MHIS"). Business-wise it's simple:
just survey CRUD. The POC's decision is to fold this into the common MHIS
shell and drop "Back to Portal" entirely.

**Admin Console** — Admin also lands on a blank home page. Top nav:
Announcements, Console (dropdown: Custom Event Logs, Domain Migration,
Facility Management, Facility Matching Review, Pending Custom Values,
Provider Types, Users Management), Releases (drives the What's New page).
If an Admin opens Platforms, the only option is "Admin" — admins have no
NGO-scoped data, which the source notes flag as backwards (an admin should
arguably see cross-NGO Facilities/Activities, but that's explicitly out of
scope for this POC to fix).

**User Management** — The approval workflow for NGOs is bolted onto the same
grid as ongoing account access control: a brand-new registration shows up
with "Active" unchecked, indistinguishable at a glance from an NGO an admin
deliberately deactivated later. Clicking the org name opens the same generic
Profile page used by NGOs themselves (read-only in effect, but not a
purpose-built review screen). This is exactly why the POC brief separates
"Registration review" (Pending Review/Approved/Rejected) from "Account
access" (Active/Inactive) as two distinct concepts.

**Announcement Criteria** — Admin defines reusable "criteria" groups
(audience targeting rules); sending an announcement means picking a group
and writing the message. A separate Announcement History/Log grid (not
pictured) lists everything sent. The POC brief renames "Announcement
Criteria" to "Audience Groups" for clarity.

## Cross-cutting UX pain points (drive the POC's non-negotiable decisions)

- **"Platforms" is the root problem** — MHIS/4Ws/Substance Use/Admin are
  presented as separate apps/platforms a user must know to switch between,
  when they're really one system. → replaced by one persistent sidebar.
- Nothing on the blank home page tells a new/incomplete NGO what to do next
  → POC gives each registration state its own explicit home-page guidance.
- Facilities/Providers are buried inside Organization Profile → POC makes
  them independent top-level sections.
- A missing facility hard-blocks activity creation with no inline fix → POC
  allows adding a facility inline (modal) from the activity form.
- Status/warning banners appear without explaining why or what to do → POC
  rule: show status only when it's necessary to explain access or an action.
- Notification type modeling conflates announcements with system/action
  notices → POC keeps notifications but with real typed categories
  (Announcement, Action Required, Event Update, System Notification).
- Registration approval and account activation are the same checkbox → POC
  keeps them as two distinct states.
- Inconsistent validation feedback (some fields get messages, some don't;
  some pages put actions bottom-left, others bottom-right) → POC standardizes
  these patterns once across all pages.
