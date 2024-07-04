"use client";
import Link from "next/link";
import { TableIcon } from "./Icons/TableIcon";
import { useParams } from "next/navigation";
import { Board } from "@/types";

type NavabarButtonProps = {
  board: Board;
};
function NavbarButton({ board }: NavabarButtonProps) {
  const { id: boardId, name: boardName } = board;
  const params = useParams();
  const isActive = params?.boardId === boardId;

  const styles = isActive
    ? "bg-secondary-color text-font-primary-color *:fill-font-primary-color"
    : "text-font-secondary-color *:fill-font-secondary-color";
  return (
    <Link
      href={`/${boardId}`}
      className={`group w-11/12 block px-5 py-2 rounded-r-3xl cursor-pointer font-medium hover:bg-secondary-color focus:bg-secondary-color    ${styles}`}
    >
      <TableIcon
        width={36}
        height={32}
        className="inline-block mr-5 group-hover:fill-font-primary-color group-focus:fill-font-primary-color "
      />
      <span className="group-hover:text-font-primary-color group-focus:text-font-primary-color">
        {boardName}
      </span>
    </Link>
  );
}

export { NavbarButton };
