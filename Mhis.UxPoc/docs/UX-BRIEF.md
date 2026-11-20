# MHIS UX POC Brief

Updated 16 November 2026 after the client feedback of September 2026, 18 November 2026 after the client meeting on the platforms and the registration review (platform areas, Organization Profile tabs, review decisions, the registration track and resubmission, administrator queue names), and 20 November 2026 after the client's review of the POC (platform sidebars and Overview actions, the Advanced Dashboard page, approval dates in Organization Management).

## Reference material rule

Reference screenshots describe the current business capabilities and data only. They are not UI specifications. New pages must follow the approved POC information architecture and visual system.

## Objective

Create a clickable desktop-first proof of concept that demonstrates how the current MHIS application can become easier to understand and navigate without redesigning its business processes or introducing a large technical refactor.

The POC must visibly look and behave differently from the current application.

The most important changes are:

- One coherent MHIS application: one shell, one sign-in, one look.
- Persistent left sidebar.
- No hidden Platforms selector: each reporting platform is a named area, entered from MHIS Home or the sidebar.
- Clear role-based navigation.
- Useful NGO and admin home pages.
- Each person reaches their own work directly: common organization data in MHIS, activities in the 4Ws Platform, surveys in the Substance Use Platform.
- Improved notifications without introducing an Inbox.
- Dynamic activity forms based on the selected sub-activity.

## Priority

Priority 1:

- Existing NGO experience.
- New NGO registration and approval experience.

Priority 2:

- Admin experience.
- Public Mental Health Services.

## Application shell

Use a persistent left sidebar and a compact white top bar in the NMHP BRIDGE style.

The top bar contains:

- NMHP logo and MHIS identity, followed by the platform name inside a platform (MHIS / 4Ws Platform).
- Events Calendar shortcut, for approved NGOs and administrators.
- Notification bell.
- Logged-in organization or administrator.
- Account menu.

The account menu may contain:

- Change Password.
- Log Out.

## Platform areas

MHIS is the umbrella application. One NGO account is shared by several people (the 4Ws focal persons, the Substance Use focal persons, sometimes the same person), and NMHP does not want user roles. So an approved NGO works in one of three areas, each with its own sidebar inside the same shell:

- MHIS: the organization's common data and shared information.
- 4Ws Platform: activities and the 4Ws dashboards.
- Substance Use Platform: surveys and the Substance Use dashboard (eligible NGOs only).

Rules:

- A platform is entered from its MHIS Home card or from the Reporting Platforms group in the MHIS sidebar, in the same browser tab. There is no hidden Platforms dropdown.
- Inside a platform, the platform name heads the sidebar, Back to MHIS sits at the bottom of the sidebar, and the top bar shows MHIS / platform name. Back to MHIS has the same shape and size as the platform name block, in a deeper green with a solid green arrow icon, so it stands out from the menu items.
- The top bar (calendar, notifications, account) is the same in every area. Opening a page of another area (the calendar, a notification action) switches the sidebar to that area.
- Every NGO sign-in lands on MHIS Home. Pages look the same on every visit: no first-visit or returning-visit variants.
- An administrator and an NGO that is not approved yet have a single sidebar.

## Breadcrumb and page headers

Every page except Home and a platform Overview starts with a breadcrumb: Home › sidebar group › page › detail. Inside a platform, the breadcrumb starts at the platform name (4Ws Platform › Activities › Add Activity).

Detail pages (registration review, event review, duplicate facility review, organization details, resource topics, Add Activity, the activity editor) do not repeat a Back link. The breadcrumb is the way back.

A status pill sits next to the page title, not at the far right.

Leaving the activity editor with unsaved changes, by any route (sidebar, Back to MHIS, breadcrumb, top bar, notification, Log Out), asks for confirmation.

## Existing NGO navigation

MHIS area:

- Home
- Events Calendar
- Organization Profile
- Reporting Platforms (group)
  - 4Ws (opens the 4Ws Platform)
  - Substance Use (opens the Substance Use Platform)
