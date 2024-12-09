import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Building } from "lucide-react";

interface ServiceCategoryCardProps {
  category: string;
  onClick: () => void;
}

export function ServiceCategoryCard({
  category,
  onClick,
}: ServiceCategoryCardProps) {
  return (
    <Card
      className="cursor-pointer hover:bg-muted/50 w-full h-full aspect-square flex items-center justify-center"
      onClick={onClick}
    >
      <CardHeader className="flex flex-col items-center justify-between space-y-5 pb-2">
        <Building className="h-10 w-10 text-muted-foreground" />
        <CardTitle className="text-sm font-medium">{category}</CardTitle>
      </CardHeader>
    </Card>
  );
}
