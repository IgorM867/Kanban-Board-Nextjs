"use client";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-secondary-color w-full rounded-3xl p-2 text-xl font-medium hover:bg-font-primary-color hover:text-secondary-color disabled:text-font-secondary-color disabled:cursor-not-allowed disabled:hover:bg-secondary-color"
    >
      Save changes
    </button>
  );
}

export { SubmitButton };
