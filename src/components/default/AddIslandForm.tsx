import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { islandSchema, Island } from "@/schema/island"

interface AddIslandFormProps {
  onSubmit: (data: Island) => void
}

export function AddIslandForm({ onSubmit }: AddIslandFormProps) {
  const form = useForm<Island>({
    resolver: zodResolver(islandSchema),
    defaultValues: {
      name: "",
      latitude: "",
      longitude: "",
      islandType: "",
      atoll: "",
    },
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Island name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder={`N 0 00' 10"`}  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input placeholder={`E 0 00' 10"`}  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField */}
          {/*   control={form.control} */}
          {/*   name="islandType" */}
          {/*   render={({ field }) => ( */}
          {/*     <FormItem> */}
          {/*       <FormLabel>Island Type</FormLabel> */}
          {/*       <Select onValueChange={field.onChange} defaultValue={field.value}> */}
          {/*         <FormControl> */}
          {/*           <SelectTrigger> */}
          {/*             <SelectValue placeholder="Select island type" /> */}
          {/*           </SelectTrigger> */}
          {/*         </FormControl> */}
          {/*         <SelectContent> */}
          {/*           <SelectItem value="volcanic">Volcanic</SelectItem> */}
          {/*           <SelectItem value="coral">Coral</SelectItem> */}
          {/*           <SelectItem value="continental">Continental</SelectItem> */}
          {/*         </SelectContent> */}
          {/*       </Select> */}
          {/*       <FormMessage /> */}
          {/*     </FormItem> */}
          {/*   )} */}
          {/* /> */}
          <FormField
            control={form.control}
            name="islandType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Island Type</FormLabel>
                <FormControl>
                  <Input placeholder="Island Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="atoll"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Atoll</FormLabel>
                <FormControl>
                  <Input placeholder="Atoll name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Island</Button>
        </form>
      </Form>
    </>
  )
}

