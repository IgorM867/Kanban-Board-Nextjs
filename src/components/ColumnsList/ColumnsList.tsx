import { Column } from "./Column";
import { Column as ColumnType } from "@/types";
import { NewColumn } from "./NewColumn";

type ColumnsListProps = {
  columns: ColumnType[];
};

async function ColumnsList({ columns }: ColumnsListProps) {
  return (
    <div className="flex-grow flex p-4 gap-5">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <NewColumn />
    </div>
  );
}

export { ColumnsList };
