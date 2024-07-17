"use client";
import { Column } from "./Column/Column";
import { NewColumnButton } from "./NewColumnButton/NewColumnButton";
import { ColumnsListWrapper } from "./ColumnsListWrapper";
import { useColumns } from "@/providers/ColumnsProvider";

function ColumnsList() {
  const [columns] = useColumns();

  return (
    <div className="flex-grow flex p-4 gap-5 overflow-auto scrollbar">
      <ColumnsListWrapper>
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </ColumnsListWrapper>
      <NewColumnButton />
    </div>
  );
}

export { ColumnsList };
