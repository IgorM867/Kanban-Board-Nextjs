import { getColumnsWithTasks } from "@/lib/data";
import { ColumnsList } from "./ColumnsList";
import { ColumnsProvider } from "@/providers/ColumnsProvider";

async function ColumnsListContainer({ boardId }: { boardId: string }) {
  const columnsWithTasks = await getColumnsWithTasks(boardId);

  return (
    <ColumnsProvider columns={columnsWithTasks}>
      <ColumnsList />
    </ColumnsProvider>
  );
}

export { ColumnsListContainer };
