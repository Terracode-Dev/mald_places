import { useState } from "react"
import { SearchBar } from "@/components/default/SearchBar"
import { AddIslandButton } from "@/components/default/AddIslandBtn"
import { IslandTable } from "@/components/default/IslandTable"
import { Island } from "@/schema/island"

export function IslandManagement() {
  const [islands, setIslands] = useState<Island[]>([])
  const [filteredIslands, setFilteredIslands] = useState<Island[]>([])

  const handleSearch = (query: string) => {
    const filtered = islands.filter(island =>
      island.name.toLowerCase().includes(query.toLowerCase()) ||
      island.islandType.toLowerCase().includes(query.toLowerCase()) ||
      (island.atoll && island.atoll.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredIslands(filtered)
  }

  const handleAddIsland = (newIsland: Island) => {
    setIslands(prevIslands => [...prevIslands, newIsland])
    setFilteredIslands(prevFiltered => [...prevFiltered, newIsland])
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
  )
}

