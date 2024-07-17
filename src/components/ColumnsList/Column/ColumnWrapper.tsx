"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ColumnWrapperProps = {
  id: string;
  children: React.ReactNode;
};

function ColumnWrapper({ children, id }: ColumnWrapperProps) {
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
      {children}
    </div>
  );
}

export { ColumnWrapper };
