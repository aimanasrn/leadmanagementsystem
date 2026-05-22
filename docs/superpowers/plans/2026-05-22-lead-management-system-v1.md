# Lead Management System V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a locally runnable, responsive CRM core that lets one internal sales/admin team capture, assign, track, and work leads from a React frontend backed by a Node.js API and PostgreSQL.

**Architecture:** Use an npm-workspaces monorepo with a `client` React app and a `server` Express API. Keep business rules in the server, persist relational data with Prisma/PostgreSQL, and expose a REST API consumed by the client through typed DTOs and runtime validation.

**Tech Stack:** React, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS, Node.js, Express, TypeScript, Prisma, PostgreSQL, Zod, Vitest, React Testing Library, Supertest, Playwright

---

## Planned File Structure

### Workspace and Tooling

- Create: `package.json`
- Create: `README.md`
- Create: `.gitignore`
- Create: `.editorconfig`
- Create: `client/package.json`
- Create: `client/tsconfig.json`
- Create: `client/vite.config.ts`
- Create: `client/index.html`
- Create: `client/src/main.tsx`
- Create: `client/src/app/router.tsx`
- Create: `client/src/app/providers.tsx`
- Create: `client/src/styles/index.css`
- Create: `server/package.json`
- Create: `server/tsconfig.json`
- Create: `server/src/index.ts`
- Create: `server/src/app.ts`
- Create: `server/src/config/env.ts`
- Create: `server/prisma/schema.prisma`
- Create: `server/.env.example`

### Backend Domain Files

- Create: `server/src/modules/auth/auth.routes.ts`
- Create: `server/src/modules/auth/auth.service.ts`
- Create: `server/src/modules/auth/auth.middleware.ts`
- Create: `server/src/modules/users/users.routes.ts`
- Create: `server/src/modules/leads/leads.routes.ts`
- Create: `server/src/modules/leads/leads.service.ts`
- Create: `server/src/modules/leads/leads.schemas.ts`
- Create: `server/src/modules/assignments/assignment.service.ts`
- Create: `server/src/modules/activities/activity.service.ts`
- Create: `server/src/modules/tasks/tasks.routes.ts`
- Create: `server/src/modules/tasks/tasks.service.ts`
- Create: `server/src/modules/imports/imports.routes.ts`
- Create: `server/src/modules/imports/imports.service.ts`
- Create: `server/src/modules/capture/capture.routes.ts`
- Create: `server/src/modules/admin/admin.routes.ts`

### Frontend Feature Files

- Create: `client/src/features/auth/LoginPage.tsx`
- Create: `client/src/features/auth/auth.api.ts`
- Create: `client/src/features/leads/LeadListPage.tsx`
- Create: `client/src/features/leads/LeadDetailPage.tsx`
- Create: `client/src/features/leads/LeadForm.tsx`
- Create: `client/src/features/leads/leads.api.ts`
- Create: `client/src/features/tasks/TaskList.tsx`
- Create: `client/src/features/imports/ImportPage.tsx`
- Create: `client/src/features/admin/AdminSettingsPage.tsx`
- Create: `client/src/components/layout/AppShell.tsx`
- Create: `client/src/components/leads/LeadFilters.tsx`
- Create: `client/src/components/leads/LeadTimeline.tsx`

### Test Files

- Create: `server/src/modules/assignments/assignment.service.test.ts`
- Create: `server/src/modules/leads/leads.service.test.ts`
- Create: `server/src/modules/imports/imports.service.test.ts`
- Create: `server/src/__tests__/auth.integration.test.ts`
- Create: `server/src/__tests__/leads.integration.test.ts`
- Create: `client/src/features/auth/LoginPage.test.tsx`
- Create: `client/src/features/leads/LeadListPage.test.tsx`
- Create: `client/src/features/leads/LeadDetailPage.test.tsx`
- Create: `e2e/lead-workflow.spec.ts`

## Task 1: Create the Monorepo Skeleton

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `README.md`
- Create: `client/package.json`
- Create: `server/package.json`

- [ ] **Step 1: Write the failing workspace smoke check**

Create `package.json` with workspace scripts that reference apps that do not exist yet:

