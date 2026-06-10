import { Request, Response, NextFunction } from "express";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    req.session.flash = "Faça login";

    return res.redirect("/login");
  }

  next();
}