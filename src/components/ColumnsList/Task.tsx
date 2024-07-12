import { getSubtasks } from "@/lib/data";
import { Task as TaskType } from "@/types";
import { TaskContextMenu } from "./TaskContextMenu";
import { deleteTask, duplicateTask } from "@/lib/actions";

type TaskProps = {
  task: TaskType;
  boardId: string;
};

async function Task({ task, boardId }: TaskProps) {
  const subtasks = await getSubtasks(task.id);
  const numberOfDoneSubtasks = subtasks.filter((subtask) => subtask.done).length;
  return (
    <TaskContextMenu
      onDelete={deleteTask.bind(null, task.id, boardId)}
      onDuplicate={duplicateTask.bind(null, task.id)}
    >
      <li className="bg-primary-color px-4 py-2 rounded-lg mt-6 font-medium cursor-pointer hover:brightness-125">
        <h4 className="text-lg">{task.title}</h4>
        {subtasks.length > 0 && (
          <p className="text-sm text-font-secondary-color">
            {numberOfDoneSubtasks} of {subtasks.length} subtasks
          </p>
        )}
      </li>
    </TaskContextMenu>
  );
}

export { Task };
