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
