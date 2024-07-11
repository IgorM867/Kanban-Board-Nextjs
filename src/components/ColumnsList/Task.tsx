import { getSubtasks } from "@/lib/data";
import { Task as TaskType } from "@/types";
import React from "react";

type TaskProps = {
  task: TaskType;
};

async function Task({ task }: TaskProps) {
  const subtasks = await getSubtasks(task.id);
  const numberOfDoneSubtasks = subtasks.filter((subtask) => subtask.done).length;
  return (
    <li
      key={task.id}
      className="bg-primary-color px-4 py-2 rounded-lg mt-6 font-medium cursor-pointer hover:brightness-125"
    >
      <h4 className="text-lg">{task.title}</h4>
      {subtasks.length > 0 && (
        <p className="text-sm text-font-secondary-color">
          {numberOfDoneSubtasks} of {subtasks.length} subtasks
        </p>
      )}
    </li>
  );
}

export { Task };
