import { useEffect, useState } from "react";
import { SearchBar } from "@/components/default/SearchBar";
import { AddIslandButton } from "@/components/default/AddIslandBtn";
import ExcelImporter from "@/utils/exceluploader";
import { IslandTable } from "@/components/default/IslandTable";
import { Island } from "@/schema/island";
import { getAllDocuments, addSingleDocument } from "../../firebase"; // Adjust the path based on your project structure

export function IslandManagement() {
  const [islands, setIslands] = useState<Island[]>([]);
  const [filteredIslands, setFilteredIslands] = useState<Island[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIslands = async () => {
      try {
        setLoading(true);
        const fetchedIslands = await getAllDocuments<Island[]>("islands"); // Replace "all" with your document ID or logic
        console.log(fetchedIslands);
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

  const handleSearch = (query: string) => {
    const filtered = islands.filter((island) => {
      return (
        (island.Name?.toLowerCase() || "").includes(query.toLowerCase()) ||
        (island.IslandType?.toLowerCase() || "").includes(
          query.toLowerCase(),
        ) ||
        (island.Atoll?.toLowerCase() || "").includes(query.toLowerCase())
      );
    });

    setFilteredIslands(filtered);
  };

  const handleAddIsland = async (newIsland: Island) => {
    try {
      const newDocId = await addSingleDocument("islands", newIsland);
      const addedIsland = { ...newIsland, id: newDocId };

      setIslands((prevIslands) => [...prevIslands, addedIsland]);
      setFilteredIslands((prevFiltered) => [...prevFiltered, addedIsland]);
    } catch (error) {
      console.error("Error adding island:", error);
      // Optionally handle error
    }
  };

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Island List</h1>
      <div className="flex justify-between items-center mb-6">
        <SearchBar onSearch={handleSearch} />
        <div className="flex gap-2">
          <ExcelImporter />
          <AddIslandButton onIslandAdded={handleAddIsland} />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading islands...</div>
      ) : (
        <IslandTable
          islands={filteredIslands.length > 0 ? filteredIslands : islands}
        />
      )}
    </div>
  );
}
