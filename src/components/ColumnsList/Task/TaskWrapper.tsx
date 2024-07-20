"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TaskContextMenuContent } from "./TaskContextMenuContent";
import { TaskDialogContent } from "./TaskDialogContent";
import { deleteTask, duplicateTask } from "@/lib/actions";
import { Subtask, Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskWrapperProps = {
  children: React.ReactNode;
  task: Task;
  subtasks: Subtask[];
};

function TaskWrapper({ children, task, subtasks }: TaskWrapperProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { boardId } = useParams();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

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
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
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
      <TaskDialogContent boardId={boardId as string} task={task} subtasks={subtasks} />
    </Dialog>
  );
}

export { TaskWrapper };
