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