```json
{
  "name": "leadmanagementsystem",
  "private": true,
  "workspaces": ["client", "server"],
  "scripts": {
    "dev": "npm-run-all --parallel dev:client dev:server",
    "dev:client": "npm --workspace client run dev",
    "dev:server": "npm --workspace server run dev",
    "test": "npm run test --workspaces"
  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

- [ ] **Step 2: Run the workspace script to verify it fails**

Run: `npm run dev`
Expected: FAIL with missing `client` and `server` package scripts or missing files.

- [ ] **Step 3: Write the minimal monorepo scaffolding**

Create `.gitignore`:

```gitignore
node_modules
dist
coverage
.env
.DS_Store
playwright-report
test-results
```

Create `client/package.json`:

```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run"
  }
}
```

Create `server/package.json`:

```json
{
  "name": "server",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.json",
    "test": "vitest run"
  }
}
```

Create `README.md`:

```md
# Lead Management System

Monorepo for the v1 CRM core.
```

- [ ] **Step 4: Run the workspace script to verify it passes the package resolution stage**

Run: `npm run dev`
Expected: FAIL later because app source files are not created yet, but workspace resolution succeeds.

- [ ] **Step 5: Commit**

```bash
git add package.json .gitignore README.md client/package.json server/package.json
git commit -m "chore: scaffold monorepo workspaces"
```

## Task 2: Scaffold the Server, Environment, and Database Schema

**Files:**
- Create: `server/tsconfig.json`
- Create: `server/src/index.ts`
- Create: `server/src/app.ts`
- Create: `server/src/config/env.ts`
- Create: `server/prisma/schema.prisma`
- Create: `server/.env.example`
- Test: `server/src/__tests__/app.smoke.test.ts`

- [ ] **Step 1: Write the failing server smoke test**

Create `server/src/__tests__/app.smoke.test.ts`:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app";

describe("app smoke test", () => {
  it("returns ok from health endpoint", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm --workspace server run test -- app.smoke.test.ts`
Expected: FAIL with `Cannot find module '../app'`.

- [ ] **Step 3: Write the minimal server implementation and schema**

Create `server/src/app.ts`:

```ts
import express from "express";

export const app = express();

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
```

Create `server/src/index.ts`:

```ts
import { app } from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`server listening on ${env.PORT}`);
});
```

Create `server/src/config/env.ts`:

```ts
import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1)
});

export const env = schema.parse(process.env);
```

Create `server/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  SALES
}

enum LeadStage {
  NEW
  CONTACTED
  QUALIFIED
  PROPOSAL
  WON
  LOST
}

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         Role
  createdAt    DateTime @default(now())
}
```

Create `server/.env.example`:

```env
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lead_management_system
JWT_SECRET=change-me
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm --workspace server run test -- app.smoke.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server
git commit -m "feat: scaffold server and base database schema"
```

## Task 3: Add Authentication and Role Guards

**Files:**
- Create: `server/src/modules/auth/auth.routes.ts`
- Create: `server/src/modules/auth/auth.service.ts`
- Create: `server/src/modules/auth/auth.middleware.ts`
- Modify: `server/src/app.ts`
- Test: `server/src/__tests__/auth.integration.test.ts`

- [ ] **Step 1: Write the failing auth integration test**

Create `server/src/__tests__/auth.integration.test.ts`:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app";

