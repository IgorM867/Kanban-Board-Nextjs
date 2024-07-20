"use client";
import { Column } from "./Column/Column";
import { NewColumnButton } from "./NewColumnButton/NewColumnButton";
import { useColumns } from "@/providers/ColumnsProvider";
import { DndColumnsListContext } from "./DndColumnsListContext";
import { useDebouncedCallback } from "use-debounce";
import { changeTaskColumn, updateColumnsOrder, updateTasksOrder } from "@/lib/actions";

function ColumnsList() {
  const [columns] = useColumns();

  const handleUpdateColumnsOrder = useDebouncedCallback((newOrder: string[]) => {
    updateColumnsOrder(newOrder);
  }, 1000);
  const handleUpdateTasksOrder = useDebouncedCallback((columnId: string, newOrder: string[]) => {
    updateTasksOrder(columnId, newOrder);
  }, 1000);
  const handleTaskColumnChange = useDebouncedCallback(async (taskId: string, newColId: string) => {
    const newCol = columns.find((column) => column.tasks.some((task) => task.id === taskId));
    if (!newCol) return;

    const task = newCol.tasks.find((task) => task.id === taskId);
    if (!task) return;
    if (task.column_id === newColId) return;

    await changeTaskColumn(taskId, newColId);
    await updateTasksOrder(
      newCol.id,
      newCol.tasks.map((task) => task.id)
    );
  }, 1000);

  return (
    <div className="flex-grow flex p-4 gap-5 overflow-auto scrollbar">
      <DndColumnsListContext
        onColumnMove={handleUpdateColumnsOrder}
        onTaskMove={handleUpdateTasksOrder}
        onTaskColumnChange={handleTaskColumnChange}
      >
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </DndColumnsListContext>
      <NewColumnButton />
    </div>
  );
}

export { ColumnsList };
