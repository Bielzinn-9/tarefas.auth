import { Router, Request, Response } from "express";

import * as UserModel from "../models/userModel";
import * as TarefaModel from "../models/tarefaModel";

import { requireAuth } from "../middlewares/requireAuth";
import { requireRole } from "../middlewares/requireRole";

import { Role } from "../enums/Role";

export const adminRoutes = Router();

adminRoutes.get(
  "/admin",
  requireAuth,
  requireRole(Role.ADMIN),
  async (req: Request, res: Response) => {
    const usuarios = await UserModel.listarTodos();
    const tarefas = await TarefaModel.listarTodas();

    res.render("admin", {
      usuarios,
      tarefas
    });
  }
);