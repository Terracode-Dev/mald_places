import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddIslandForm } from "./AddIslandForm";
import { Island } from "@/schema/island";
import { ExcelFileUploader } from "./ExcelUploader";

// interface AddIslandButtonProps {
//   onIslandAdded: (island: Island) => void
// }
//
// export function AddIslandButton({ onIslandAdded }: AddIslandButtonProps) {
//   const [open, setOpen] = useState(false)
//
//   const handleIslandAdded = (island: Island) => {
//     onIslandAdded(island)
//     setOpen(false)
//   }
//
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>Add Island</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[570px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Add New Island</DialogTitle>
//         </DialogHeader>
//         <AddIslandForm onSubmit={handleIslandAdded} />
//         <ExcelFileUploader />
//       </DialogContent>
//     </Dialog>
//   )
// }

interface AddIslandButtonProps {
  onIslandAdded: (island: Island) => void;
}

export function AddIslandButton({ onIslandAdded }: AddIslandButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (data: Island) => {
    try {
      setIsAdding(true);
      onIslandAdded(data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding island:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Island</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[570px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Island</DialogTitle>
        </DialogHeader>
        <AddIslandForm onSubmit={handleSubmit} />

        {isAdding && (
          <div className="flex justify-center items-center">
            sending data ...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