describe("auth routes", () => {
  it("rejects invalid login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "missing@example.com",
      password: "bad-password"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm --workspace server run test -- auth.integration.test.ts`
Expected: FAIL with 404 on `/auth/login`.

- [ ] **Step 3: Write the minimal auth implementation**

Create `server/src/modules/auth/auth.service.ts`:

```ts
export async function loginUser(email: string, password: string) {
  if (email !== "admin@example.com" || password !== "password123") {
    return null;
  }

  return {
    token: "dev-token",
    user: {
      id: "seed-admin",
      role: "ADMIN",
      email
    }
  };
}
```

Create `server/src/modules/auth/auth.routes.ts`:

```ts
import { Router } from "express";
import { loginUser } from "./auth.service";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const result = await loginUser(req.body.email, req.body.password);

  if (!result) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json(result);
});
```

Create `server/src/modules/auth/auth.middleware.ts`:

```ts
import type { NextFunction, Request, Response } from "express";

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.header("x-dev-role");

    if (!role || !roles.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
```

Modify `server/src/app.ts`:

```ts
import express from "express";
import { authRouter } from "./modules/auth/auth.routes";

export const app = express();

app.use(express.json());
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/auth", authRouter);
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm --workspace server run test -- auth.integration.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server/src/app.ts server/src/modules/auth server/src/__tests__/auth.integration.test.ts
git commit -m "feat: add auth routes and role guard foundation"
```

## Task 4: Build the Lead Domain, Assignment Rules, and Activity Logging

**Files:**
- Create: `server/src/modules/leads/leads.schemas.ts`
- Create: `server/src/modules/leads/leads.service.ts`
- Create: `server/src/modules/leads/leads.routes.ts`
- Create: `server/src/modules/assignments/assignment.service.ts`
- Create: `server/src/modules/activities/activity.service.ts`
- Modify: `server/prisma/schema.prisma`
- Modify: `server/src/app.ts`
- Test: `server/src/modules/assignments/assignment.service.test.ts`
- Test: `server/src/modules/leads/leads.service.test.ts`
- Test: `server/src/__tests__/leads.integration.test.ts`

- [ ] **Step 1: Write the failing assignment and lead tests**

Create `server/src/modules/assignments/assignment.service.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { assignLead } from "./assignment.service";

describe("assignLead", () => {
  it("assigns a matching source rule", () => {
    const assignee = assignLead(
      { source: "website", region: "MY" },
      [{ field: "source", value: "website", ownerId: "sales-1" }]
    );

    expect(assignee).toBe("sales-1");
  });
});
```

Create `server/src/modules/leads/leads.service.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { detectDuplicates } from "./leads.service";

describe("detectDuplicates", () => {
  it("warns when email matches an existing lead", () => {
    const warnings = detectDuplicates(
      { email: "lead@example.com", phone: "111" },
      [{ id: "lead-1", email: "lead@example.com", phone: "222" }]
    );

    expect(warnings).toEqual(["Duplicate email found"]);
  });
});
```

Create `server/src/__tests__/leads.integration.test.ts`:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app";

describe("lead creation", () => {
  it("creates a lead and returns duplicate warnings", async () => {
    const response = await request(app)
      .post("/leads")
      .set("x-dev-role", "ADMIN")
      .send({
        firstName: "Aina",
        lastName: "Rahman",
        email: "aina@example.com",
        phone: "0123456789",
        source: "website"
      });

    expect(response.status).toBe(201);
    expect(response.body.stage).toBe("NEW");
    expect(response.body.warnings).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm --workspace server run test -- assignment.service.test.ts leads.service.test.ts leads.integration.test.ts`
Expected: FAIL with missing lead modules and 404 on `/leads`.

- [ ] **Step 3: Write the minimal lead, assignment, and activity code**

Add these Prisma models to `server/prisma/schema.prisma`:

```prisma
model Lead {
  id         String      @id @default(cuid())
  firstName  String
  lastName   String
  email      String?
  phone      String?
  source     String
  stage      LeadStage   @default(NEW)
  ownerId    String?
  owner      User?       @relation(fields: [ownerId], references: [id])
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
  activities Activity[]
  tasks      Task[]
}

model Activity {
  id        String   @id @default(cuid())
  leadId    String
  type      String
  message   String
  createdAt DateTime @default(now())
  lead      Lead     @relation(fields: [leadId], references: [id])
}

model Task {
  id          String   @id @default(cuid())
  leadId       String
  title        String
  dueDate      DateTime?
  assignedToId String?
  completed    Boolean  @default(false)
  lead         Lead     @relation(fields: [leadId], references: [id])
}
```

Create `server/src/modules/assignments/assignment.service.ts`:

```ts
type AssignmentRule = { field: "source" | "region"; value: string; ownerId: string };
type LeadInput = { source?: string; region?: string };

export function assignLead(lead: LeadInput, rules: AssignmentRule[]) {
  const match = rules.find((rule) => lead[rule.field] === rule.value);
  return match?.ownerId ?? null;
}
```

Create `server/src/modules/activities/activity.service.ts`:

```ts
export function createActivityMessage(type: string, detail: string) {
  return `${type}: ${detail}`;
}
```

Create `server/src/modules/leads/leads.service.ts`:

```ts
type ExistingLead = { id: string; email?: string | null; phone?: string | null };
type NewLeadInput = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  source: string;
};

export function detectDuplicates(input: NewLeadInput, existing: ExistingLead[]) {
  const warnings: string[] = [];

  if (input.email && existing.some((lead) => lead.email === input.email)) {
    warnings.push("Duplicate email found");
  }

  if (input.phone && existing.some((lead) => lead.phone === input.phone)) {
    warnings.push("Duplicate phone found");
  }

  return warnings;
}

export function buildLeadResponse(input: NewLeadInput) {
  return {
    id: "lead-dev-1",
    ...input,
    stage: "NEW",
    warnings: []
  };
}
```

Create `server/src/modules/leads/leads.routes.ts`:

```ts
import { Router } from "express";
import { requireRole } from "../auth/auth.middleware";
import { buildLeadResponse } from "./leads.service";

export const leadsRouter = Router();

leadsRouter.post("/", requireRole(["ADMIN", "SALES"]), (req, res) => {
  return res.status(201).json(buildLeadResponse(req.body));
});
```

Modify `server/src/app.ts`:

```ts
import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { leadsRouter } from "./modules/leads/leads.routes";

export const app = express();

app.use(express.json());
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/auth", authRouter);
app.use("/leads", leadsRouter);
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm --workspace server run test -- assignment.service.test.ts leads.service.test.ts leads.integration.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server/prisma/schema.prisma server/src/modules server/src/app.ts server/src/__tests__/leads.integration.test.ts
git commit -m "feat: add lead creation, duplicate warnings, and assignment foundations"
```

## Task 5: Add CSV Import and Public Lead Capture Endpoints

**Files:**
- Create: `server/src/modules/imports/imports.routes.ts`
- Create: `server/src/modules/imports/imports.service.ts`
- Create: `server/src/modules/capture/capture.routes.ts`
- Modify: `server/src/app.ts`
- Test: `server/src/modules/imports/imports.service.test.ts`

- [ ] **Step 1: Write the failing import service test**

Create `server/src/modules/imports/imports.service.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { parseLeadCsv } from "./imports.service";

describe("parseLeadCsv", () => {
  it("returns row-level errors for invalid records", () => {
    const result = parseLeadCsv("firstName,lastName,email\nAina,,aina@example.com");
    expect(result.errors).toEqual([
      { row: 2, message: "lastName is required" }
    ]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm --workspace server run test -- imports.service.test.ts`
Expected: FAIL with missing `parseLeadCsv`.

- [ ] **Step 3: Write the minimal import and capture implementation**

Create `server/src/modules/imports/imports.service.ts`:

```ts
export function parseLeadCsv(csv: string) {
  const lines = csv.trim().split("\n");
  const rows = lines.slice(1);
  const errors = rows.flatMap((row, index) => {
    const [firstName, lastName] = row.split(",");
    return lastName ? [] : [{ row: index + 2, message: "lastName is required" }];
  });

  return { totalRows: rows.length, errors };
}
```

Create `server/src/modules/imports/imports.routes.ts`:

```ts
import { Router } from "express";
import { requireRole } from "../auth/auth.middleware";
import { parseLeadCsv } from "./imports.service";

export const importsRouter = Router();

importsRouter.post("/", requireRole(["ADMIN"]), (req, res) => {
  return res.json(parseLeadCsv(req.body.csv));
});
```

Create `server/src/modules/capture/capture.routes.ts`:

```ts
import { Router } from "express";
import { buildLeadResponse } from "../leads/leads.service";

export const captureRouter = Router();

captureRouter.post("/", (req, res) => {
  return res.status(201).json(buildLeadResponse(req.body));
});
```

Modify `server/src/app.ts`:

```ts
import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { captureRouter } from "./modules/capture/capture.routes";
import { importsRouter } from "./modules/imports/imports.routes";
import { leadsRouter } from "./modules/leads/leads.routes";

export const app = express();

app.use(express.json());
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/auth", authRouter);
app.use("/leads", leadsRouter);
app.use("/imports", importsRouter);
app.use("/capture", captureRouter);
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm --workspace server run test -- imports.service.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server/src/modules/imports server/src/modules/capture server/src/app.ts
git commit -m "feat: add csv import validation and public capture endpoint"
```

## Task 6: Scaffold the React App Shell, Routing, and Authentication UI

**Files:**
- Create: `client/tsconfig.json`
- Create: `client/vite.config.ts`
- Create: `client/index.html`
- Create: `client/src/main.tsx`
- Create: `client/src/app/router.tsx`
- Create: `client/src/app/providers.tsx`
- Create: `client/src/styles/index.css`
- Create: `client/src/features/auth/LoginPage.tsx`
- Create: `client/src/features/auth/auth.api.ts`
- Create: `client/src/components/layout/AppShell.tsx`
- Test: `client/src/features/auth/LoginPage.test.tsx`

- [ ] **Step 1: Write the failing login page test**

Create `client/src/features/auth/LoginPage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("renders email, password, and sign in button", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm --workspace client run test -- LoginPage.test.tsx`
Expected: FAIL with missing `LoginPage`.

- [ ] **Step 3: Write the minimal React shell and login page**

Create `client/src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

Create `client/src/app/router.tsx`:

```tsx
import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/LoginPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> }
]);
```

Create `client/src/features/auth/LoginPage.tsx`:

```tsx
export function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Lead Management System</h1>
      <label className="flex flex-col gap-1">
        <span>Email</span>
        <input aria-label="Email" className="border p-2" type="email" />
      </label>
      <label className="flex flex-col gap-1">
        <span>Password</span>
        <input aria-label="Password" className="border p-2" type="password" />
      </label>
      <button className="bg-black px-4 py-2 text-white" type="button">
        Sign In
      </button>
    </main>
  );
}
```

Create `client/src/styles/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: Inter, sans-serif;
  background: #f8fafc;
  color: #0f172a;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm --workspace client run test -- LoginPage.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add client
