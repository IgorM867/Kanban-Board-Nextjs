import { getColumnsWithTasks } from "@/lib/data";
import { ColumnsList } from "./ColumnsList";

async function ColumnsListContainer({ boardId }: { boardId: string }) {
  const columnsWithTasks = await getColumnsWithTasks(boardId);

  return <ColumnsList columns={columnsWithTasks} />;
}

export { ColumnsListContainer };
