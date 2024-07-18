"use client";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { ReactNode } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { updateColumnsOrder, updateTasksOrder } from "@/lib/actions";
import { useDebouncedCallback } from "use-debounce";
import { useColumns } from "@/providers/ColumnsProvider";

type ColumnsListWrapperProps = {
  children: ReactNode;
};

function ColumnsListWrapper({ children }: ColumnsListWrapperProps) {
  const [columns, setColumns] = useColumns();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  const handleUpdateColumnsOrder = useDebouncedCallback((newOrder: string[]) => {
    updateColumnsOrder(newOrder);
  }, 500);
  const handleUpdateTasksOrder = useDebouncedCallback((columnId: string, newOrder: string[]) => {
    updateTasksOrder(columnId, newOrder);
  }, 500);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over?.id) return;

    if (active.data.current?.sortable.containerId === "colums-sortable-context") {
      const ids = columns.map((column) => column.id);
      const oldIndex = ids.indexOf(active.id as string);
      const newIndex = ids.indexOf(over.id as string);

      const newArray = arrayMove(columns, oldIndex, newIndex);
      setColumns(newArray);
      handleUpdateColumnsOrder(newArray.map((column) => column.id));
    } else {
      const activeColumnId = active.data.current?.sortable.containerId;
      const activeColumn = columns.find((column) => column.id === activeColumnId);
      if (!activeColumn) return;

      const ids = activeColumn.tasks.map((task) => task.id);
      const oldIndex = ids.indexOf(active.id as string);
      const newIndex = ids.indexOf(over.id as string);

      const newArray = arrayMove(activeColumn.tasks, oldIndex, newIndex);
      setColumns((prevArr) =>
        prevArr.map((column) => {
          if (column.id === activeColumnId) {
            return { ...column, tasks: newArray };
          } else {
            return column;
          }
        })
      );
      handleUpdateTasksOrder(
        activeColumnId,
        newArray.map((task) => task.id)
      );
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      id="columns-dnd-context-id"
    >
      <SortableContext
        items={columns}
        strategy={horizontalListSortingStrategy}
        id="colums-sortable-context"
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}

export { ColumnsListWrapper };
