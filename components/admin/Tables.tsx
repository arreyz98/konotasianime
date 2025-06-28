import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";


const products = [
  {
    id: 1,
    name: "Apocalypse Hotel",
    category: "Arreyz",
    price: "2025-05-25",
    eps : 8
  },
  {
    id: 2,
    name: "Aharen-san wa Hakarenai Season 2",
    category: "Arreyz",
    price: "2025-05-25",
     eps : 6
  },
  {
    id: 3,
    name: "Mobile Suit Gundam: GQuuuuuuX",
    category: "Arreyz",
    price: "2025-05-25",
     eps : 2
  },
  {
    id: 4,
    name: "The Mononoke Lecture Logs of Chuzenji-sensei: He Just Solves All the Mysteries",
    category: "Arreyz",
    price: "2025-05-25",
    eps : 2
  },
  {
    id: 5,
    name: "The Too-Perfect Saint: Tossed Aside by My Fiancé and Sold to Another Kingdom",
    category: "Arreyz",
    price: "2025-05-25",
    eps : 5
  },
];

const Tables = () => {
    return(
        <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-[#25388C] text-white font-bold">
            <TableRow className="hover:bg-[#25388C] hover:text-white">
              <TableHead className="text-md font-bold pl-4">No</TableHead>
              <TableHead className="text-md font-bold">Title</TableHead>
              <TableHead className="text-md font-bold">Eps</TableHead>
              <TableHead className="text-md font-bold">Pembuat</TableHead>
              <TableHead className="text-md font-bold">Tgl Dibuat</TableHead>
              <TableHead className="text-md font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-md">
            {products.map((product) => (
              <TableRow key={product.id} className="odd:bg-muted/50">
                <TableCell className="pl-4">{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.eps}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="flex flex-row">
                  <Button className="bg-[#25388C]" asChild>
                      <Link href={"/post/judul-post"}><Eye /></Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    )
}

export default Tables ;