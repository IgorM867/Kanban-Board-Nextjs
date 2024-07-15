import { getTasks } from "@/lib/data";
import { Column as ColumnType } from "@/types";
import { Task } from "./Task";
import { ColorCircle } from "./ColorCircle";
import { changeColumnColor } from "@/lib/actions";

async function Column({ column }: { column: ColumnType }) {
  const tasks = await getTasks(column.id);

  return (
    <div className="p-2 rounded-md w-64 flex-shrink-0">
      <header className="flex items-center gap-2">
        <ColorCircle
          defaultColor={column.color}
          changeColumnColor={changeColumnColor.bind(null, column.id)}
        />
        <h3 className="text-xl font-medium text-font-secondary-color ">
          {column.name} <span>{`(${tasks.length})`}</span>
        </h3>
      </header>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

export { Column };
