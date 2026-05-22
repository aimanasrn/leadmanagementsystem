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
