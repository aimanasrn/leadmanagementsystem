import { Router } from "express";
import { requireRole } from "../auth/auth.middleware";
import { buildTask } from "./tasks.service";

export const tasksRouter = Router();

tasksRouter.post("/", requireRole(["ADMIN", "SALES"]), (req, res) => {
  return res.status(201).json(buildTask(req.body.title));
});
