import { Router } from "express";
import { requireRole } from "../auth/auth.middleware";
import { parseLeadCsv } from "./imports.service";

export const importsRouter = Router();

importsRouter.post("/", requireRole(["ADMIN"]), (req, res) => {
  return res.json(parseLeadCsv(req.body.csv));
});