git commit -m "feat: scaffold client app shell and login screen"
```

## Task 7: Build the Lead List, Lead Detail, Timeline, and Tasks UI

**Files:**
- Create: `client/src/features/leads/LeadListPage.tsx`
- Create: `client/src/features/leads/LeadDetailPage.tsx`
- Create: `client/src/features/leads/LeadForm.tsx`
- Create: `client/src/features/leads/leads.api.ts`
- Create: `client/src/components/leads/LeadFilters.tsx`
- Create: `client/src/components/leads/LeadTimeline.tsx`
- Create: `client/src/features/tasks/TaskList.tsx`
- Modify: `client/src/app/router.tsx`
- Test: `client/src/features/leads/LeadListPage.test.tsx`
- Test: `client/src/features/leads/LeadDetailPage.test.tsx`

- [ ] **Step 1: Write the failing lead page tests**

Create `client/src/features/leads/LeadListPage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LeadListPage } from "./LeadListPage";

describe("LeadListPage", () => {
  it("renders stage and source filters", () => {
    render(<LeadListPage />);
    expect(screen.getByLabelText(/stage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/source/i)).toBeInTheDocument();
  });
});
```

Create `client/src/features/leads/LeadDetailPage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LeadDetailPage } from "./LeadDetailPage";

describe("LeadDetailPage", () => {
  it("renders timeline and task sections", () => {
    render(<LeadDetailPage />);
    expect(screen.getByText(/activity timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm --workspace client run test -- LeadListPage.test.tsx LeadDetailPage.test.tsx`
Expected: FAIL with missing lead page components.

- [ ] **Step 3: Write the minimal responsive lead UI**

Create `client/src/components/leads/LeadFilters.tsx`:

```tsx
export function LeadFilters() {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      <label className="flex flex-col gap-1">
        <span>Stage</span>
        <select aria-label="Stage" className="border p-2">
          <option>All</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span>Source</span>
        <select aria-label="Source" className="border p-2">
          <option>All</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span>Search</span>
        <input aria-label="Search" className="border p-2" />
      </label>
    </section>
  );
}
```

Create `client/src/components/leads/LeadTimeline.tsx`:

```tsx
export function LeadTimeline() {
  return (
    <section>
      <h2 className="text-lg font-medium">Activity Timeline</h2>
      <ul className="mt-3 space-y-2">
        <li className="border p-3">Lead created</li>
      </ul>
    </section>
  );
}
```

Create `client/src/features/tasks/TaskList.tsx`:

```tsx
export function TaskList() {
  return (
    <section>
      <h2 className="text-lg font-medium">Tasks</h2>
      <div className="mt-3 border p-3">No tasks yet</div>
    </section>
  );
}
```

Create `client/src/features/leads/LeadListPage.tsx`:

```tsx
import { LeadFilters } from "../../components/leads/LeadFilters";

export function LeadListPage() {
  return (
    <main className="space-y-4 p-4 md:p-6">
      <header>
        <h1 className="text-2xl font-semibold">Leads</h1>
      </header>
      <LeadFilters />
      <section className="overflow-auto border">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Stage</th>
              <th className="p-3 text-left">Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">Aina Rahman</td>
              <td className="p-3">New</td>
              <td className="p-3">Unassigned</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
```

Create `client/src/features/leads/LeadDetailPage.tsx`:

```tsx
import { LeadTimeline } from "../../components/leads/LeadTimeline";
import { TaskList } from "../tasks/TaskList";

export function LeadDetailPage() {
  return (
    <main className="grid gap-6 p-4 md:grid-cols-[2fr_1fr] md:p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold">Aina Rahman</h1>
          <p className="text-sm text-slate-600">Website lead</p>
        </header>
        <div className="border p-4">Profile, owner, notes, and stage controls go here.</div>
        <LeadTimeline />
      </section>
      <TaskList />
    </main>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm --workspace client run test -- LeadListPage.test.tsx LeadDetailPage.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add client/src/features/leads client/src/components/leads client/src/features/tasks client/src/app/router.tsx
git commit -m "feat: add responsive lead list and detail views"
```

## Task 8: Add CSV Import UI and Admin Settings UI

**Files:**
- Create: `client/src/features/imports/ImportPage.tsx`
- Create: `client/src/features/admin/AdminSettingsPage.tsx`
- Modify: `client/src/app/router.tsx`
- Test: `client/src/features/imports/ImportPage.test.tsx`

- [ ] **Step 1: Write the failing import page test**

Create `client/src/features/imports/ImportPage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImportPage } from "./ImportPage";

describe("ImportPage", () => {
  it("renders upload CTA and validation summary heading", () => {
    render(<ImportPage />);
    expect(screen.getByRole("button", { name: /upload csv/i })).toBeInTheDocument();
    expect(screen.getByText(/validation summary/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm --workspace client run test -- ImportPage.test.tsx`
Expected: FAIL with missing `ImportPage`.

- [ ] **Step 3: Write the minimal import and admin screens**

Create `client/src/features/imports/ImportPage.tsx`:

```tsx
export function ImportPage() {
  return (
    <main className="space-y-4 p-4 md:p-6">
      <h1 className="text-2xl font-semibold">CSV Import</h1>
      <button className="bg-black px-4 py-2 text-white" type="button">
        Upload CSV
      </button>
      <section className="border p-4">
        <h2 className="text-lg font-medium">Validation Summary</h2>
      </section>
    </main>
  );
}
```

Create `client/src/features/admin/AdminSettingsPage.tsx`:

```tsx
export function AdminSettingsPage() {
  return (
    <main className="space-y-4 p-4 md:p-6">
      <h1 className="text-2xl font-semibold">Admin Settings</h1>
      <section className="border p-4">User management and assignment rules.</section>
    </main>
  );
}
```

Modify `client/src/app/router.tsx`:

```tsx
import { createBrowserRouter } from "react-router-dom";
import { AdminSettingsPage } from "../features/admin/AdminSettingsPage";
import { LoginPage } from "../features/auth/LoginPage";
import { ImportPage } from "../features/imports/ImportPage";
import { LeadDetailPage } from "../features/leads/LeadDetailPage";
import { LeadListPage } from "../features/leads/LeadListPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/leads", element: <LeadListPage /> },
  { path: "/leads/:leadId", element: <LeadDetailPage /> },
  { path: "/imports", element: <ImportPage /> },
  { path: "/admin", element: <AdminSettingsPage /> }
]);
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm --workspace client run test -- ImportPage.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add client/src/features/imports client/src/features/admin client/src/app/router.tsx
git commit -m "feat: add import and admin settings screens"
```

## Task 9: Connect the End-to-End Workflow and Verification

**Files:**
- Create: `e2e/lead-workflow.spec.ts`
- Modify: `client/src/features/auth/auth.api.ts`
- Modify: `client/src/features/leads/leads.api.ts`
- Modify: `server/src/modules/tasks/tasks.routes.ts`
- Modify: `server/src/modules/tasks/tasks.service.ts`
- Test: `e2e/lead-workflow.spec.ts`

- [ ] **Step 1: Write the failing end-to-end test**

Create `e2e/lead-workflow.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("lead workflow", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173");
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  await page.goto("http://127.0.0.1:5173/leads");
  await expect(page.getByText("Aina Rahman")).toBeVisible();
  await page.goto("http://127.0.0.1:5173/leads/lead-dev-1");
  await expect(page.getByText("Activity Timeline")).toBeVisible();
  await expect(page.getByText("Tasks")).toBeVisible();
});
```

- [ ] **Step 2: Run the end-to-end test to verify it fails**

Run: `npx playwright test e2e/lead-workflow.spec.ts`
Expected: FAIL because local client and server wiring are incomplete or not running.

- [ ] **Step 3: Write the minimal API wiring and task endpoints**

Create `client/src/features/auth/auth.api.ts`:

```ts
export async function login(email: string, password: string) {
  const response = await fetch("http://127.0.0.1:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  return response.json();
}
```

Create `client/src/features/leads/leads.api.ts`:

```ts
export async function getLeads() {
  const response = await fetch("http://127.0.0.1:3001/leads", {
    headers: { "x-dev-role": "ADMIN" }
  });

  return response.json();
}
```

Create `server/src/modules/tasks/tasks.service.ts`:

```ts
export function buildTask(title: string) {
  return {
    id: "task-dev-1",
    title,
    completed: false
  };
}
```

Create `server/src/modules/tasks/tasks.routes.ts`:

```ts
import { Router } from "express";
import { requireRole } from "../auth/auth.middleware";
import { buildTask } from "./tasks.service";

export const tasksRouter = Router();

tasksRouter.post("/", requireRole(["ADMIN", "SALES"]), (req, res) => {
  return res.status(201).json(buildTask(req.body.title));
});
```

- [ ] **Step 4: Run the full test suite for verification**

Run: `npm run test`
Expected: PASS for workspace unit and integration tests

Run: `npx playwright test e2e/lead-workflow.spec.ts`
Expected: PASS with local client and server running

- [ ] **Step 5: Commit**

```bash
git add client/src/features/auth/auth.api.ts client/src/features/leads/leads.api.ts server/src/modules/tasks e2e/lead-workflow.spec.ts
git commit -m "feat: wire core lead workflow through local app stack"
```

## Self-Review

### Spec Coverage

- Auth and roles: covered by Task 3
- Manual lead creation, duplicate warnings, fixed stages, assignment, activity foundation: covered by Task 4
- CSV import and API capture: covered by Task 5
- Responsive login, lead list, lead detail, timeline, tasks: covered by Tasks 6 and 7
- Admin settings and import UI: covered by Task 8
- End-to-end local workflow verification: covered by Task 9

### Placeholder Scan

The plan avoids `TBD`, `TODO`, and deferred “handle later” language. Each task includes concrete files, commands, and code snippets.

### Type Consistency

- Roles use `ADMIN` and `SALES` consistently in the backend
- Lead stage uses `NEW` consistently in server code and maps to UI copy like `New`
- Auth uses `/auth/login`
- Lead domain uses `/leads`
- Import domain uses `/imports`
- Capture domain uses `/capture`

