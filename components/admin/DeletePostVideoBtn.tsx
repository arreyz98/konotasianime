import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteVideoPost } from "@/lib/actions";

const DeletePostVideoBtn = ({id } : {id : string}) => {
    const deletePostWithId = deleteVideoPost.bind(null,id)
    return(
           <form onSubmit={deletePostWithId}> 
                      <Button className="bg-[#25388C] cursor-pointer" >
                       <Trash2 />
                    </Button>
            </form>
    )
}

export default DeletePostVideoBtn;