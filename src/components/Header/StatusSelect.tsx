import { Column } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function StatusSelect({ columns }: { columns: Column[] }) {
  return (
    <Select name="status" required>
      <SelectTrigger>
        <SelectValue placeholder="Select column" />
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
