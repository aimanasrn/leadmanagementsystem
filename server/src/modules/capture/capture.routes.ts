import { Router } from "express";
import { buildLeadResponse } from "../leads/leads.service";

export const captureRouter = Router();

captureRouter.post("/", (req, res) => {
  return res.status(201).json(buildLeadResponse(req.body));
});
