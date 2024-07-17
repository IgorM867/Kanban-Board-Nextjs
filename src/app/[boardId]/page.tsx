import { ColumnsListContainer } from "@/components/ColumnsList/ColumnsListContainer";
import { ColumnsSkeleton } from "@/components/ColumnsList/ColumnsSkeleton";
import { Header } from "@/components/Header/Header";
import { getBoardById } from "@/lib/data";
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

  return (
    <main className="flex-grow flex flex-col max-h-screen min-w-1">
      <Header boardName={board.name} boardId={board.id} />
      <Suspense fallback={<ColumnsSkeleton />}>
        <ColumnsListContainer boardId={board.id} />
      </Suspense>
    </main>
  );
}

export default BoardPage;
