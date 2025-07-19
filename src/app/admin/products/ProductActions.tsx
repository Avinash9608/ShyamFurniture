
"use client"

import Link from "next/link"
import { File, ListFilter, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProductActions({ products }: { products: any[] }) {

  const handleExport = () => {
    const headers = [
      "ID", "Name", "Category", "Price", "Discount Price",
      "Images", "Description", "Features", "Length", "Width",
      "Height", "Availability", "Customizable", "Delivery Info",
      "Rating", "Reviews Count", "Created At", "Updated At"
    ];

    const rows = products.map(p => [
      p._id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category.replace(/"/g, '""')}"`,
      p.price,
      p.discountPrice || "",
      `"${(p.images || []).join(', ')}"`,
      `"${p.description.replace(/"/g, '""')}"`,
      `"${(p.features || []).join(', ')}"`,
      p.dimensions?.length || "",
      p.dimensions?.width || "",
      p.dimensions?.height || "",
      p.availability,
      p.customizable,
      `"${(p.deliveryInfo || "").replace(/"/g, '""')}"`,
      p.rating,
      p.reviewsCount,
      new Date(p.createdAt).toISOString(),
      new Date(p.updatedAt).toISOString()
    ].join(','));
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ml-auto flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filter
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>
            Active
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Archived
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Export
        </span>
      </Button>
      <Button size="sm" className="h-8 gap-1" asChild>
        <Link href="/admin/products/new">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Link>
      </Button>
    </div>
  )
}
