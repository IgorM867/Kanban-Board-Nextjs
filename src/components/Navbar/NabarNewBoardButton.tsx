"use client";
import { useState } from "react";
import { NabarNewBoardForm } from "./NabarNewBoardForm";
import { TableIcon } from "../Icons/TableIcon";

function NabarNewBoardButton() {
  const [isActive, setIsActive] = useState(false);
  const styles = isActive ? "bg-background-color" : "";

  return (
    <button
      key={"new-board-button"}
      className={`group w-11/12 px-5 py-2 rounded-r-3xl flex items-center gap-5 cursor-pointer hover:bg-background-color focus:bg-background-color ${styles}`}
      onClick={() => setIsActive(true)}
    >
      <TableIcon width={36} height={32} className="fill-secondary-color" />

      {isActive ? (
        <NabarNewBoardForm setIsActive={setIsActive} />
      ) : (
        <span className="text-secondary-color font-medium">+Create New Board</span>
      )}
    </button>
  );
}

export { NabarNewBoardButton };
