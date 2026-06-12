import { readFile, writeFile } from "fs/promises";

export interface Tarefa {
  id: number;
  userId: number;
  texto: string;
  concluida: boolean;
  criadaEm: string;
}

const ARQUIVO = "dados/tarefas.json";

async function carregar(): Promise<Tarefa[]> {
  try {
    const dados = await readFile(ARQUIVO, "utf-8");

    return JSON.parse(dados);
  } catch {
    return [];
  }
}

async function salvar(tarefas: Tarefa[]): Promise<void> {
  await writeFile(
    ARQUIVO,
    JSON.stringify(tarefas, null, 2)
  );
}

export async function listarPorUsuario(
  userId: number
): Promise<Tarefa[]> {
  const tarefas = await carregar();

  return tarefas.filter((t) => t.userId === userId);
}

export async function adicionar(
  userId: number,
  texto: string
): Promise<Tarefa> {
  const tarefas = await carregar();

  const nova: Tarefa = {
    id: (tarefas[tarefas.length - 1]?.id ?? 0) + 1,
    userId,
    texto: texto.trim(),
    concluida: false,
    criadaEm: new Date().toLocaleDateString("pt-BR")
  };

  tarefas.push(nova);

  await salvar(tarefas);

  return nova;
}

export async function toggleConcluida(
  id: number
): Promise<void> {
  const tarefas = await carregar();

  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return;
  }

  tarefa.concluida = !tarefa.concluida;

  await salvar(tarefas);
}

export async function remover(
  id: number
): Promise<void> {
  const tarefas = await carregar();

  const filtradas = tarefas.filter(
    (t) => t.id !== id
  );

  await salvar(filtradas);
}

export async function listarTodas(): Promise<Tarefa[]> {
  return await carregar();
}