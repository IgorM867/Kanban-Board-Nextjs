import { getTasks } from "@/lib/data";
import { Column as ColumnType } from "@/types";
import { Task } from "./Task";

async function Column({ column }: { column: ColumnType }) {
  const tasks = await getTasks(column.id);

  return (
    <div className=" p-2 rounded-md w-64">
      <header className="flex items-center gap-2">
        <div className="size-7 bg-cyan-500 inline-block rounded-full"></div>
        <h3 className="text-xl font-medium text-font-secondary-color ">
          {column.name} <span>{`(${tasks.length})`}</span>
        </h3>
      </header>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} boardId={column.board_id} />
        ))}
      </ul>
    </div>
  );
}

export { Column };
