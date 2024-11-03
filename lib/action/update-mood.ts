'use server'

import Mood from "@/model/Mood"
import connectDB from "../db"
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


// Define the Zod schema for validation
const MoodSchema = z.object({
    note: z.string().min(2, "Note must be at least 2 characters long"),
    mood: z.string().min(1, "Mood cannot be empty"), // Optional: Ensure mood is not empty
});

export const updateMood = async (prevState: any, formData: FormData) => {

        const validatedFields = MoodSchema.safeParse(
            Object.fromEntries(formData.entries())
          );
        
          if (!validatedFields.success) {
            return {
              Error: validatedFields.error.flatten().fieldErrors,
            };
          }

    await connectDB()
    try {
        await connectDB();
        const note = formData.get('note') as string;
        const moodValue = formData.get('mood') as string;
        const id = formData.get('_id') as string; // You might need to include this in your form data

        // Update the mood in the database
        await Mood.updateOne({ _id: id }, { note, mood: moodValue });
    } catch (error) {
        console.log("Error " + error)
    }
    revalidatePath("/")
    redirect("/")
}

