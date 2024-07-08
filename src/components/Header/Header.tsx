import { EllipsisVerticalIcon } from "../Icons/EllipsisVerticalIcon";
import { CreateTaskButton } from "./CreateTaskButton";

type HeaderProps = {
  boardName: string;
};

function Header({ boardName }: HeaderProps) {
  return (
    <header className="bg-primary-color py-10 px-7 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-between items-center">
      <h2 className="text-4xl font-semibold">{boardName}</h2>
      <div className="flex gap-9">
        <CreateTaskButton />
        <EllipsisVerticalIcon
          height={52}
          className="cursor-pointer fill-font-secondary-color hover:fill-font-primary-color "
        />
      </div>
    </header>
  );
}

export { Header };
