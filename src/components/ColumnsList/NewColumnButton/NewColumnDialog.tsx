"use client";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewColumnForm } from "./NewColumnForm";

type NewColumnDialogProps = {
  children: ReactNode;
};

function NewColumnDialog({ children }: NewColumnDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium">Add New Column</DialogTitle>
        </DialogHeader>
        <NewColumnForm closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export { NewColumnDialog };