- Resources & Support (group)
  - Resources & Help
  - Contact Us

4Ws Platform area:

- Overview
- Activities
- My Dashboard
- Advanced Dashboard
- Resources & Support (group)
  - Resources & Help
  - Contact Us
- Back to MHIS (at the bottom of the sidebar)

Substance Use Platform area:

- Overview
- Surveys
- My Dashboard
- Advanced Dashboard
- Resources & Support (group)
  - Resources & Help
  - Contact Us
- Back to MHIS (at the bottom of the sidebar)

The Substance Use Platform is hidden for NGOs that are not eligible.

Sidebar labels do not use "My", except My Dashboard, which the client asked for. Page titles match the sidebar labels, except My Dashboard, which is titled 4Ws Dashboard or Substance Use Dashboard.

## Existing NGO home

MHIS Home is the same page on every sign-in. Show, in this order:

1. Welcome heading with organization name.
2. Reporting Platforms: one card per platform (4Ws, then Substance Use when eligible). Each card contains the platform name and tagline, three short lines on what the platform is for, a Read More link that shows the platform's About text in a dialog, and an Open button that enters the platform.
3. Recent Announcements and Upcoming Events, side by side.

When the NGO is not eligible for Substance Use, the 4Ws card takes the full width.

MHIS Home shows no platform figures or actions. Do not show Needs Attention (facility reviews and other required actions already come as notifications). Do not show an overview of counts across the whole system.

## Platform Overview

Each platform opens on its Overview, the same page on every visit:

- Platform name and a one-line purpose.
- Main actions. 4Ws: Add Activity (primary), My Activities, Go to My Dashboard. Substance Use: Add Survey (primary), My Surveys, Go to My Dashboard.
- At a Glance. 4Ws: the headline figures of the 4Ws Dashboard (activities, ongoing, beneficiaries). Substance Use: submitted surveys against the expected surveys for the current reporting year, as a progress bar, plus the number of drafts.

With no data yet, the figures are zero and the first action is still Add Activity or Add Survey.

## New NGO scenarios

The POC must simulate these scenarios independently.

### Profile incomplete

The NGO may access only:

- Home
- Organization Profile
- Resources & Help
- Contact Us

The home page directs the NGO to complete and submit its profile.

### Awaiting review

After profile submission, show a concise confirmation that NMHP is reviewing the registration.

Operational modules remain unavailable. The profile is shown read-only and clearly marked as submitted. Home and the profile panel offer Update and Resubmit: the NGO edits the profile, then resubmits it or cancels the update. The status stays Pending Review, and NMHP reviews the latest submission.

### Changes Requested

Show NMHP's message and an Update and Resubmit action. The profile is editable again.

### Declined

Show NMHP's reason and a Contact Us action. The profile stays read-only.

### Approved

The NGO receives the complete existing-NGO navigation.

The POC does not need to synchronize the NGO scenario with the admin scenario.

## Organization Profile

Organization Profile is one page with four tabs, used everywhere the organization's data is shown:

- Organization Details, in five sections: Identity (Organization Name, Acronym, Logo), Contact Details (Phone Number, Mobile Number, Email), Director (Name, Email, Mobile Number), Areas of Responsibility (AORs: a Yes/No question, then the sectors), Links (Website, LinkedIn Profile, Daleel Madani). Required, as in the current MHIS: Organization Name, Phone Number, Email, and the three Director fields.
- Focal Persons, in two sections: 4Ws Focal Persons and Substance Use Focal Persons.
- Facilities.
- Providers.

For an NGO:

- Open directly in editable mode. Organization Details is saved with Save Changes, which stays visible at the bottom of the window on the long form. Focal persons, facilities and providers are saved one record at a time.
- Use consistent required-field indicators and validation.

During registration:

