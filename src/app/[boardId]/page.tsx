import { ColumnsList } from "@/components/ColumnsList/ColumnsList";
import { ColumnsSkeleton } from "@/components/ColumnsList/ColumnsSkeleton";
import { Header } from "@/components/Header/Header";
import { getBoardById, getBoardColumns } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

export const revalidate = 0;

async function BoardPage({ params }: BoardPageProps) {
  const board = await getBoardById(params.boardId);
  if (!board) {
    return notFound();
  }
  const columns = await getBoardColumns(board.id);

  return (
    <main className="flex-grow flex flex-col max-h-screen min-w-1">
      <Header boardName={board.name} columns={columns} />
      <Suspense fallback={<ColumnsSkeleton />}>
        <ColumnsList columns={columns} />
      </Suspense>
    </main>
  );
}

export default BoardPage;
