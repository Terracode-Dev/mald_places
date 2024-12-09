
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input
      placeholder="Search islands..."
      onChange={(e) => onSearch(e.target.value)}
      className="max-w-sm"
    />
  )
}

