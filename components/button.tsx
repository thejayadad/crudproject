'use client'
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteMood } from "@/lib/action/delete-mood";
import { FiTrash } from "react-icons/fi";


export const SubmitButton = ({label}: {label: string}) => {
    const { pending } = useFormStatus();
    const className = clsx(
        "text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
        {
          "opacity-50 cursor-progress": pending,
        }
      );

    return (
        <button
        type="submit"
        className={className}
        disabled={pending}
        >
        {label === "Add Mood" ? (
            <span>{pending ? "Saving One Moment..." : "Save"}</span>
          ) : (
            <span>{pending ? "Updating One Moment..." : "Update"}</span>
          )}
        </button>
    )
}
