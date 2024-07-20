import { TaskWithSubtasks } from "@/types";
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ColumnWrapperProps = {
  children: React.ReactNode;
  columnId: string;
  items: TaskWithSubtasks[];
};
const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

function ColumnWrapper({ children, columnId, items }: ColumnWrapperProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: columnId,
    data: {
      type: "column",
      children: items,
    },
    animateLayoutChanges,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={`p-2 rounded-md w-64 flex-shrink-0 cursor-pointer hover:z-10 ${
        isDragging ? "bg-primary-color bg-opacity-60" : "hover:bg-primary-color hover:bg-opacity-30"
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

export { ColumnWrapper };
