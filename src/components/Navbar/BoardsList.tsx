"use client";
import { Board } from "@/types";
import { NavbarButton } from "./NavbarButton";
import { NabarNewBoardButton } from "./NabarNewBoardButton";

function BoardsList({ boards }: { boards: Board[] }) {
  return (
    <ul className="overflow-y-auto scrollbar">
      {boards.map((board) => (
        <NavbarButton board={board} key={board.id} />
      ))}
      <NabarNewBoardButton />
    </ul>
  );
}

export { BoardsList };
