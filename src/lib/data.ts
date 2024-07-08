import { Board } from "@/types";
import { sql } from "@vercel/postgres";

export async function getBoards() {
  try {
    const result = await sql<Board>`SELECT * FROM boards ORDER BY board_order;`;
    return result.rows;
  } catch (error) {
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
  } catch (error) {
    return null;
  }
}
