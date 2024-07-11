import { Column } from "@/types";
import { AddTaskButtonWrapper } from "./AddTaskButtonWrapper";

function AddTaskButton({ columns }: { columns: Column[] }) {
  return (
    <AddTaskButtonWrapper columns={columns}>
      <button className="bg-secondary-color text-xl font-medium px-7 py-3 rounded-3xl cursor-pointer hover:bg-font-primary-color hover:text-secondary-color">
        +Add New Task
      </button>
    </AddTaskButtonWrapper>
  );
}

export { AddTaskButton };