- The same page and tabs. Only Organization Details blocks Submit for Review; the other tabs can be filled now or after approval.
- A Before You Submit panel beside the tabs works as a track: a progress bar, one step per tab marked Required or Optional with what is filled or missing, then Submit for Review. Clicking a step opens its tab (on Organization Details, the first empty required field). The open tab is highlighted in the track.
- Save Draft sits above Submit for Review and appears only when there are unsaved changes.
- After submission the panel becomes Your Registration and offers Update and Resubmit. While updating, Cancel replaces Save Draft and the action becomes Resubmit for Review.

For an administrator:

- Registration Review and Organization Management show the same tabs, read-only. Organization Management adds a Users tab.
- Do not allow the administrator to edit NGO information.
- Organization Management lists the approved organizations. Facilities and providers can be opened for details and exported.
- Organization Management shows when each organization was approved: an Approved column, most recent first, and "Approved on" on the organization page. An organization that has added no facility, activity or survey since its approval is marked Not started, and the Since Approval filter (Started, Not Started) lists those organizations, so NMHP can follow up with them. The POC uses mock values; the real application derives them from the organization's records.

## Facilities and Providers

Facilities and Providers are tabs of Organization Profile and use the list-page conventions:

- Page title.
- Add action.
- Search and filters.
- Record count.
- Readable table.
- Edit as a visible action.
- Secondary actions under More Actions.

## Activities list

Use a direct Activities navigation entry.

Recommended table columns:

- Activity and Sub-Activity
- Facility and Location
- Period
- Last Updated
- Actions

Combine related information to avoid a crowded table.

Do not prominently display the reporting-only Activity Status field.

Use:

- A subtle Draft label when useful.
- Edit for editable records.
- View for completed records.
- Duplicate and Delete under More Actions.

## Add Activity

The sub-activity is selected using a searchable selector or Activity Catalog modal/panel.

The user can see:

- Code.
- Sub-activity name.
- Parent activity.
- Short definition.
- Additional details when requested.

Selecting a sub-activity generates the correct tabs and fields.

Tabs are dynamic configuration, not a fixed sequence.

The POC must include at least two activity examples with visibly different structures. For example:

- One activity may require Activity Details, Location, Beneficiaries, and Funding.
- Another may require Activity Details, Implementing Partners, and Beneficiaries without Location.

These are demonstrations only. Do not imply that these exact structures apply to all real activities.

Form actions:

- Save Work
- Submit & Publish
- Cancel

## Surveys

Surveys use the common MHIS application shell. They are only available to NGOs eligible for the Substance Use Platform.

Remove the separate Substance Use header and Back to Portal action.

Show:

- Survey filters.
- Existing surveys.
- Add Survey.
- Edit where permitted.

## Dashboards

Each platform has two dashboard items in its sidebar: My Dashboard and Advanced Dashboard.

My Dashboard opens the platform's dashboard page (4Ws Dashboard, Substance Use Dashboard). Represent the existing 4Ws dashboard without redesigning its reports.

Advanced Dashboard opens a page that tells the user the Power BI report opens in a new browser tab, so MHIS stays open. The page shows the report address and an Open Advanced Dashboard button. The report never opens straight from the sidebar, and the dashboard page has no second Advanced Dashboard button.

The Substance Use Dashboard is a placeholder built from the survey list until its real content is defined. NMHP has not provided the Substance Use Power BI report yet; until then its Open Advanced Dashboard button says that the report is not linked.

## Resources & Help

One page, present in every area, showing the topics of the area the user is in:

- MHIS: About MHIS, What’s New, NMHP Resources Page (external link).
- 4Ws Platform: List of 4Ws Sub-Activities, About the 4Ws Platform, Annual Reports.
- Substance Use Platform: List of Substance Use Sub-Activities, About the Substance Use Platform, Annual Reports.

An NGO that is not approved yet sees the MHIS topics only.

## Events Calendar

Events Calendar is a labelled item in the MHIS sidebar. For an approved NGO, the calendar icon in the top bar opens it from every area. NGOs that are not approved yet have no calendar.

The administrator has Events Calendar under Home and the same top-bar calendar icon. The administrator sees every organization's events, with an Organization filter, and edits only NMHP's own events. Event approval stays in To Review > Submitted Events.

