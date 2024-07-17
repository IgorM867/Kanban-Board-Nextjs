import { Subtask as SubtaskType, Task } from "@/types";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormLabel } from "../ui/FormLabel";
import { StatusSelect } from "../ui/StatusSelect";
import { changeColumn } from "@/lib/actions";
import { Subtask } from "./Subtask";
import { useColumns } from "@/providers/ColumnsProvider";

type TaskDialogContentProps = {
  boardId: string;
  task: Task;
  subtasks: SubtaskType[];
};

function TaskDialogContent({ boardId, task, subtasks }: TaskDialogContentProps) {
  const [columns] = useColumns();
  const doneSubtasksCount = subtasks.filter((subtask) => subtask.done).length;
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-3xl font-medium">{task.title}</DialogTitle>
        <DialogDescription className="text-lg font-medium">{task.description}</DialogDescription>
      </DialogHeader>
      <h3>Subtasks {`(${doneSubtasksCount} Of ${subtasks.length})`}</h3>
      <ul>
        {subtasks.map((subtask) => (
          <Subtask key={subtask.id} boardId={boardId} subtask={subtask} />
        ))}
      </ul>
      <div>
        <FormLabel label="Status" htmlFor="status" />
        <StatusSelect
          columns={columns}
          selectedColumn={columns.find((column) => column.id === task.column_id)}
          onValueChange={(value) => changeColumn(task.id, value, boardId)}
        />
      </div>
    </DialogContent>
  );
}
export { TaskDialogContent };
