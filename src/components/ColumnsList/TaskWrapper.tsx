"use client";
import { deleteTask, duplicateTask } from "@/lib/actions";
import { TaskContextMenu } from "./TaskContextMenu";
import { useParams } from "next/navigation";
import { ReactNode, useState } from "react";

type TaskWrapperProps = {
  children: ReactNode;
  taskId: string;
};

function TaskWrapper({ children, taskId }: TaskWrapperProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { boardId } = useParams();

  const handleTaskDelete = async () => {
    setIsDeleting(true);
    const result = await deleteTask(taskId, boardId as string);
    setIsDeleting(false);
    return result;
  };

  return (
    <TaskContextMenu onDelete={handleTaskDelete} onDuplicate={() => duplicateTask(taskId)}>
      <li
        className={`bg-primary-color px-4 py-2 rounded-lg mt-6 font-medium cursor-pointer hover:brightness-125 ${
          isDeleting ? "bg-opacity-30 text-font-secondary-color" : ""
        }`}
      >
        {children}
      </li>
    </TaskContextMenu>
  );
}

export { TaskWrapper };
