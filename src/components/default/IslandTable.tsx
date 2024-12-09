import { useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Island } from "@/schema/island"

interface IslandTableProps {
  islands: Island[]
}

export function IslandTable({ islands }: IslandTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Island>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedIslands = [...islands].sort((a, b) => {
    const valueA = a[sortColumn] ?? "";
    const valueB = b[sortColumn] ?? "";
    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column: keyof Island) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <Table className="border rounded " >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
            Name
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("latitude")}>
            Latitude
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("longitude")}>
            Longitude
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("islandType")}>
            Island Type
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("atoll")}>
            Atoll
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedIslands.map((island, index) => (
          <TableRow
            key={island.name}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => console.log(island.name)}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{island.name}</TableCell>
            <TableCell>{island.latitude || "N/A"}</TableCell>
            <TableCell>{island.longitude || "N/A"}</TableCell>
            <TableCell>{island.islandType || "N/A"}</TableCell>
            <TableCell>{island.atoll || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


// export function IslandTable({ islands }: IslandTableProps) {
//   // const navigate = useNavigate()
//   const [sortColumn, setSortColumn] = useState<keyof Island>("name")
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
//
//   const sortedIslands = [...islands].sort((a, b) => {
//     if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
//     if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
//     return 0
//   })
//
//   const handleSort = (column: keyof Island) => {
//     if (column === sortColumn) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortColumn(column)
//       setSortDirection("asc")
//     }
//   }
//
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[50px]">No</TableHead>
//           <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>Name</TableHead>
//           <TableHead className="cursor-pointer" onClick={() => handleSort("latitude")}>Latitude</TableHead>
//           <TableHead className="cursor-pointer" onClick={() => handleSort("longitude")}>Longitude</TableHead>
//           <TableHead className="cursor-pointer" onClick={() => handleSort("islandType")}>Island Type</TableHead>
//           <TableHead className="cursor-pointer" onClick={() => handleSort("atoll")}>Atoll</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {sortedIslands.map((island, index) => (
//           <TableRow
//             key={island.name}
//             className="cursor-pointer hover:bg-muted/50"
//             onClick={() => console.log(island.name)}
//           >
//             <TableCell>{index + 1}</TableCell>
//             <TableCell>{island.name}</TableCell>
//             <TableCell>{island.latitude.toFixed(6)}</TableCell>
//             <TableCell>{island.longitude.toFixed(6)}</TableCell>
//             <TableCell>{island.islandType}</TableCell>
//             <TableCell>{island.atoll || "N/A"}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }
//
