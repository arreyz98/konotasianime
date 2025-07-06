// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
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
import DataNotFound from "./DataNotFound";
import { getGenres, getUsers } from "@/lib/data";

const AdminTables = async() => {
    const users = await getUsers() 
    const test = await getGenres()
    console.log(test);
    return(
        <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        {!users?.length ? (
        <DataNotFound />
        )
    :
    (
        <Table>
          <TableHeader className="bg-[#25388C] text-white font-bold">
            <TableRow className="hover:bg-[#25388C] hover:text-white">
              <TableHead className="text-md font-bold pl-4">No</TableHead>
              <TableHead className="text-md font-bold pl-4">Nama</TableHead>
              <TableHead className="text-md font-bold">Email</TableHead>
              <TableHead className="text-md font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-md">
            {users.map((user, index) => (
              <TableRow key={user.id} className="odd:bg-muted/50">
                <TableCell className="pl-4">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex flex-row">
                  <Button className="bg-[#25388C]" asChild>
                      <Link href={"/post/judul-post"}><Eye /></Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    )
    }  
      </div>

      {/* <Pagination className="mt-4">
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
      </Pagination> */}
    </div>
    )
}

export default AdminTables ;