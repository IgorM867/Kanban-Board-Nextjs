"use client";
import { useFormState, useFormStatus } from "react-dom";
import { TextInputWithLabel } from "../ui/TextInputWithLabel";
import { addColumn } from "@/lib/actions";
import { useEffect } from "react";
import { useParams } from "next/navigation";

type NewColumnFormProps = {
  closeDialog: () => void;
};

function NewColumnForm({ closeDialog }: NewColumnFormProps) {
  const params = useParams();
  const [state, formAction] = useFormState(addColumn.bind(null, params?.boardId as string), {
    message: "",
    success: false,
  });
  useEffect(() => {
    if (state.success) {
      closeDialog();
    }
  }, [state]);

  return (
    <form action={formAction}>
      <TextInputWithLabel label="Column Name" name="column_name" placeholder="TODO" />
      {!state.success && <p className="text-red-500">{state.message}</p>}
      <div className="flex justify-end gap-3 mt-5">
        <button type="button" className="hover:underline" onClick={closeDialog}>
          Cancel
        </button>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-secondary-color rounded-lg p-2 font-medium hover:bg-font-primary-color hover:text-secondary-color disabled:cursor-not-allowed disabled:hover:bg-secondary-color disabled:hover:text-font-secondary-color"
    >
      Add Column
    </button>
  );
}

export { NewColumnForm };
