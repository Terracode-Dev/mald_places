import { useEffect, useState } from "react";
import { SearchBar } from "@/components/default/SearchBar";
import { AddIslandButton } from "@/components/default/AddIslandBtn";
import { IslandTable } from "@/components/default/IslandTable";
import { Island } from "@/schema/island";
import { getAllDocuments } from "../../firebase"; // Adjust the path based on your project structure



export function IslandManagement() {
  const [islands, setIslands] = useState<Island[]>([]);
  const [filteredIslands, setFilteredIslands] = useState<Island[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIslands = async () => {
      try {
        setLoading(true);
        const fetchedIslands = await getAllDocuments<Island[]>("test"); // Replace "all" with your document ID or logic
        console.log(fetchedIslands)
        if (fetchedIslands) {
          setIslands(fetchedIslands.flat());
          setFilteredIslands(fetchedIslands.flat());
        }
      } catch (err) {
        console.error("Error fetching islands:", err);
        setError("Failed to load islands. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchIslands();
  }, []);

  // const handleSearch = (query: string) => {
  //   const filtered = islands.filter(island =>
  //     island.Name.toLowerCase().includes(query.toLowerCase()) ||
  //     island.IslandType.toLowerCase().includes(query.toLowerCase()) ||
  //     (island.Atoll && island.Atoll.toLowerCase().includes(query.toLowerCase()))
  //   );
  //   setFilteredIslands(filtered);
  // };

  const handleSearch = (query: string) => {

    const filtered = islands.filter(island => {
      return (
        (island.Name?.toLowerCase() || "").includes(query.toLowerCase()) ||
        (island.IslandType?.toLowerCase() || "").includes(query.toLowerCase()) ||
        (island.Atoll?.toLowerCase() || "").includes(query.toLowerCase())
      );
    });

    setFilteredIslands(filtered);
  };

  const handleAddIsland = (newIsland: Island) => {
    setIslands(prevIslands => [...prevIslands, newIsland]);
    setFilteredIslands(prevFiltered => [...prevFiltered, newIsland]);
  };

  if (loading) {
    return <div className="text-center py-10">Loading islands...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Island</h1>
      <div className="flex justify-between items-center mb-6">
        <SearchBar onSearch={handleSearch} />
        <AddIslandButton onIslandAdded={handleAddIsland} />
      </div>
      <IslandTable islands={filteredIslands.length > 0 ? filteredIslands : islands} />
    </div>
  );
}

// import { useState } from "react"
// import { SearchBar } from "@/components/default/SearchBar"
// import { AddIslandButton } from "@/components/default/AddIslandBtn"
// import { IslandTable } from "@/components/default/IslandTable"
// import { Island } from "@/schema/island"
//
// export function IslandManagement() {
//   const [islands, setIslands] = useState<Island[]>([])
//   const [filteredIslands, setFilteredIslands] = useState<Island[]>([])
//
//   const handleSearch = (query: string) => {
//     const filtered = islands.filter(island =>
//       island.name.toLowerCase().includes(query.toLowerCase()) ||
//       island.islandType.toLowerCase().includes(query.toLowerCase()) ||
//       (island.atoll && island.atoll.toLowerCase().includes(query.toLowerCase()))
//     )
//     setFilteredIslands(filtered)
//   }
//
//   const handleAddIsland = (newIsland: Island) => {
//     setIslands(prevIslands => [...prevIslands, newIsland])
//     setFilteredIslands(prevFiltered => [...prevFiltered, newIsland])
//   }
//
//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-2xl font-bold mb-6">Island</h1>
//       <div className="flex justify-between items-center mb-6">
//         <SearchBar onSearch={handleSearch} />
//         <AddIslandButton onIslandAdded={handleAddIsland} />
//       </div>
//       <IslandTable islands={filteredIslands.length > 0 ? filteredIslands : islands} />
//     </div>
//   )
// }
//