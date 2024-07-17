import "server-only";
import { Board, Column, ColumnWithTasks, Subtask, Task, TaskWithSubtasks } from "@/types";
import { sql } from "@vercel/postgres";
import { consoleError } from "./utils";

export async function getBoards() {
  try {
    const result = await sql<Board>`SELECT * FROM boards ORDER BY board_order;`;
    return result.rows;
  } catch (error: any) {
    consoleError("getBoards", error.message);
    throw new Error("Failed to fetch boards.");
  }
}
export async function getBoardById(boardId: string) {
  try {
    const result = await sql<Board>`SELECT * FROM boards WHERE id = ${boardId};`;
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error: any) {
    consoleError("getBoardById", error.message);
    return null;
  }
}
export async function getBoardByTask(taskId: string) {
  try {
    const result = await sql<Board>`
    SELECT boards.id, boards.name,boards.board_order FROM boards
      JOIN columns on columns.board_id = boards.id
      JOIN tasks on tasks.column_id = columns.id WHERE tasks.id = ${taskId};`;
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error: any) {
    consoleError("getBoardByTask", error.message);
    return null;
  }
}
export async function getBoardColumns(boardId: string) {
  try {
    const result =
      await sql<Column>`SELECT * FROM columns WHERE board_id = ${boardId} ORDER BY column_order;`;
    return result.rows;
  } catch (error: any) {
    consoleError("getBoardColumns", error.message);
    return [];
  }
}
export async function getTasks(columId: string) {
  try {
    const result =
      await sql<Task>`SELECT * FROM tasks WHERE column_id = ${columId} ORDER BY task_order;`;
    return result.rows;
  } catch (error: any) {
    consoleError("getTasks", error.message);
    return [];
  }
}
export async function getTaskById(taskId: string) {
  try {
    const result = await sql<Task>`SELECT * FROM tasks WHERE id = ${taskId};`;
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error: any) {
    consoleError("getTaskById", error.message);
    return null;
  }
}
export async function getSubtasks(taskId: string) {
  try {
    const result =
      await sql<Subtask>`SELECT * FROM subtasks WHERE task_id = ${taskId} ORDER BY subtask_order;`;
    return result.rows;
  } catch (error: any) {
    consoleError("getSubtasks", error.message);
    return [];
  }
}
export async function getTasksWithSubtasks(columnId: string): Promise<TaskWithSubtasks[]> {
  const tasks = await getTasks(columnId);
  if (tasks.length === 0) return [];

  const subtasks = await Promise.all(tasks.map((task) => getSubtasks(task.id)));
  return tasks.map((task, i) => ({ ...task, subtasks: subtasks[i] }));
}

export async function getColumnsWithTasks(boardId: string): Promise<ColumnWithTasks[]> {
  const columns = await getBoardColumns(boardId);
  if (columns.length === 0) return [];

  const tasks = await Promise.all(columns.map((column) => getTasksWithSubtasks(column.id)));
  return columns.map((column, i) => {
    return { ...column, tasks: tasks[i] };
  });
}
