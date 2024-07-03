"use client";
import { useRef, useState } from "react";
import { TableIcon } from "./Icons/TableIcon";
import { createBoard } from "@/lib/actions";

function NabarNewBoardButton() {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const styles = isActive ? "bg-background-color" : "";

  const handleBlue = () => {
    if (inputValue.trim() === "") {
      setIsActive(false);
      setInputValue("");
    } else {
      setIsActive(false);
      setInputValue("");
      ref?.current?.requestSubmit();
    }
  };

  return (
    <li
      key={"new-board-button"}
      className={`group w-11/12 px-5 py-2 rounded-r-3xl flex items-center gap-5 cursor-pointer hover:bg-background-color ${styles}`}
      onClick={() => setIsActive(true)}
    >
      <TableIcon width={36} height={32} className="fill-secondary-color" />

      {isActive ? (
        <form ref={ref} className="inline flex-grow" action={createBoard}>
          <input
            type="text"
            className="bg-transparent outline-none w-32"
            required
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlue}
          ></input>
        </form>
      ) : (
        <span className="text-secondary-color font-medium">+Create New Board</span>
      )}
    </li>
  );
}

export { NabarNewBoardButton };
