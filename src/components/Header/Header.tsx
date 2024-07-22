import { EllipsisVerticalIcon } from "../Icons/EllipsisVerticalIcon";
import { AddTaskButton } from "./AddTaskButton";
import { getBoardColumns } from "@/lib/data";

type HeaderProps = {
  boardName: string;
  boardId: string;
};

async function Header({ boardName, boardId }: HeaderProps) {
  const columns = await getBoardColumns(boardId);
  return (
    <header className="bg-primary-color py-10 px-7 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-between items-center">
      <h2 className="text-4xl font-medium">{boardName}</h2>
      <div className="flex gap-8 items-center">
        {columns.length > 0 && <AddTaskButton columns={columns} />}
        {/* <EllipsisVerticalIcon
          height={42}
          className="cursor-pointer fill-font-secondary-color hover:fill-font-primary-color "
        /> */}
      </div>
    </header>
  );
}

export { Header };
