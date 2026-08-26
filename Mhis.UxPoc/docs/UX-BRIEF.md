# MHIS UX POC Brief

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

Use a persistent left sidebar and a compact green top bar.

The top bar contains:

- MHIS identity.
- Notification bell.
- Logged-in organization or administrator.
- Account menu.

The account menu may contain:

- Change Password.
- Log Out.

Do not include Platforms in the top bar or anywhere else.

## Existing NGO navigation

- Home
- Organization Profile
- Facilities
- Providers
- Activities
- Surveys
- Dashboards
  - My Dashboard
  - Advanced Dashboard
- Events Calendar
- Resources & Help
  - Activity Catalog
  - Glossary of Terms
  - About 4Ws
  - About MHIS
  - About NMHP
  - What’s New
  - Annual Reports
  - Contact Us

Surveys are hidden for NGOs that are not eligible.

## Existing NGO home

The home page must direct attention clearly without becoming crowded.

Show:

1. Welcome heading with organization name.
2. Two prominent actions:
   - Add Activity
   - View Dashboard
3. One compact row of neutral summary tiles:
   - Activities
   - Facilities
   - Providers
   - Upcoming Events
4. A compact Needs Attention area, only when needed.
5. Recent Announcements.
6. Upcoming Events.

Needs Attention may contain a maximum of three concise items, such as:

- Continue saved activity drafts.
- Review facilities that require confirmation.
- Respond to an important system notification.

Do not use a workflow journey, progress tracker, or excessive status badges.

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

Facilities and Providers must not appear as profile tabs.

For an administrator:

- Use a separate read-only registration review screen.
- Allow Approve or Reject.
- Do not allow the administrator to edit NGO information.

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

Surveys use the common MHIS application shell.

Remove the separate Substance Use header and Back to Portal action.

Show:

- Survey filters.
- Existing surveys.
- Add Survey.
- Edit where permitted.

## Dashboards

Provide direct navigation to:

- My Dashboard.
- Advanced Dashboard.

Represent the existing dashboard without redesigning its reports.

Advanced Dashboard may be marked as opening Power BI externally.

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
- Organization Registrations
- Reviews
  - Event Reviews
  - Potential Duplicate Facilities
  - Pending Custom Values
  - Provider Types
- Organizations & Users
- Announcements
  - Audience Groups
  - Announcement History
- What’s New Management
- Resources & Help

## Admin home

Show concise work-area counts for:

- New Organization Registrations.
- Events to Review.
- Potential Duplicate Facilities.
- Pending Custom Values.

Also provide direct access to Create Announcement and Organizations & Users.

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

## Announcements

Rename Announcement Criteria to Audience Groups.

Provide:

- Send Announcement.
- Edit.
- Duplicate.
- Delete.
- Announcement History.

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