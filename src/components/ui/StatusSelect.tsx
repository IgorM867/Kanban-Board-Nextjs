import { Column } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

type StatusSelectProps = {
  columns: Column[];
  selectedColumn?: Column;
  onValueChange?: (value: string) => void;
};

function StatusSelect({ columns, selectedColumn, onValueChange }: StatusSelectProps) {
  return (
    <Select name="status" required defaultValue={selectedColumn?.id} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select column"></SelectValue>
      </SelectTrigger>
      <SelectContent id="status">
        {columns.map((column) => (
          <SelectItem key={column.id} value={column.id}>
            {column.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { StatusSelect };
