import * as z from "zod"

export const islandSchema = z.object({
  No: z.number(),
  Name: z.string().min(1, "Name is required"),
  Latitude: z.string(),
  Longitude: z.string(),
  IslandType: z.string().min(1, "Island type is required"),
  Atoll: z.string().optional(),
})

export type Island = z.infer<typeof islandSchema>

