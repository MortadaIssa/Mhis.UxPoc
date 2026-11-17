# MHIS UX POC Brief

Updated 16 November 2026 to reflect the decisions taken after the client feedback of September 2026.

## Reference material rule

Reference screenshots describe the current business capabilities and data only. They are not UI specifications. New pages must follow the approved POC information architecture and visual system.

## Objective

Create a clickable desktop-first proof of concept that demonstrates how the current MHIS application can become easier to understand and navigate without redesigning its business processes or introducing a large technical refactor.

The POC must visibly look and behave differently from the current application.

The most important changes are:

- One coherent MHIS application.
- Persistent left sidebar.
- No Platforms selector.
- Clear role-based navigation.
- Useful NGO and admin home pages.
- Direct access to Activities, Facilities, Providers, Dashboards, Surveys, and Events Calendar.
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

- NMHP logo and MHIS identity.
- Events Calendar shortcut.
- Notification bell.
- Logged-in organization or administrator.
- Account menu.

The account menu may contain:

- Change Password.
- Log Out.

There is no Platforms selector and no separate platform area. MHIS is the umbrella application. The 4Ws Platform and the Substance Use Platform appear only as named sidebar groups, breadcrumb labels, and home page cards, all inside the same shell. A platform is never a gate the user has to find or pass through to reach a task.

## Breadcrumb and page headers

Every page except Home starts with a breadcrumb: Home › sidebar group › page › detail. For an NGO, the sidebar group is the platform the page belongs to.

Detail pages (registration review, event review, duplicate facility review, organization details, resource topics, Add Activity, the activity editor) do not repeat a Back link. The breadcrumb is the way back.

A status pill sits next to the page title, not at the far right.

Leaving the activity editor with unsaved changes, by any route (sidebar, breadcrumb, top bar, notification), asks for confirmation.

## Existing NGO navigation

- Home
- Events Calendar
- Organization (group)
  - Profile
  - Facilities
  - Providers
- 4Ws Platform (group)
  - Dashboard
  - Activities
- Substance Use Platform (group)
  - Dashboard
  - Surveys
- Resources & Support (group)
  - Resources & Help
  - Contact Us

The Substance Use Platform group is hidden for NGOs that are not eligible.

Sidebar labels do not use "My". Page titles match the sidebar labels, except the two dashboards, which are titled 4Ws Dashboard and Substance Use Dashboard.

## Existing NGO home

The home page is led by the reporting platforms. Show, in this order:

1. Welcome heading with organization name.
2. One card per platform (4Ws, then Substance Use when eligible). Each card contains:
   - Platform name, a one-line purpose, and an About link in the top-right corner that opens the matching Resources & Help topic.
   - A progress glance. 4Ws: the headline figures of the 4Ws Dashboard (activities, ongoing, beneficiaries). Substance Use: submitted surveys against the expected surveys for the current reporting year, as a progress bar, plus the number of drafts.
   - Two action tiles: Add Activity / Add Survey (primary), and Check Progress, which opens that platform's dashboard.
3. Recent Announcements and Upcoming Events, side by side.

When the NGO is not eligible for Substance Use, the 4Ws card takes the full width, with name and actions on the left and the progress glance on the right.

Do not show Needs Attention until it is backed by real functionality. Do not show an overview of counts across the whole system.

## New NGO scenarios

The POC must simulate these scenarios independently.

### Profile incomplete

The NGO may access only:

- Home
- Organization Profile
- Resources & Help

The home page directs the NGO to complete and submit its profile.

### Awaiting review

After profile submission, show a concise confirmation that NMHP is reviewing the registration.

Operational modules remain unavailable.

### Rejected

Show the rejection reason and an Update and Resubmit action.

### Approved

The NGO receives the complete existing-NGO navigation.

The POC does not need to synchronize the NGO scenario with the admin scenario.

## Organization Profile

For an NGO:

- Open directly in editable mode.
- Contain General Information, 4Ws Focal Persons, and Substance Use Focal Persons.
- Use consistent required-field indicators and validation.
- Keep Save or Submit for Review visible on long forms.

Facilities and Providers must not appear as profile tabs. They are not part of the registration process: an organization registers with its profile and focal persons only.

For an administrator:

- Use a separate read-only registration review screen.
- Allow Approve or Reject.
- Do not allow the administrator to edit NGO information.
- Organization Management lists the approved organizations. Opening one shows its full data in three read-only tabs: Profile, Facilities, and Providers. Facilities and providers can be opened for details and exported.

## Facilities and Providers

Create separate management pages using consistent list-page conventions:

- Page title.
- Add action.
- Search and filters.
- Record count.
- Readable table.
- Edit as a visible action.
- Secondary actions under More Actions.

When an activity requires a facility, allow Add Facility through a modal without leaving the activity form.

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

Each platform has a Dashboard item in its sidebar group.

Represent the existing 4Ws dashboard without redesigning its reports.

The Advanced Dashboard is not a sidebar item. It opens the Power BI report in a new browser tab from a button on the 4Ws Dashboard page.

The Substance Use Dashboard is a placeholder built from the survey list until its real content is defined.

## Resources & Help

One page with one sidebar entry, grouped in three sections:

- General: About MHIS, About NMHP, What’s New, NMHP Resources Page (external link).
- 4Ws Platform: List of 4Ws Sub-Activities, About the 4Ws Platform, Annual Reports.
- Substance Use Platform: List of Substance Use Sub-Activities, About the Substance Use Platform, Annual Reports.

The Substance Use section is hidden for NGOs that are not eligible. An NGO that is not approved yet sees only the General section.

## Events Calendar

Use a labelled Events Calendar navigation item.

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
- Organizations & Users (group)
  - Organization Registrations
  - Organization Management
  - User Management
- Reviews (group)
  - Event Reviews
  - Potential Duplicate Facilities
  - Pending Custom Values
- Announcements (group)
  - Audience Groups
  - Announcement History

The client asked to remove Content & Resources, so the administrator has no What’s New Management or Resources & Help item.

## Admin home

Show concise work-area counts for:

- New Organization Registrations.
- Events to Review.
- Potential Duplicate Facilities.
- Pending Custom Values.

Also provide direct access to Review Organization Registrations, Organization Management, User Management, and Create Announcement.

## Registration review

Separate registration review from user access management.

Registration review values:

- Pending Review
- Approved
- Rejected

Account access values:

- Active
- Inactive

An approved organization may later become inactive without being considered rejected.

The administrator may review, approve, or reject but may not edit the submitted profile.

Registration email:

- The registration form blocks personal webmail domains (Gmail, Outlook, Yahoo, and similar).
- A personal work address on the organization's own domain cannot be detected by a pattern. Instead, when a registration is pending review, the sign-in email is compared with the director's and focal persons' names in the same profile. If it contains one of those names, Registration Review shows a "Possible personal email" warning, and the Organization Registrations list marks the email. The administrator decides.

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