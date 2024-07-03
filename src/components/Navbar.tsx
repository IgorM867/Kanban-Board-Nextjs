import { Board } from "@/types";
import { TableIcon } from "./Icons/TableIcon";
import { NavbarButton } from "./NavbarButton";
import { NabarNewBoardButton } from "./NabarNewBoardButton";

type NavbarProps = {
  boards: Board[];
};

function Navbar({ boards }: NavbarProps) {
  return (
    <nav className="h-screen w-64 bg-primary-color">
      <header className="text-5xl font-bold text-center">Kanban Board</header>
      <p className="text-font-secondary-color px-5 pt-6 pb-3">ALL BOARDS ({boards.length})</p>
      <ul>
        {boards.map((board) => (
          <NavbarButton boardId={board.id} boardName={board.name} key={board.id} />
        ))}
        <NabarNewBoardButton />
      </ul>
    </nav>
  );
}

export { Navbar };
