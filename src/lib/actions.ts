"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { consoleError } from "./utils";
import { getSubtasks, getTaskById } from "./data";

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
    consoleError("createBoard", validatedFields.error.message);
    return { error: "Invalid data" };
  }
  const { boardName } = validatedFields.data;
  let result;
  try {
    result = await sql`INSERT INTO boards (name) VALUES (${boardName}) returning id`;
  } catch (error: any) {
    consoleError("createBoard", error.message);
    return { error: "Cannot insert board" };
  }

  revalidatePath("/", "layout");
  redirect(`/${result?.rows[0]?.id}`);
}
export async function deleteBoard(boardId: string) {
  try {
    await sql`DELETE FROM boards WHERE id = ${boardId};`;
  } catch (error: any) {
    consoleError("deleteBoard", error.message);
    return { error: "Cannot delete board" };
  }
  revalidatePath("/", "layout");
  redirect(`/`);
}
export async function renameBoard(boardId: string, boardName: string) {
  if (!boardName.trim()) {
    consoleError("renameBoard", "Board name is empty");
    return { error: "Board name cannot be empty" };
  }
  try {
    await sql`UPDATE boards SET name = ${boardName} WHERE id = ${boardId};`;
  } catch (error: any) {
    consoleError("renameBoard", error.message);
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

type FormState = { message: string; success: boolean };
export async function addTask(prevState: FormState, formData: FormData) {
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

  if (!parsedData.success) {
    consoleError("addTask", parsedData.error.message);
    return { message: "Invalid submission data for task ", success: false };
  }
  if (!parsedSubtasks.success) {
    consoleError("addTask", parsedSubtasks.error.message);
    return { message: "Invalid submission data for task ", success: false };
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

      await sql.query(
        `WITH task AS (INSERT INTO tasks (title,description,column_id) VALUES ($1,$2,$3) returning id)
        INSERT INTO subtasks (content,task_id) VALUES ${dataPlaceholdres};`,
        [title, description, status, ...subtasks]
      );
    }
  } catch (error: any) {
    consoleError("addTask", error.message);
    return { message: "Could not insert task", success: false };
  }
  revalidatePath("/", "page");
  return { message: "", success: true };
}

export async function deleteTask(taskId: string, boardId: string) {
  try {
    await sql`DELETE FROM tasks WHERE id = ${taskId};`;
  } catch (error: any) {
    consoleError("deleteTask", error.message);
    return { error: "Could not delete task" };
  }
  revalidatePath(`/${boardId}`, "page");
}

export async function addColumn(
  boardId: string,
  prewState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsedData = z
    .string({ invalid_type_error: "Column name must be a string" })
    .min(1, "Column name must contain at least one character")
    .max(20, "Column name can't exceed 3 characters")
    .safeParse(formData.get("column_name"));

  if (!parsedData.success) {
    consoleError("addColumn", parsedData.error.message);
    return { message: parsedData.error.flatten().formErrors[0], success: false };
  }

  try {
    await sql`INSERT INTO columns (name, board_id) VALUES (${parsedData.data}, ${boardId})`;
  } catch (error: any) {
    consoleError("addColumn", error.message);
    return { message: "Cannot add Column", success: false };
  }
  revalidatePath(`/${boardId}`, "page");
  return { message: "", success: true };
}
export async function duplicateTask(taskId: string) {
  try {
    const task = await getTaskById(taskId);
    if (!task) {
      consoleError("duplicateTask", "Task to duplicate not found");
      return { error: "Task not found" };
    }

    const subtasks = await getSubtasks(task.id);
    const subtasksContent = subtasks.map((subtask) => subtask.content);
    const { title, description, column_id } = task;
    if (subtasks.length === 0) {
      await sql`INSERT INTO tasks (title,description,column_id) VALUES (${title},${description},${column_id})`;
    } else {
      const dataPlaceholdres = subtasks
        .map((_, i) => `($${4 + i},(SELECT id FROM task))`)
        .join(", ");

      await sql.query(
        `WITH task AS (INSERT INTO tasks (title,description,column_id) VALUES ($1,$2,$3) returning id)
        INSERT INTO subtasks (content,task_id) VALUES ${dataPlaceholdres};`,
        [title, description, column_id, ...subtasksContent]
      );
    }
  } catch (error: any) {
    consoleError("duplicateTask", error.message);
    return { error: "Could not duplicate task" };
  }
  revalidatePath("/", "page");
}
export async function changeColumnColor(column_id: string, color: string) {
  try {
    await sql`UPDATE columns SET color = ${color} WHERE id = ${column_id};`;
  } catch (error: any) {
    consoleError("changeColumnColor", error.message);
    return { error: "Could not change color" };
  }
}
export async function changeColumn(taskId: string, newColumnId: string, boardId: string) {
  try {
    await sql`UPDATE tasks SET column_id = ${newColumnId} WHERE id = ${taskId};`;
  } catch (error: any) {
    consoleError("changeColumn", error.message);
    return { error: "Could not change column" };
  }
  revalidatePath(`/${boardId}`, "page");
}
export async function changeSubtaskDoneStatus(subtaskId: string, status: boolean, boardId: string) {
  try {
    await sql`UPDATE subtasks SET done = ${status} WHERE id = ${subtaskId};`;
  } catch (error: any) {
    consoleError("changeSubtaskDoneStatus", error.message);
    return { error: "Could not change subtask status" };
  }
  revalidatePath(`/${boardId}`, "page");
}
export async function updateColumnsOrder(newOrder: string[]) {
  const idsPlaceholders = newOrder.map((_, i) => `($${i + 1})`);
  try {
    await sql.query(
      `WITH id_mapping AS (
     SELECT id, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) - 1 AS new_value
     FROM (VALUES ${idsPlaceholders}) AS id_list(id)
    )
    UPDATE columns
    SET column_order = id_mapping.new_value
    FROM id_mapping
    WHERE columns.id::text = id_mapping.id;`,
      newOrder
    );
  } catch (error: any) {
    consoleError("updateColumnsOrder", error.message);
    return { error: "Could not update columns order" };
  }
}
