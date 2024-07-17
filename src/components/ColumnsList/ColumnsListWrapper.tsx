"use client";
import { ColumnWithTasks } from "@/types";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { updateColumnsOrder } from "@/lib/actions";
import { useDebouncedCallback } from "use-debounce";

type ColumnsListWrapperProps = {
  children: ReactNode;
  columns: ColumnWithTasks[];
  setColumns: Dispatch<SetStateAction<ColumnWithTasks[]>>;
};

function ColumnsListWrapper({ children, columns, setColumns }: ColumnsListWrapperProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const handleUpdateColumnsOrder = useDebouncedCallback((newOrder: string[]) => {
    updateColumnsOrder(newOrder);
  }, 500);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const ids = columns.map((column) => column.id);
      const oldIndex = ids.indexOf(active.id);
      const newIndex = ids.indexOf(over.id);

      const newArray = arrayMove(columns, oldIndex, newIndex);
      setColumns(newArray);
      handleUpdateColumnsOrder(newArray.map((column) => column.id));
    }
  };
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      id="unique-dnd-context-id"
    >
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export { ColumnsListWrapper };
