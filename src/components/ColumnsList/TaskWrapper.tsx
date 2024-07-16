"use client";
import { ReactNode, useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { useParams } from "next/navigation";
import { deleteTask, duplicateTask } from "@/lib/actions";
import { TaskContextMenuContent } from "./TaskContextMenuContent";
import { TaskDialogContent } from "./TaskDialogContent";
import { Column, Subtask, Task } from "@/types";

type TaskWrapperProps = {
  children: ReactNode;
  task: Task;
  columns: Column[];
  subtasks: Subtask[];
};

function TaskWrapper({ children, task, subtasks, columns }: TaskWrapperProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { boardId } = useParams();

  const handleTaskDelete = async () => {
    setIsDeleting(true);
    const result = await deleteTask(task.id, boardId as string);
    setIsDeleting(false);
    return result;
  };
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <DialogTrigger asChild>
            {
              <li
                className={`bg-primary-color px-4 py-2 rounded-lg mt-6 font-medium cursor-pointer hover:brightness-125 ${
                  isDeleting ? "bg-opacity-30 text-font-secondary-color" : ""
                }`}
              >
                {children}
              </li>
            }
          </DialogTrigger>
        </ContextMenuTrigger>
        <TaskContextMenuContent
          onDelete={handleTaskDelete}
          onDuplicate={() => duplicateTask(task.id)}
        />
      </ContextMenu>
      <TaskDialogContent
        boardId={boardId as string}
        task={task}
        columns={columns}
        subtasks={subtasks}
      />
    </Dialog>
  );
}

export { TaskWrapper };
