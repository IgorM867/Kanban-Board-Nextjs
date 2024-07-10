import { Column } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function StatusSelect({ columns }: { columns: Column[] }) {
  return (
    <Select name="status">
      <SelectTrigger>
        <SelectValue placeholder="TODO" />
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
