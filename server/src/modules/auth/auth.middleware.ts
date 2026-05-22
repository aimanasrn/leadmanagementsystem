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
