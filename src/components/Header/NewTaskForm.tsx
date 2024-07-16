"use client";
import { addTask } from "@/lib/actions";
import { FormLabel } from "../ui/FormLabel";
import { StatusSelect } from "../ui/StatusSelect";
import { Subtasks } from "./Subtasks";
import { Column } from "@/types";
import { TextInputWithLabel } from "../ui/TextInputWithLabel";
import { TextAreaWithLabel } from "../ui/TextAreaWithLabel";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { useEffect } from "react";

type NewTaskFormProps = {
  columns: Column[];
  closeDialog: () => void;
};

function NewTaskForm({ columns, closeDialog }: NewTaskFormProps) {
  const [state, formAction] = useFormState(addTask, { message: "", success: false });

  useEffect(() => {
    if (state.success) {
      closeDialog();
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-7" action={formAction}>
      <TextInputWithLabel name="title" label="Title" placeholder="e.g. Take coffee break" />
      <TextAreaWithLabel
        name="description"
        label="Description"
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
      />
      <Subtasks />
      <div>
        <FormLabel label="Status" htmlFor="status" />
        <StatusSelect columns={columns} />
      </div>
      {!state.success && <p className="text-red-500">{state.message}</p>}
      <SubmitButton />
    </form>
  );
}
export { NewTaskForm };
