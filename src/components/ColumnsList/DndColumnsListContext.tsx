"use client";
import { useColumns } from "@/providers/ColumnsProvider";
import { ColumnWithTasks } from "@/types";
import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  getFirstCollision,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DebouncedState } from "use-debounce";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useCallback, useEffect, useRef, useState } from "react";

type DndColumnsListContextProps = {
  children: React.ReactNode;
  onColumnMove: DebouncedState<(newOrder: string[]) => void>;
  onTaskMove: DebouncedState<(columnId: string, newOrder: string[]) => void>;
  onTaskColumnChange: DebouncedState<(taskId: string, newColId: string) => void>;
};

function DndColumnsListContext({
  children,
  onColumnMove,
  onTaskMove,
  onTaskColumnChange,
}: DndColumnsListContextProps) {
  const [columns, setColumns] = useColumns();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [newColId, setNewColId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [columns]);

  const isColumn = (id: UniqueIdentifier): boolean => {
    return columns.some((col) => col.id === id);
  };
  const getColumnIndex = (id: UniqueIdentifier): number => {
    return columns.map((col) => col.id as UniqueIdentifier).indexOf(id);
  };
  const getTaskIndex = (column: ColumnWithTasks, id: UniqueIdentifier): number => {
    return column.tasks.map((task) => task.id as UniqueIdentifier).indexOf(id);
  };
  const findColumn = (id: UniqueIdentifier) => {
    const col = columns.find((col) => col.id === id);
    if (col) return col;

    return columns.find((col) => col.tasks.some((task) => task.id === id));
  };

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && isColumn(activeId)) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) =>
            isColumn(container.id)
          ),
        });
      }

      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (isColumn(overId)) {
          const tasks = findColumn(overId)?.tasks;
          if (tasks && tasks.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId && tasks.some((task) => task.id === container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, columns]
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
  };
  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (isColumn(active.id) && over?.id) {
      setColumns((prevColumns) => {
        const activeIndex = getColumnIndex(active.id);
        const overIndex = getColumnIndex(over.id);
        const newArr = arrayMove(prevColumns, activeIndex, overIndex);
        onColumnMove(newArr.map((column) => column.id));
        return newArr;
      });
    }

    const activeColumn = findColumn(active.id);
    if (!activeColumn) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;
    if (!overId) {
      setActiveId(null);
      return;
    }

    const overColumn = findColumn(overId);
    if (overColumn) {
      const activeIndex = getTaskIndex(activeColumn, active.id);
      const overIndex = getTaskIndex(overColumn, overId);

      if (activeIndex !== overIndex) {
        setColumns((prevColumns) =>
          prevColumns.map((column) => {
            if (column.id === overColumn.id) {
              const newTasks = arrayMove(column.tasks, activeIndex, overIndex);
              onTaskMove(
                column.id,
                newTasks.map((task) => task.id)
              );
              return { ...column, tasks: newTasks };
            } else {
              return column;
            }
          })
        );
      }
    }
    if (recentlyMovedToNewContainer && newColId) {
      onTaskColumnChange(activeId as string, newColId as string);
      setNewColId(null);
    }
    setActiveId(null);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (!overId || isColumn(active.id)) return;

    const overColumn = findColumn(overId);
    const activeColumn = findColumn(active.id);

    if (!overColumn || !activeColumn) return;
    if (overColumn.id === activeColumn.id) return;

    setNewColId(overColumn.id);

    setColumns((prevColumns) => {
      const overIndex = getTaskIndex(overColumn, overId);
      const activeIndex = getTaskIndex(activeColumn, active.id);

      let newIndex = isColumn(overId) || overIndex < 0 ? overColumn.tasks.length + 1 : overIndex;
      recentlyMovedToNewContainer.current = true;

      return prevColumns.map((col) => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== active.id),
          };
        } else if (col.id === overColumn.id) {
          const newTasks = [
            ...overColumn.tasks.slice(0, newIndex),
            activeColumn.tasks[activeIndex],
            ...overColumn.tasks.slice(newIndex, overColumn.tasks.length),
          ];
          return { ...col, tasks: newTasks };
        } else {
          return col;
        }
      });
    });
  };
  return (
    <DndContext
      id="dnd-context-id"
      collisionDetection={collisionDetectionStrategy}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      onDragStart={handleDragStart}
    >
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export { DndColumnsListContext };
