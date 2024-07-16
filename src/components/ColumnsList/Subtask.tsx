import { Subtask as SubtaskType } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { changeSubtaskDoneStatus } from "@/lib/actions";

type SubtaskProps = { subtask: SubtaskType; boardId: string };

function Subtask({ subtask, boardId }: SubtaskProps) {
  return (
    <li className="bg-background-color rounded-md mb-3 hover:brightness-125">
      <label className="w-full h-full py-3 px-4 flex items-center gap-4 cursor-pointer">
        <Checkbox
          className="size-6"
          checked={subtask.done}
          onCheckedChange={async (checked) => {
            await changeSubtaskDoneStatus(subtask.id, !!checked, boardId);
          }}
        />
        <span className="text-lg font-medium">{subtask.content}</span>
      </label>
    </li>
  );
}

export { Subtask };
