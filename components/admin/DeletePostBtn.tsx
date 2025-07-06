import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deletePost } from "@/lib/actions";

const DeletePostBtn = ({id} : {id : string}) => {
    const deletePostWithId = deletePost.bind(null,id)
    return(
           <form onSubmit={deletePostWithId}> 
                      <Button className="bg-[#25388C] cursor-pointer" >
                       <Trash2 />
                    </Button>
            </form>
    )
}

export default DeletePostBtn;