"use client";
import { createBoard } from "@/lib/actions";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";

type NabarNewBoardFormProps = {
  setIsActive: Dispatch<SetStateAction<boolean>>;
};
function NabarNewBoardForm({ setIsActive }: NabarNewBoardFormProps) {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);

  const handleBlur = () => {
    setIsActive(false);
    setInputValue("");
    if (inputValue.trim() !== "") {
      ref?.current?.requestSubmit();
    }
  };
  const handleSubmit = () => {
    toast({
      description: "Adding board, please wait...",
    });
    setIsActive(false);
    setInputValue("");
  };
  return (
    <form
      ref={ref}
      className="inline flex-grow"
      action={(formData: FormData) => {
        createBoard(formData).then((result) => {
          if (result?.error) {
            toast({
              variant: "destructive",
              description: "Oops! Something went wrong while adding the board.",
            });
          } else {
            toast({
              description: "Board added successfully!",
            });
          }
        });
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="bg-transparent outline-none w-32"
        name="boardName"
        required
        autoFocus
        autoComplete="off"
        maxLength={14}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
      />
    </form>
  );
}

export { NabarNewBoardForm };
