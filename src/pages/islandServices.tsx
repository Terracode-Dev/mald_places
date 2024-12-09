import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { getDocumentsByCriteria } from "../../firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ServiceDetailsDialog } from "@/components/default/ServicesDetailsDialog";
import { Service } from "./islandDetails";

// const servicesdata: Service[] = [
//   {
//     id: "1",
//     Name: "Sunset Beach Resort",
//     address: "123 Palm Street, Tropical Island",
//     description: "Luxurious beachfront resort with stunning sunset views",
//     email: "info@sunsetbeachresort.com",
//     website: "https://www.sunsetbeachresort.com",
//     phoneNumber: "+1 (555) 123-4567",
//     island_no: "1",
//     category: "Accommodation",
//   },
//   {
//     id: "2",
//     Name: "Ocean Adventures",
//     address: "456 Marina Drive, Tropical Island",
//     description: "Exciting water sports and diving experiences",
//     email: "bookings@oceanadventures.com",
//     website: "https://www.oceanadventures.com",
//     phoneNumber: "+1 (555) 987-6543",
//     island_no: "1",
//     category: "Marine Activities",
//   },
//   {
//     id: "3",
//     Name: "Island Flavors Restaurant",
//     address: "789 Coconut Lane, Tropical Island",
//     description: "Authentic local cuisine with a modern twist",
//     email: "reservations@islandflavors.com",
//     website: "https://www.islandflavors.com",
//     phoneNumber: "+1 (555) 246-8135",
//     island_no: "1",
//     category: "Dining",
//   },
//   {
//     id: "4",
//     Name: "Tropical Tours",
//     address: "101 Jungle Road, Tropical Island",
//     description: "Guided tours showcasing the island's natural beauty",
//     email: "info@tropicaltours.com",
//     website: "https://www.tropicaltours.com",
//     phoneNumber: "+1 (555) 369-2580",
//     island_no: "1",
//     category: "Tours",
//   },
//   {
//     id: "5",
//     Name: "Beachside Spa",
//     address: "202 Relaxation Avenue, Tropical Island",
//     description: "Rejuvenating spa treatments with ocean views",
//     email: "appointments@beachsidespa.com",
//     website: "https://www.beachsidespa.com",
//     phoneNumber: "+1 (555) 147-2589",
//     island_no: "1",
//     category: "Beach Activities",
//   },
// ];

export function IslandServices() {
  const { islandNo, ctg } = useParams<{
    islandNo: string;
    ctg: string;
  }>();
  console.log("ISLNO", islandNo);
  console.log("ctg", ctg);
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<any[]>([]); // Initial state set here

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // const filtered = services.filter(
    //   (service) =>
    //     service.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     service.description.toLowerCase().includes(searchQuery.toLowerCase()),
    // );
    const fetchSVCS = async () => {
      const svcs = await getDocumentsByCriteria("island_services", {
        island_no: islandNo,
        service: ctg?.replace(/_/g, " "),
      });
      console.log("SVCs", svcs);
      setServices(svcs);
      setLoading(false);
    };
    fetchSVCS();
  }, [islandNo, searchQuery]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        {ctg?.replace(/_/g, " ")} Services
      </h1>
      <Input
        placeholder="Search services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm mb-6"
      />
      {loading ? (
        <div className="text-center py-10">Loading Providers...</div>
      ) : (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow
                key={service.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleServiceClick(service)}
              >
                <TableCell>{service.company}</TableCell>
                <TableCell>{service.address}</TableCell>
                <TableCell>{service.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <ServiceDetailsDialog
        service={selectedService}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
