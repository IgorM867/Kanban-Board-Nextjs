"use client";
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { NewTaskForm } from "./NewTaskForm";
import { Column } from "@/types";

type AddTaskButtonWrapperProps = {
  children: ReactNode;
  columns: Column[];
};

function AddTaskButtonWrapper({ children, columns }: AddTaskButtonWrapperProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium">Add new task</DialogTitle>
        </DialogHeader>
        <NewTaskForm columns={columns} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export { AddTaskButtonWrapper };
