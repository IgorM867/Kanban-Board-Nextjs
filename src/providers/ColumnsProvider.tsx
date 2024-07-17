"use client";
import { ColumnWithTasks } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type ColumnsProviderProps = {
  children: React.ReactNode;
  columns: ColumnWithTasks[];
};

const ColumnsContext = createContext<
  [ColumnWithTasks[], Dispatch<SetStateAction<ColumnWithTasks[]>>]
>([[], () => []]);

function ColumnsProvider({ children, columns: initialColumns }: ColumnsProviderProps) {
  const [columns, setColumns] = useState(initialColumns);
  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);
  return (
    <ColumnsContext.Provider value={[columns, setColumns]}>{children}</ColumnsContext.Provider>
  );
}

function useColumns() {
  const context = useContext(ColumnsContext);
  if (!context) {
    throw new Error("useColumns must be used within ColumnsProvider");
  }
  return context;
}

export { ColumnsProvider, useColumns };
