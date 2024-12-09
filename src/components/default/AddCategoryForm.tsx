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

import { type LucideIcon, icons } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.string().min(1, "Icon is required"),
});

interface AddCategoryFormProps {
  onSubmit: (data: { name: string; icon: LucideIcon }) => void;
}

export function AddCategoryForm({ onSubmit }: AddCategoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      name: values.name,
      icon: icons[values.icon as keyof typeof icons],
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField */}
        {/*   control={form.control} */}
        {/*   name="icon" */}
        {/*   render={({ field }) => ( */}
        {/*     <FormItem> */}
        {/*       <FormLabel>Icon</FormLabel> */}
        {/*       <Select onValueChange={field.onChange} defaultValue={field.value}> */}
        {/*         <FormControl> */}
        {/*           <SelectTrigger> */}
        {/*             <SelectValue placeholder="Select an icon" /> */}
        {/*           </SelectTrigger> */}
        {/*         </FormControl> */}
        {/*         <SelectContent> */}
        {/*           {Object.keys(icons).map((iconName) => ( */}
        {/*             <SelectItem key={iconName} value={iconName}> */}
        {/*               {iconName} */}
        {/*             </SelectItem> */}
        {/*           ))} */}
        {/*         </SelectContent> */}
        {/*       </Select> */}
        {/*       <FormMessage /> */}
        {/*     </FormItem> */}
        {/*   )} */}
        {/* /> */}
        <Button type="submit">Add Category</Button>
      </form>
    </Form>
  );
}
