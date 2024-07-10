import { Column } from "@/types";
import { EllipsisVerticalIcon } from "../Icons/EllipsisVerticalIcon";
import { AddTaskButton } from "./AddTaskButton";

type HeaderProps = {
  boardName: string;
  columns: Column[];
};

function Header({ boardName, columns }: HeaderProps) {
  return (
    <header className="bg-primary-color py-10 px-7 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-between items-center">
      <h2 className="text-4xl font-semibold">{boardName}</h2>
      <div className="flex gap-8 items-center">
        {columns.length > 0 && <AddTaskButton columns={columns} />}
        <EllipsisVerticalIcon
          height={42}
          className="cursor-pointer fill-font-secondary-color hover:fill-font-primary-color "
        />
      </div>
    </header>
  );
}

export { Header };
