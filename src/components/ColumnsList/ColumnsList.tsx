"use client";
import { Column } from "./Column";
import { ColumnWithTasks } from "@/types";
import { NewColumn } from "./NewColumn";
import { ColumnsListWrapper } from "./ColumnsListWrapper";
import { useEffect, useState } from "react";

type ColumnsListProps = {
  columns: ColumnWithTasks[];
};

function ColumnsList({ columns: initialColumns }: ColumnsListProps) {
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  return (
    <div className="flex-grow flex p-4 gap-5 overflow-auto scrollbar">
      <ColumnsListWrapper columns={columns} setColumns={setColumns}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            columns={columns.map(({ tasks, ...properties }) => {
              return { ...properties };
            })}
          />
        ))}
      </ColumnsListWrapper>
      <NewColumn />
    </div>
  );
}

export { ColumnsList };
