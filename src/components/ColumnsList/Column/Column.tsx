import { ColumnWithTasks } from "@/types";
import { ColorCircle } from "./ColorCircle";
import { changeColumnColor } from "@/lib/actions";
import { ColumnWrapper } from "./ColumnWrapper";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "../Task/Task";

type ColumnProps = {
  column: ColumnWithTasks;
};

function Column({ column }: ColumnProps) {
  return (
    <ColumnWrapper columnId={column.id} items={column.tasks}>
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
        <SortableContext items={column.tasks} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </ul>
    </ColumnWrapper>
  );
}

export { Column };
