import { addTask } from "@/lib/actions";
import { FormLabel } from "./FormLabel";
import { StatusSelect } from "./StatusSelect";
import { Subtasks } from "./Subtasks";
import { Column } from "@/types";

function NewTaskForm({ columns }: { columns: Column[] }) {
  return (
    <form className="flex flex-col gap-7" action={addTask}>
      <div>
        <FormLabel label="Title" htmlFor="title" />
        <input
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Take coffee break"
          className="w-full bg-primary-color border-font-secondary-color border-2 outline-none rounded-md p-1 focus:border-font-primary-color"
        />
      </div>
      <div>
        <FormLabel label="Description" htmlFor="description" />
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          className="resize-none w-full bg-primary-color border-font-secondary-color border-2 outline-none rounded-md p-1 focus:border-font-primary-color"
        />
      </div>
      <Subtasks />
      <div>
        <FormLabel label="Status" htmlFor="status" />
        <StatusSelect columns={columns} />
      </div>
      <button
        type="submit"
        className="bg-secondary-color w-full rounded-3xl p-2 text-xl font-semibold hover:bg-font-primary-color hover:text-secondary-color"
      >
        Save changes
      </button>
    </form>
  );
}

export { NewTaskForm };
