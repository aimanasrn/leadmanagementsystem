# MySQL Persistence Transition Design

Date: 2026-05-22
Scope: Replace the current stubbed CRM data flow with MySQL-backed Prisma persistence for the existing CRM core
Status: Approved for planning

## 1. Goal

Change the current Lead Management System from a UI and API skeleton with hardcoded or in-memory responses into a locally runnable CRM core backed by MySQL through Prisma. The goal is to keep the existing product scope stable while making the current login, lead, task, import, and capture flows persist real data.

## 2. In Scope

This pass includes:

- Switch Prisma datasource from PostgreSQL to MySQL
- Update environment configuration to use a MySQL connection string
- Add Prisma-backed persistence for `User`, `Lead`, `Activity`, and `Task`
- Replace hardcoded auth credentials with persisted user lookup
- Replace stubbed lead list, lead detail, lead create, and task create/list responses with Prisma-backed services
- Route manual lead creation, CSV import, and public capture through the same persisted lead creation flow
- Keep the current React screens, but make them data-driven from real API responses
- Verify the application against a real local MySQL setup

This pass does not include:

- SSO or production-grade session management
- Email sending
- Analytics/reporting
- Duplicate merge workflow
- New product features outside the current CRM core
- Broad API redesign beyond what is required to support persistence

## 3. Existing State

The repository already has:

- A React client with login, lead list, lead detail, import, and admin screens
- An Express server with auth, leads, imports, capture, and tasks route shells
- Prisma schema and server environment config still pointed at PostgreSQL
- Hardcoded auth credentials
- Stubbed lead and task responses
- Tests that currently validate the skeleton behavior

The design for this pass must preserve the existing boundaries where possible and replace the fake data path with a real persisted path.

## 4. Target Architecture

The monorepo structure remains unchanged:

- `client`: React UI
- `server`: Express API
- `server/prisma`: Prisma schema and generated client

The main architectural change is in the server:

- Route handlers remain thin
- Business logic moves into Prisma-backed service functions
- Shared lead creation logic becomes the single entry point for:
  - manual lead creation
  - CSV import ingestion
  - public capture ingestion

This keeps the code path consistent and prevents separate behaviors for different lead intake sources.

## 5. Persistence Model

The MySQL-backed persistence layer should support the current CRM core only:

### User

- id
- name
- email
- password hash
- role
- created at

### Lead

- id
- first name
- last name
- email
- phone
- source
- stage
- owner id
- created at
- updated at

### Activity

- id
- lead id
- type
- message
- created at

### Task

- id
- lead id
- title
- due date
- assigned to id
- completed

The schema should stay close to the current Prisma model definitions unless MySQL compatibility requires targeted adjustments.

## 6. Backend Behavior

### Authentication

For this pass, authentication can stay simple, but it must stop using hardcoded credentials.

Expected behavior:

- login looks up a user by email
- password is checked against persisted credentials
- successful login returns the same general response shape the client already expects
- failed login returns `401`

This pass should avoid over-designing auth. The goal is persisted identity, not full production auth hardening.

### Leads

The lead module should support:

- list leads
- get lead detail by id
- create lead

Lead detail should include related activities and tasks so the current lead detail UI can become data-driven.

Lead creation should:

1. validate input
2. check duplicate email and phone against persisted leads
3. apply assignment logic
4. create the lead
5. write initial activity entries
6. return the created lead plus duplicate warnings

### Tasks

The task module should support:

- create task for a lead
- list tasks by lead

Task creation should also write an activity entry for the related lead.

### Imports

CSV import should keep row-level validation behavior, but valid rows must now persist through the shared lead creation service rather than returning a validation-only result.

### Capture

The public capture endpoint should also call the shared lead creation service so captured leads land in the same database-backed workflow as manually created and imported leads.

## 7. Client Behavior

The current screens remain in place, but they become real clients of the API:

### Login Page

- submit credentials to the auth endpoint
- handle success and failure from the real backend

### Lead List

- fetch real lead records from `/leads`
- render persisted name, stage, source, and owner data

### Lead Detail

- fetch a real lead by id
- render persisted profile information
- render activities from the database
- render tasks from the database

### Task Actions

- create tasks through the API
- refresh the detail view after creation

### Import Page

- submit CSV content to the backend
- show validation and persistence results

The client should remain responsive, and this pass should not attempt a broad redesign of the UI.

## 8. Error Handling

The server should provide clear behavior for common failure modes:

- invalid MySQL connection: fail clearly during startup or first Prisma initialization
- invalid login: `401`
- missing resource: `404`
- invalid request body: `400`
- duplicate match: non-blocking warning in the response payload
- Prisma read/write failure: `500` with useful server-side logging

The client should surface actionable messages without trying to solve every UX edge case in this pass.

## 9. Verification Strategy

Verification must reflect the fact that this pass introduces real persistence:

### Backend

- auth test uses persisted users
- lead list/create/detail tests run against Prisma-backed paths
- duplicate warning behavior is verified against persisted leads
- task creation/list tests verify real DB operations
- import and capture tests verify they feed the same persisted lead creation flow

### Frontend

- data-driven render tests replace purely static assumptions where needed
- client tests verify fetched data is displayed in the current screens

### End-to-End

One local end-to-end path should prove:

1. login
2. lead list load
3. lead detail load
4. task creation
5. persisted state visible after refresh

### Local Database Verification

The implementation plan for this design must include Prisma commands and local verification against the user’s MySQL environment.

## 10. Boundaries and Risk Control

This is a larger pass than the original skeleton implementation. To keep it controlled:

- do not add unrelated features
- do not redesign the UI
- do not expand auth beyond what is needed for persisted login
- reuse the existing route and module boundaries unless they actively block persistence
- keep the lead creation workflow centralized so imports and capture do not drift from manual entry behavior

The result of this pass should be a genuine MySQL-backed CRM core for the currently implemented surfaces, not a broad rewrite.
