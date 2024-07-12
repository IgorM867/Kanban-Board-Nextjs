import { getSubtasks } from "@/lib/data";
import { Task as TaskType } from "@/types";
import { TaskWrapper } from "./TaskWrapper";

type TaskProps = {
  task: TaskType;
};

async function Task({ task }: TaskProps) {
  const subtasks = await getSubtasks(task.id);
  const numberOfDoneSubtasks = subtasks.filter((subtask) => subtask.done).length;

  return (
    <TaskWrapper taskId={task.id}>
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
