# Lead Management System Design

Date: 2026-05-22
Scope: V1 CRM core for a single internal sales/admin team
Status: Approved for planning

## 1. Goal

Build a responsive Lead Management System that gives an internal sales team one place to capture, assign, track, and work leads. The first version is optimized for faster response to incoming leads rather than deep analytics or broad enterprise controls.

## 2. V1 Scope

The first version includes:

- Internal authentication with email/password
- Two roles: `admin` and `sales`
- Lead entry through manual creation, CSV import, and website/API capture
- Lead pipeline with fixed stages: `New -> Contacted -> Qualified -> Proposal -> Won / Lost`
- Lead list with filtering and search
- Lead detail page with profile, owner, notes, activity timeline, and tasks/reminders
- Rule-based lead assignment with manual override
- Duplicate warnings on email or phone during create and import

The first version does not include:

- Email sending
- Calendar sync
- SSO/OAuth
- Complex reporting and analytics
- Duplicate merge workflow
- External client access

## 3. Users and Roles

### Admin

- Manage users
- Configure assignment rules
- Import leads from CSV
- View and edit all leads
- Reassign leads

### Sales

- View assigned leads
- Update lead stage
- Add notes
- Manage lead tasks
- Review lead timelines

This role model is intentionally narrow for v1. It supports one internal team without adding permission complexity that is not yet needed.

## 4. System Architecture

The system will use a locally runnable full-stack React + Node.js architecture:

- `client`: React application for the CRM user interface
- `server`: Node.js API for authentication, lead workflows, imports, assignments, and activity logging
- `database`: PostgreSQL for relational data storage

This split keeps business rules in the backend, which is important because lead assignment, duplicate checks, import processing, and API capture must behave consistently no matter how a lead enters the system.

Local development environment:

- React development server for the frontend
- Node.js server for the API
- Local PostgreSQL instance
- Environment-based configuration for database connection, API URL, and authentication secrets

## 5. Server Modules

The backend should be organized into small modules with clear ownership:

- `auth`: login, password handling, session or token issuance, role guards
- `users`: user management for internal staff
- `leads`: lead CRUD, stage updates, ownership, duplicate checks
- `assignments`: assignment rule evaluation and manual reassignment
- `activities`: timeline event creation and retrieval
- `tasks`: task creation, updates, completion, and due dates
- `imports`: CSV upload, parsing, validation, row result reporting
- `capture`: public website/API lead ingestion

Each module should expose a clear API surface and avoid reaching across boundaries for unrelated concerns.

## 6. Main Screens

### Login

Email/password login for internal users only.

### Lead List

Primary working screen for daily use. It should support:

- Search
- Filter by stage
- Filter by owner
- Filter by source
- Quick visibility into assignment and follow-up state

### Lead Detail

Primary edit and work surface. It should include:

- Lead profile data
- Current stage
- Current owner
- Notes
- Activity timeline
- Tasks and reminders

### CSV Import

Upload and process CSV files with a validation summary and row-level error reporting.

### Admin Settings

Admin-only area for:

- User management
- Role management within the `admin` and `sales` model
- Assignment rule management
- Lead capture source configuration

## 7. Lead Intake and Data Flow

All intake paths should converge into the same backend workflow:

1. A lead is created manually, imported through CSV, or received through website/API capture.
2. The server validates required fields and payload structure.
3. The server checks for duplicate matches on email and phone.
4. If a possible duplicate exists, the system warns the user or flags the row during import review.
5. If the lead proceeds, the server creates the lead record.
6. The server evaluates assignment rules and assigns the lead or leaves it in a defined fallback state.
7. The server writes activity entries such as lead creation and assignment result.
8. Users continue work from the lead list and lead detail pages, and meaningful changes keep appending to the activity timeline.

This unified flow prevents behavior drift between manual entry, imports, and public capture endpoints.

## 8. Lead Assignment

V1 assignment behavior:

- Rules are configured by admins
- Rules may target source, region, or other supported lead attributes
- Assignment runs when a lead is created
- Users with sufficient permission can manually reassign a lead afterward

Fallback behavior:

- If no rule matches, the lead is left unassigned or assigned to a default owner, depending on final implementation choice during planning
- If rule evaluation fails, the system records the failure and uses the same fallback path

The assignment engine should be simple and explicit in v1. It should support deterministic rule evaluation rather than advanced prioritization or machine-assisted routing.

## 9. Duplicate Handling

Duplicate handling is warning-based in v1:

- Match on email
- Match on phone
- Warn during manual creation
- Report potential duplicates during CSV import

Warnings are non-blocking. Users may continue creating the lead after seeing the warning. Merge and deduplication workflows are intentionally deferred to a later version.

## 10. Activity Timeline and Tasks

Each lead has a timeline that records operationally relevant events:

- Lead created
- Lead assigned or reassigned
- Stage changed
- Note added
- Task created
- Task updated
- Task completed

Tasks belong to a lead and include:

- Title
- Due date
- Assignee
- Completion state

This keeps follow-up work attached directly to the lead record, which supports the stated v1 goal of helping sales respond faster.

## 11. Error Handling

### CSV Import

- Report validation failures per row
- Do not fail silently
- Return a clear import summary

### API Capture

- Return explicit validation errors for malformed payloads
- Reject invalid input with clear status codes

### Assignment

- If assignment logic fails, use the defined fallback assignment state
- Record the failure in logs and, when useful, in the lead activity history

### Authentication

- Fail closed on unauthorized access
- Redirect users back to login when authentication is missing or invalid

### Duplicate Warnings

- Present clearly
- Do not block creation in v1

## 12. Responsive UX Expectations

The application must be responsive from the first version because the user explicitly requested it.

Responsive expectations:

- Lead list remains usable on tablet and smaller laptop widths
- Lead detail layout stacks cleanly on narrow screens
- Forms remain readable and operable on mobile-sized viewports
- Tables and filters degrade gracefully rather than overflowing into unusable layouts

V1 is still an internal work tool, so the interface should optimize for dense, efficient workflow rather than marketing-style presentation.

## 13. Testing Strategy

### Backend Unit Tests

- Assignment rule evaluation
- Duplicate detection
- Authentication guards
- CSV parsing and validation
- Lead stage transition behavior

### Backend Integration Tests

- Manual lead creation
- CSV import flow
- Website/API capture flow

### Frontend Tests

- Login flow
- Lead list filtering and search
- Lead detail updates
- Task creation and completion

### End-to-End Test

One core workflow should be covered end to end:

1. Create a lead
2. Auto-assign it
3. Update its stage
4. Add a note
5. Create a task

## 14. Delivery Boundaries for Planning

This design is intentionally scoped to one implementation plan:

- One internal team
- One responsive web app
- One backend API
- One relational database
- One core CRM workflow centered on lead response and tracking

Any future work such as analytics, outbound communications, merge workflows, calendar integration, or multi-team permissions should be planned as follow-on phases rather than folded into this first build.
