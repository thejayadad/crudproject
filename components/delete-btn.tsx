'use client';
import { FiTrash } from "react-icons/fi";
import { useActionState } from "react";
import { deleteMood } from "@/lib/action/delete-mood";


interface DeleteButtonProps {
    id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const [state, formAction] = useActionState(deleteMood, null); // Use deleteMood action

 

    return (
        <form action={formAction}>

            <button type="submit" className="text-red-500 cursor-pointer hover:text-red-700">
               <input id="id" name="id" defaultValue={id} hidden />
                <FiTrash />
            </button>
        </form>
    );
};

export default DeleteButton;
