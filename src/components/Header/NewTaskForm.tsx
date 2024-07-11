"use client";
import { addTask } from "@/lib/actions";
import { FormLabel } from "./FormLabel";
import { StatusSelect } from "./StatusSelect";
import { Subtasks } from "./Subtasks";
import { Column } from "@/types";
import { TextInputWithLabel } from "./TextInputWithLabel";
import { TextAreaWithLabel } from "./TextAreaWithLabel";
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
      {state.message && <p className="text-red-500">{state.message}</p>}
      <SubmitButton />
    </form>
  );
}

export { NewTaskForm };
