"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const newBoardFormSchema = z.object({
  boardName: z.string({ invalid_type_error: "Board Name is required" }).min(1).max(14),
});

export async function createBoard(formData: FormData) {
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => resolve(null), 4000);
  // });
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
