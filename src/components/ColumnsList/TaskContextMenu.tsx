"use client";
import { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useToast } from "../ui/use-toast";

type TaskContextMenuProps = {
  children: ReactNode;
  onDelete: () => any;
  onDuplicate: () => any;
};

function TaskContextMenu({ children, onDelete, onDuplicate }: TaskContextMenuProps) {
  const { toast } = useToast();
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={async () => {
            const result = await onDuplicate();
            if (result?.error) {
              toast({
                variant: "destructive",
                description: "Cannot duplicate task",
              });
            }
          }}
        >
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem
          onClick={async () => {
            const result = await onDelete();
            if (result?.error) {
              toast({
                variant: "destructive",
                description: "Cannot delete task",
              });
            }
          }}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { TaskContextMenu };
