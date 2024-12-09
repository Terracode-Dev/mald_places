import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Service } from "@/pages/islandDetails";
// import { Service } from "@/pages/islandDetails"

const formSchema = z.object({
  id: z.string(),
  Name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid URL"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  island_no: z.number().int().min(1, "Island number is required"),
  category: z.string().min(1, "service Category is required"),
});

interface AddServiceFormProps {
  onSubmit: (data: Service) => void;
  islandNo: string | number;
}

export function AddServiceForm({ onSubmit, islandNo }: AddServiceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      Name: "",
      description: "",
      address: "",
      email: "",
      website: "",
      phoneNumber: "",
      island_no: "1",
      category: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter service name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter service description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter service address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Enter website URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="island_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Island Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="island number"
                  {...field}
                  defaultValue={islandNo}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter service category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Service</Button>
      </form>
    </Form>
  );
}

// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
//
// const formSchema = z.object({
//   name: z.string().min(1, "Service name is required"),
//   description: z.string().min(1, "Description is required"),
//   owner: z.string().min(1, "Owner name is required"),
//   website: z.string().url("Invalid URL"),
//   phoneNumber: z.string().min(1, "Phone number is required"),
// })
//
// interface AddServiceFormProps {
//   onSubmit: (data: z.infer<typeof formSchema>) => void
// }
//
// export function AddServiceForm({ onSubmit }: AddServiceFormProps) {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       owner: "",
//       website: "",
//       phoneNumber: "",
//     },
//   })
//
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Service Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter service name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea placeholder="Enter service description" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="owner"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Owner</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter owner name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="website"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Website</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter website URL" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="phoneNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Phone Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter phone number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Add Service</Button>
//       </form>
//     </Form>
//   )
// }
//
