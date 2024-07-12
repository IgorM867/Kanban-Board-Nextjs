import { NewColumnDialog } from "./NewColumnDialog";

function NewColumn() {
  return (
    <div className="p-2 rounded-md w-64 flex flex-col flex-shrink-0">
      <NewColumnDialog>
        <button className="bg-primary-color bg-opacity-40 rounded-lg flex-grow mt-[52px] text-3xl font-medium text-font-secondary-color cursor-pointer hover:bg-opacity-100 hover:text-font-primary-color">
          +New Column
        </button>
      </NewColumnDialog>
    </div>
  );
}

export { NewColumn };
