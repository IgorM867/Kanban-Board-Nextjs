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

const newTaskFormSchema = z
  .object({
    title: z.string({ invalid_type_error: "Task name is required" }).min(1).max(50),
    description: z.string().max(200).optional(),
    status: z.string(),
  })
  .required({ title: true, status: true });

export async function addTask(formData: FormData) {
  const rawSubtasks = [];

  for (const [key, value] of formData) {
    if (key.startsWith("subtask-")) {
      rawSubtasks.push(value);
    }
  }
  const parsedData = newTaskFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
  });
  const parsedSubtasks = z.array(z.string().min(1).max(50)).safeParse(rawSubtasks);
  if (!parsedData.success || !parsedSubtasks.success) {
    return { error: "Invalid data" };
  }
  const { title, description, status } = parsedData.data;
  const subtasks = parsedSubtasks.data;
  try {
    if (subtasks.length === 0) {
      await sql`INSERT INTO tasks (title,description,column_id) VALUES (${title},${description},${status})`;
    } else {
      const dataPlaceholdres = subtasks
        .map((_, i) => `($${4 + i},(SELECT id FROM task))`)
        .join(", ");
      console.log(dataPlaceholdres);
      await sql.query(
        `WITH task AS (INSERT INTO tasks (title,description,column_id) VALUES ($1,$2,$3) returning id)
        INSERT INTO subtasks (content,task_id) VALUES ${dataPlaceholdres};`,
        [title, description, status, ...subtasks]
      );
    }
  } catch (error) {
    console.log(error);
    return { error: "Could not insert task" };
  }
}
