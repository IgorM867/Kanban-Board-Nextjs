import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { NewTaskForm } from "./NewTaskForm";
import { Column } from "@/types";

type AddTaskButtonWrapperProps = {
  children: ReactNode;
  columns: Column[];
};

function AddTaskButtonWrapper({ children, columns }: AddTaskButtonWrapperProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">Add new task</DialogTitle>
        </DialogHeader>
        <NewTaskForm columns={columns} />
      </DialogContent>
    </Dialog>
  );
}

export { AddTaskButtonWrapper };
