import * as z from "zod"

export const islandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  latitude: z.string(),
  longitude: z.string(),
  islandType: z.string().min(1, "Island type is required"),
  atoll: z.string().optional(),
})

export type Island = z.infer<typeof islandSchema>

