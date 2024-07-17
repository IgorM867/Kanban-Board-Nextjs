import { Column as ColumnType, ColumnWithTasks } from "@/types";
import { Task } from "./Task";
import { ColorCircle } from "./ColorCircle";
import { changeColumnColor } from "@/lib/actions";
import { ColumnWrapper } from "./ColumnWrapper";

type ColumnProps = {
  column: ColumnWithTasks;
  columns: ColumnType[];
};

function Column({ column, columns }: ColumnProps) {
  return (
    <ColumnWrapper id={column.id}>
      <header className="flex items-center gap-2">
        <ColorCircle
          defaultColor={column.color}
          changeColumnColor={changeColumnColor.bind(null, column.id)}
        />
        <h3 className="text-xl font-medium text-font-secondary-color ">
          {column.name} <span>{`(${column.tasks.length})`}</span>
        </h3>
      </header>
      <ul>
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} columns={columns} />
        ))}
      </ul>
    </ColumnWrapper>
  );
}

export { Column };
