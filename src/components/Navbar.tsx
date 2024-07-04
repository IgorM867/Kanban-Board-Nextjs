import { NavbarButton } from "./NavbarButton";
import { NabarNewBoardButton } from "./NabarNewBoardButton";
import { getBoards } from "@/lib/data";

async function Navbar() {
  const boards = await getBoards();
  return (
    <nav className="h-screen w-64 bg-primary-color py-2 overflow-hidden flex flex-col">
      <header className="text-5xl font-bold text-center">Kanban Board</header>
      <p className="text-font-secondary-color px-5 pt-6 pb-3">ALL BOARDS ({boards.length})</p>
      <ul className="overflow-y-auto scrollbar">
        {boards.map((board) => (
          <NavbarButton board={board} key={board.id} />
        ))}
        <NabarNewBoardButton />
      </ul>
    </nav>
  );
}

export { Navbar };
