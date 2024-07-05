"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const newBoardFormSchema = z.object({
  boardName: z.string({ invalid_type_error: "Board Name is required" }).min(1).max(14),
});

//function to simulate network delay
async function wait(delay: number) {
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), delay);
  });
}

export async function createBoard(formData: FormData) {
  const validatedFields = newBoardFormSchema.safeParse({ boardName: formData.get("boardName") });

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }
  const { boardName } = validatedFields.data;
  let result;
  try {
    result = await sql`INSERT INTO boards (name) VALUES (${boardName}) returning id`;
  } catch (error) {
    return { error: "Cannot insert board" };
  }

  revalidatePath("/", "layout");
  redirect(`/${result?.rows[0]?.id}`);
}
export async function deleteBoard(boardId: string) {
  try {
    await sql`DELETE FROM boards WHERE id = ${boardId};`;
  } catch (error) {
    return { error: "Cannot delete board" };
  }
  revalidatePath("/", "layout");
}
export async function renameBoard(boardId: string, boardName: string) {
  if (!boardName.trim()) {
    return { error: "Board name cannot be empty" };
  }
  try {
    await sql`UPDATE boards SET name = ${boardName} WHERE id = ${boardId};`;
  } catch (error) {
    return { error: "Cannot rename board" };
  }
  revalidatePath("/", "layout");
}
