import { getBoards } from "@/lib/data";
import { BoardsList } from "./BoardsList";

async function Navbar() {
  const boards = await getBoards();
  return (
    <nav className="h-screen w-64 bg-primary-color py-2 overflow-hidden flex flex-col">
      <header className="text-5xl font-bold text-center">
        <h1>Kanban Board</h1>
      </header>
      <p className="text-font-secondary-color px-5 pt-6 pb-3">ALL BOARDS ({boards.length})</p>
      <BoardsList boards={boards} />
    </nav>
  );
}

export { Navbar };