Show public and private events and retain Add Event.

## Notifications

Keep the notification bell.

Do not create an Inbox.

Support these simulated notification types:

- Announcement
- Action Required
- Event Update
- System Notification

The dropdown shows:

- Type.
- Title.
- Short preview.
- Time.
- Read or unread presentation.

Long content opens in a modal.

A notification requiring action may contain a direct button such as Review Facilities or View Event.

The badge represents unread notifications.

## Admin navigation

- Home
- Events Calendar
- To Review (group)
  - Submitted Profiles
  - Submitted Events
  - Possible Duplicate Facilities
  - Submitted Custom Values
- Organizations & Users (group)
  - Organization Management
  - User Management
- Announcements (group)
  - Audience Groups
  - Announcement History

To Review holds every queue that waits for an NMHP decision, each named after what was submitted so the word Review is not repeated; Organizations & Users holds approved records. Page titles match the sidebar labels.

The client asked to remove Content & Resources, so the administrator has no What’s New Management or Resources & Help item.

## Admin home

Show concise work-area counts for:

- Submitted Profiles.
- Submitted Events.
- Possible Duplicate Facilities.
- Submitted Custom Values.

Also provide direct access to Review Submitted Profiles, Organization Management, User Management, and Create Announcement.

## Registration review

Separate registration review from user access management.

Registration review values:

- Incomplete (not submitted yet)
- Pending Review
- Changes Requested
- Approved
- Declined

Account access values:

- Active
- Inactive

An approved organization may later become inactive without being considered declined.

Decisions, as buttons in the Registration Review header, ordered by how often they are used:

- Request Changes (secondary button), with a required message. The organization updates and resubmits; the next review shows this message as the previous request.
- Approve (primary button), after a confirmation.
- Decline (outlined in red, after a divider), with a required reason, for registrations that are not genuine organizations, duplicates or tests.

NMHP emails each decision to the sign-in email and the focal persons, and sends an MHIS notification. Do not use the word Rejected for a registration.

The Submitted Profiles list opens filtered on Pending Review; the other statuses stay available in the filter.

The administrator may not edit the submitted profile.

Registration email:

- The registration form blocks personal webmail domains (Gmail, Outlook, Yahoo, and similar).
- A personal work address on the organization's own domain cannot be detected by a pattern. Instead, when a registration is pending review, the sign-in email is compared with the director's and focal persons' names in the same profile. If it contains one of those names, Registration Review shows a "Possible personal email" warning, and the Submitted Profiles list marks the email. The administrator decides.

## User Management

A user is a sign-in account that belongs to one organization. Today each organization has one shared account, but the page is built around users so that several users per organization only add rows.

- Columns: User (Sign-in Email), Organization (a link that opens the organization in Organization Management), Role, Account Access, Actions (Activate or Deactivate, Reset Password).
- Filters: search by email or organization, Organization, Account Access.
- Organization Management shows the same users in a Users tab of each organization, with a shortcut to User Management filtered on that organization. Access is changed only in User Management.

## Announcements

Rename Announcement Criteria to Audience Groups.

Provide:

- Send Announcement.
- Edit.
- Duplicate.
- Delete.
- Announcement History.

Announcement History shows, for each announcement, how many recipients have read it, and opens the list of recipients with their read status. It does not show Sent By, because only the NMHP Administrator sends announcements.

Do not introduce messaging or inbox functionality.

## Public Mental Health Services

The login screen remains the main application entry.

Provide a clear secondary action named Explore Mental Health Services.

The public screen contains:

- Activity filters.
- Location filters.
- Public results.
- Map.
- A clear return to Organization Sign In.

The map and results should work together.

Do not show Export in the public POC.

## Explicit exclusions

Do not add:

- Inbox.
- Messaging.
- Task center.
- Workflow engine.
- Backend integration.
- Authentication.
- Database.
- API.
- Mobile data-entry design.
- New reports or dashboards.
- New business processes.