import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Service } from "@/pages/islandDetails"

interface ServiceDetailsDialogProps {
  service: Service | null
  isOpen: boolean
  onClose: () => void
}

export function ServiceDetailsDialog({ service, isOpen, onClose }: ServiceDetailsDialogProps) {
  if (!service) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{service.Name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-medium">Address</h3>
            <p>{service.address}</p>
          </div>
          <div>
            <h3 className="font-medium">Description</h3>
            <p>{service.description}</p>
          </div>
          <div>
            <h3 className="font-medium">Contact Information</h3>
            <p>Email: {service.email}</p>
            <p>Phone: {service.phoneNumber}</p>
            <p>Website: <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{service.website}</a></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

