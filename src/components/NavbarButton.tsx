"use client";
import Link from "next/link";
import { TableIcon } from "./Icons/TableIcon";
import { useParams } from "next/navigation";
import { Board } from "@/types";
import { useToast } from "./ui/use-toast";
import { deleteBoard } from "@/lib/actions";
import { NavbarButtonWrapper } from "./NavbarButtonWrapper";
import { useState } from "react";
import { NavabarRenameForm } from "./NavabarRenameForm";

type NavabarButtonProps = {
  board: Board;
};
function NavbarButton({ board }: NavabarButtonProps) {
  const [isInputActive, setIsInputActive] = useState(false);
  const { toast } = useToast();
  const params = useParams();
  const isActive = params?.boardId === board.id;

  const styles = isActive
    ? "bg-secondary-color text-font-primary-color *:fill-font-primary-color"
    : "text-font-secondary-color *:fill-font-secondary-color";

  const handleBoardDelete = async () => {
    toast({
      description: "Deleting board...",
    });
    const result = await deleteBoard(board.id);
    if (result?.error) {
      toast({
        variant: "destructive",
        description: "Error while deleting board!",
      });
    } else {
      toast({
        description: "Board deleted successfully!",
      });
    }
  };
  const handleBoardRename = () => {
    setIsInputActive(true);
  };

  return isInputActive ? (
    <NavabarRenameForm boardName={board.name} boardId={board.id} setIsActive={setIsInputActive} />
  ) : (
    <NavbarButtonWrapper onBoardDelete={handleBoardDelete} onBoardRename={handleBoardRename}>
      <Link
        href={`/${board.id}`}
        className={`group w-11/12 block px-5 py-2 rounded-r-3xl cursor-pointer font-medium hover:bg-secondary-color focus:bg-secondary-color ${styles}`}
      >
        <TableIcon
          width={36}
          height={32}
          className="inline-block mr-5 group-hover:fill-font-primary-color group-focus:fill-font-primary-color "
        />
        <span className="group-hover:text-font-primary-color group-focus:text-font-primary-color">
          {board.name}
        </span>
      </Link>
    </NavbarButtonWrapper>
  );
}

export { NavbarButton };
