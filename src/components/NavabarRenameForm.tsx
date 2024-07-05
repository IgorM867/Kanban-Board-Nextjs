"use client";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { TableIcon } from "./Icons/TableIcon";
import { useToast } from "./ui/use-toast";
import { renameBoard } from "@/lib/actions";

type NavabarRenameFormProps = {
  boardName: string;
  boardId: string;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};
function NavabarRenameForm({ boardName, boardId, setIsActive }: NavabarRenameFormProps) {
  const [inputValue, setInputValue] = useState(boardName);
  const ref = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleBlur = () => {
    setIsActive(false);
    if (inputValue.trim() !== "") {
      ref?.current?.requestSubmit();
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsActive(false);
    if (!inputValue.trim() || inputValue.trim() === boardName) {
      return;
    }
    toast({
      description: "Renaming board, please wait...",
    });
    setInputValue("");

    const result = await renameBoard(boardId, inputValue);

    if (result?.error) {
      toast({
        variant: "destructive",
        description: "Oops! Something went wrong while renaming the board.",
      });
    } else {
      toast({
        description: "Board successfully renamed.",
      });
    }
  };

  return (
    <button
      key={boardId}
      className={`group w-11/12 px-5 py-2 rounded-r-3xl flex items-center gap-5 cursor-pointer bg-secondary-color`}
    >
      <TableIcon width={36} height={32} className="fill-font-primary-color" />

      <form ref={ref} className="inline flex-grow" onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-transparent outline-none w-32"
          name="boardName"
          value={inputValue}
          required
          autoFocus
          autoComplete="off"
          maxLength={14}
          onBlur={handleBlur}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </button>
  );
}

export { NavabarRenameForm };
