import { Router } from "express";
import { requireRole } from "../auth/auth.middleware";
import { createLeadSchema } from "./leads.schemas";
import { buildLeadResponse } from "./leads.service";

export const leadsRouter = Router();

leadsRouter.post("/", requireRole(["ADMIN", "SALES"]), (req, res) => {
  const payload = createLeadSchema.parse(req.body);
  return res.status(201).json(buildLeadResponse(payload));
});
