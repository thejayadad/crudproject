import { useActionState } from "react";
import { SubmitButton } from "./button";
import { addMood } from "@/lib/action/add-mood";
import { updateMood } from "@/lib/action/update-mood";

interface MoodFormProps {
    mood?: { _id: string; note: string; mood: string }; // Optional prop for editing
    isEdit?: boolean; // Flag to indicate if it's an edit operation
}

export function MoodForm({ mood, isEdit = false }: MoodFormProps) {
    const [state, formAction] = useActionState(isEdit ? updateMood : addMood, null);

    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="_id" value={isEdit ? mood?._id : ''} />
                <label htmlFor="note" className="block text-sm font-medium text-gray-900">
                    Add Note
                </label>
                <input
                    type="text"
                    name="note"
                    id="note"
                    defaultValue={isEdit ? mood?.note : ''} // Pre-fill if in edit mode
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5"
                    placeholder="Note..."
                />
                <div id="note-error" aria-live="polite" aria-atomic="true">
                    <p className="mt-2 text-sm text-red-500">{state?.Error?.note}</p>
                </div>
                
                <label htmlFor="mood" className="block text-sm font-medium text-gray-900">
                    Select Mood
                </label>
                <select
                    name="mood"
                    id="mood"
                    defaultValue={isEdit ? mood?.mood : 'happy'} // Pre-fill if in edit mode
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5"
                >
                    <option value="happy">Happy 😊</option>
                    <option value="sad">Sad 😢</option>
                    <option value="angry">Angry 😠</option>
                    <option value="indifferent">Indifferent 😐</option>
                    <option value="scared">Scared 😱</option>
                </select>
                <div id="mood-error" aria-live="polite" aria-atomic="true">
                    <p className="mt-2 text-sm text-red-500">{state?.Error?.mood}</p>
                </div>

                <SubmitButton label={isEdit ? "Update Mood" : "Add Mood"} />
            </form>
        </div>
    );
}
