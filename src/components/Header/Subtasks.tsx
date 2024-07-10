"use client";
import { useState } from "react";
import { FormLabel } from "./FormLabel";
import { XMarkIcon } from "../Icons/XMarkIcon";

type Subtask = {
  id: string;
  content: string;
};

const placeholders = ["e.g. Make coffe", "e.g. Drink coffe & smile"];

function Subtasks() {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  const addSubtask = () => {
    const newSubtask = { id: Date.now().toString(), content: "" };
    setSubtasks([...subtasks, newSubtask]);
  };
  const deleteSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  return (
    <div>
      <FormLabel label="Subtasks" />
      <ul>
        {subtasks.map((subtask, i) => (
          <li className="flex mb-2">
            <input
              name={`subtask-${i}`}
              className="w-full bg-primary-color border-font-secondary-color border-2 outline-none rounded-md p-1 focus:border-font-primary-color"
              placeholder={placeholders[i]}
            />
            <XMarkIcon
              width={34}
              height={34}
              className="cursor-pointer fill-font-secondary-color hover:fill-font-primary-color"
              onClick={() => deleteSubtask(subtask.id)}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="bg-font-primary-color text-secondary-color text-xl font-semibold w-full p-2 rounded-3xl cursor-pointer hover:text-font-primary-color hover:bg-secondary-color"
        onClick={addSubtask}
      >
        +Add New Subtask
      </button>
    </div>
  );
}

export { Subtasks };
