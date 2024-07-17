import { ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { useToast } from "@/components/ui/use-toast";

type TaskContextMenuContentProps = {
  onDelete: () => any;
  onDuplicate: () => any;
};

function TaskContextMenuContent({ onDelete, onDuplicate }: TaskContextMenuContentProps) {
  const { toast } = useToast();
  return (
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
  );
}

export { TaskContextMenuContent };
