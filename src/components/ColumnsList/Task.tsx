import { Column, TaskWithSubtasks } from "@/types";
import { TaskWrapper } from "./TaskWrapper";

type TaskProps = {
  task: TaskWithSubtasks;
  columns: Column[];
};

function Task({ task, columns }: TaskProps) {
  const subtasks = task.subtasks;
  const numberOfDoneSubtasks = subtasks.filter((subtask) => subtask.done).length;

  return (
    <TaskWrapper task={task} subtasks={subtasks} columns={columns}>
      <h4 className="text-lg">{task.title}</h4>
      {subtasks.length > 0 && (
        <p className="text-sm text-font-secondary-color">
          {numberOfDoneSubtasks} of {subtasks.length} subtasks
        </p>
      )}
    </TaskWrapper>
  );
}

export { Task };
