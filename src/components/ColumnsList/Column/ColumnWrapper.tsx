"use client";
import { Task } from "@/types";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ColumnWrapperProps = {
  children: React.ReactNode;
  id: string;
  tasks: Task[];
};

function ColumnWrapper({ children, id, tasks }: ColumnWrapperProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
      <SortableContext items={tasks} strategy={verticalListSortingStrategy} id={id}>
        {children}
      </SortableContext>
    </div>
  );
}

export { ColumnWrapper };
