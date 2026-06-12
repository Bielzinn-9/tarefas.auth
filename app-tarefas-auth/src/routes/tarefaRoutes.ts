import { Router, Request, Response } from "express";
import * as TarefaModel from "../models/tarefaModel";
import { requireAuth } from "../middlewares/requireAuth";

export const tarefaRoutes = Router();

tarefaRoutes.get(
  "/tarefas",
  requireAuth,
  async (req: Request, res: Response) => {
    const tarefas =
      await TarefaModel.listarPorUsuario(
        req.session.userId!
      );

    const flash = req.session.flash || null;

    req.session.flash = null;

    res.render("tarefas", {
      nome: req.session.userName,
      tarefas,
      flash
    });
  }
);

tarefaRoutes.post(
  "/tarefas",
  requireAuth,
  async (req: Request, res: Response) => {
    const { texto } = req.body;

    if (!texto?.trim()) {
      req.session.flash =
        "Digite uma tarefa válida";

      return res.redirect("/tarefas");
    }

    await TarefaModel.adicionar(
      req.session.userId!,
      texto
    );

    req.session.flash =
      "Tarefa adicionada!";

    res.redirect("/tarefas");
  }
);

tarefaRoutes.post(
  "/tarefas/:id/concluir",
  requireAuth,
  async (req: Request, res: Response) => {
    await TarefaModel.toggleConcluida(
      Number(req.params.id)
    );

    res.redirect("/tarefas");
  }
);

tarefaRoutes.post(
  "/tarefas/:id/remover",
  requireAuth,
  async (req: Request, res: Response) => {
    await TarefaModel.remover(
      Number(req.params.id)
    );

    req.session.flash =
      "Tarefa removida!";

    res.redirect("/tarefas");
  }
);