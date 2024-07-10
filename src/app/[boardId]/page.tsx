import { Header } from "@/components/Header/Header";
import { getBoardById, getBoardColumns } from "@/lib/data";
import { notFound } from "next/navigation";

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

async function BoardPage({ params }: BoardPageProps) {
  const board = await getBoardById(params.boardId);
  if (!board) {
    return notFound();
  }
  const columns = await getBoardColumns(board.id);

  return (
    <main className="flex-grow">
      <Header boardName={board.name} columns={columns} />
    </main>
  );
}

export default BoardPage;
