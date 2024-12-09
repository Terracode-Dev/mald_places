import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServiceCategoryCard } from "@/components/default/ServiceCategoryCard";
//import { AddCategoryForm } from "@/components/default/AddCategoryForm";
import { AddServiceForm } from "@/components/default/AddServiceForm";
import { addSingleDocument, getDocumentsByCriteria } from "../../firebase";
import { useNavigate } from "react-router-dom";

export interface ServiceCategory {
  address: string;
  company: string;
  email: string;
  id: string;
  island_no: string;
  keyword: string;
  service: string;
}

export const mockServiceCategories: ServiceCategory[] = [
  {
    address: "123 Palm Street, Atoll City",
    company: "Island Logistics",
    email: "contact@islandlogistics.com",
    id: "1",
    island_no: "1001",
    keyword: "delivery",
    service: "Logistics and Delivery",
  },
  {
    address: "456 Coral Lane, Ocean Town",
    company: "Seaside Resorts",
    email: "info@seasideresorts.com",
    id: "2",
    island_no: "1002",
    keyword: "hospitality",
    service: "Resort Management",
  },
  {
    address: "789 Lagoon Drive, Reef City",
    company: "Marine Adventures",
    email: "support@marineadventures.com",
    id: "3",
    island_no: "1003",
    keyword: "tourism",
    service: "Snorkeling and Diving",
  },
  {
    address: "321 Harbor Avenue, Port Island",
    company: "Island Grocers",
    email: "hello@islandgrocers.com",
    id: "4",
    island_no: "1004",
    keyword: "retail",
    service: "Grocery Supplies",
  },
  {
    address: "654 Cove Road, Sunset Bay",
    company: "Tropical Health",
    email: "care@tropicalhealth.com",
    id: "5",
    island_no: "1005",
    keyword: "healthcare",
    service: "Healthcare Services",
  },
];

export interface Service {
  id: string;
  Name: string;
  address: string;
  description: string;
  email: string;
  website: string;
  phoneNumber: string;
  island_no: string;
  category: string;
}

// const getServiceCategories = async (id: string) => {
//   const data = await getDocumentsByCriteria<ServiceCategory[]>("island_services", { "island_no": id })
//   return data.flat()
// }

export function IslandDetails() {
  const { islandName } = useParams<{ islandName: string }>();
  const [isname, isno] = islandName.split("_");
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [categoriesLBL, setCategoriesLBL] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      if (isname) {
        let lbl = await getDocumentsByCriteria("island_services", {
          island_no: parseInt(isno, 10),
        });
        const unqctgs = [...new Set(lbl.map((ctg) => ctg.service))];
        console.log("islands", lbl);
        setCategories(lbl);
        setCategoriesLBL(unqctgs);
        setLoading(false);
      }
    };
    fetchCategories();
  }, [islandName]);

  // useEffect(() => {
  //   const filtered = categories.filter((category) =>
  //     category.service.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );
  //   setFilteredCategories(filtered);
  // }, [categories, searchQuery]);

  // const handleAddCategory = (data: ServiceCategory) => {
  //   addSingleDocument("island_services", data);
  //   setCategories((prev) => [...prev, data]);
  //   setIsAddCategoryOpen(false);
  // };

  const handleAddService = (data: Service) => {
    addSingleDocument("island_services", data);
    setIsAddServiceOpen(false);
    // Optionally, you can refresh the services list here
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">{isname} Island Services: </h1>
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="space-x-2">
          {/* <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <AddCategoryForm onSubmit={handleAddCategory} />
            </DialogContent>
          </Dialog> */}
          <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
            <DialogTrigger asChild>
              <Button>Add Service</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[570px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{`Add New Service in ${isname}`} </DialogTitle>
              </DialogHeader>
              <AddServiceForm onSubmit={handleAddService} islandNo={isno} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-10">Loading Services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesLBL.map((category, idx) => (
            <ServiceCategoryCard
              key={idx}
              category={category}
              onClick={() =>
                navigate(`/island/${isname}/${categories[idx].id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { ServiceCategoryCard } from "@/components/default/ServiceCategoryCard"
// import { AddCategoryForm } from "@/components/default/AddCategoryForm"
// import { AddServiceForm } from "@/components/default/AddServiceForm"
// import { addSingleDocument, getDocumentsByCriteria } from "firebase"
// // import { getServiceCategories, addServiceCategory, addService, ServiceCategory } from "@/api/mockApi"
//
//
// export interface ServiceCategory {
//   island_no: string
//   keyword: string
//   service: string
// }
//
// export interface Service {
//   Name: string
//   address: string
//   description: string
//   email: string
//   website: string
//   phoneNumber: string
//   island_no: string
//   category: string
// }
//
// const getServiceCategories = async (id: string) => {
//   const data = getDocumentsByCriteria<ServiceCategory[]>("island_services", { "island_no": id })
//   return data
//
// }
//
// export function IslandDetails() {
//   const { id } = useParams<{ id: string }>()
//   const [categories, setCategories] = useState<ServiceCategory[]>([])
//   const [filteredCategories, setFilteredCategories] = useState<ServiceCategory[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
//   const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
//
//   useEffect(() => {
//     setCategories(await getServiceCategories(id))
//   }, [])
//
//   useEffect(() => {
//     const filtered = categories.filter(category =>
//       category.service.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     setFilteredCategories(filtered)
//   }, [categories, searchQuery])
//
//   const handleAddCategory = async (data: ServiceCategory) => {
//     await addSingleDocument("island_services", data)
//     setCategories(prev => [...prev, data])
//     setIsAddCategoryOpen(false)
//   }
//
//   const handleAddService = async (data: Service) => {
//     await addSingleDocument("services", data)
//     setIsAddServiceOpen(false)
//     // Optionally, you can refresh the services list here
//   }
//
//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-2xl font-bold mb-6">Island Details: {id}</h1>
//       <div className="flex justify-between items-center mb-6">
//         <Input
//           placeholder="Search categories..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="max-w-sm"
//         />
//         <div className="space-x-2">
//           <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
//             <DialogTrigger asChild>
//               <Button>Add Category</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add New Category</DialogTitle>
//               </DialogHeader>
//               <AddCategoryForm onSubmit={handleAddCategory} />
//             </DialogContent>
//           </Dialog>
//           <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
//             <DialogTrigger asChild>
//               <Button>Add Service</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add New Service</DialogTitle>
//               </DialogHeader>
//               <AddServiceForm onSubmit={handleAddService} />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredCategories.map((category, idx) => (
//           <ServiceCategoryCard
//             key={idx}
//             category={category}
//             onClick={() => console.log(`Clicked category: ${category.service}`)}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
//
