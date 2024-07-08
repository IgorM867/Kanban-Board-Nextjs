import { Header } from "@/components/Header/Header";
import { getBoardById } from "@/lib/data";
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
  return (
    <main className="flex-grow">
      <Header boardName={board.name} />
    </main>
  );
}

export default BoardPage;
