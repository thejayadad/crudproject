'use server';

import Mood from "@/model/Mood"; // Import the Mood model
import connectDB from "../db";
import { revalidatePath } from "next/cache";

const deleteMood = async (prevState: any, formData: FormData) => {
    try {
        await connectDB();
        const id = formData.get('id') as string; // Get the ID from the form data
        
        if (!id) {
            throw new Error("ID is required to delete a mood");
        }

        const result = await Mood.findByIdAndDelete(id); // Delete the mood document by ID
        
        if (!result) {
            throw new Error("Mood not found");
        }
    } catch (error) {
        console.log("Error deleting mood: ", error);
    }
    revalidatePath("/")
};

export { deleteMood };
