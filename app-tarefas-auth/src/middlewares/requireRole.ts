import { Request, Response, NextFunction } from "express";
import { Role } from "../enums/Role";

export function requireRole(role: Role) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.session.userRole !== role) {
      req.session.flash = "Acesso negado";
      return res.redirect("/tarefas");
    }

    next();
  };
}