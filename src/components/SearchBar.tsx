import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by title, author, or genre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};
