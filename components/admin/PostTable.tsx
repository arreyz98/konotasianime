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
import {FileVideo, Eye, Pencil} from "lucide-react";
import DataNotFound from "./DataNotFound";
import { formatDate } from "@/lib/utils";
import { getPosts } from "@/lib/data";
import DeletePostBtn from "./DeletePostBtn";


const PostTable = async({query, currentPage} : {query : string , currentPage : number}) => {
  const posts =  await getPosts(query,currentPage)


    return(
        <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        {!posts?.length ? (
          <DataNotFound/>
        ) :
        (
          <Table>
          <TableHeader className="bg-[#25388C] text-white font-bold">
            <TableRow className="hover:bg-[#25388C] hover:text-white">
              <TableHead className="text-md font-bold pl-4">No</TableHead>
              <TableHead className="text-md font-bold">Title</TableHead>
              <TableHead className="text-md font-bold">Pembuat</TableHead>
              <TableHead className="text-md font-bold">Tgl Dibuat</TableHead>
              <TableHead className="text-md font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-md">
            {posts?.map((post , index) => (
              <TableRow key={post.id} className="odd:bg-muted/50">
                <TableCell className="pl-4">{index + 1}</TableCell>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.user.name}</TableCell>
                <TableCell>{formatDate(post.createdAt.toString())}</TableCell>
                <TableCell className="flex flex-row space-x-2">
                  <Button className="bg-[#25388C]" asChild>
                      <Link href={`/admin/post-video/${post.id}`}><FileVideo /></Link>
                  </Button>
                  <Button className="bg-[#25388C]" asChild>
                      <Link href={`/post/judul-post`}><Eye /></Link>
                  </Button>
                  <Button className="bg-[#25388C]" asChild>
                      <Link href={`/admin/posts/update/${post.id}`}><Pencil /></Link>
                  </Button>
                  <DeletePostBtn id={post.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </div>

    </div>
    )
}

export default PostTable ;