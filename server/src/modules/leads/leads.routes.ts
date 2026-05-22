import { Router } from "express";
import { requireRole } from "../auth/auth.middleware";
import { createLeadSchema } from "./leads.schemas";
import { buildLeadResponse } from "./leads.service";

export const leadsRouter = Router();

leadsRouter.get("/", requireRole(["ADMIN", "SALES"]), (_req, res) => {
  return res.json([
    {
      id: "lead-dev-1",
      firstName: "Aina",
      lastName: "Rahman",
      source: "website",
      stage: "NEW",
      ownerId: null
    }
  ]);
});

leadsRouter.post("/", requireRole(["ADMIN", "SALES"]), (req, res) => {
  const payload = createLeadSchema.parse(req.body);
  return res.status(201).json(buildLeadResponse(payload));
});
