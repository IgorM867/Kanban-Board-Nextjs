import { Board, Column, Subtask, Task } from "@/types";
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
