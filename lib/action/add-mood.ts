'use server'

import { z } from "zod";
import connectDB from "../db";
import Mood from "@/model/Mood";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Define the Zod schema for validation
const MoodSchema = z.object({
    note: z.string().min(2, "Note must be at least 2 characters long"),
    mood: z.string().min(1, "Mood cannot be empty"), // Optional: Ensure mood is not empty
});

// Function to add a new mood
export const addMood = async (prevSate: any, formData: FormData) => {
   // Extract note and mood from formData
   const validatedFields = MoodSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
    const note = formData.get('note') as string;
    const mood = formData.get('mood') as string;
    await connectDB();

    // Validate the input data with Zod
    try {
        const validatedData = MoodSchema.parse({ note, mood });
        
        // Create a new mood entry in the database
        const newMood = await Mood.create({
            note: validatedData.note,
            mood: validatedData.mood,
       });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            console.error("Validation Error:", error.errors);
            throw new Error("Validation failed. Check the input data.");
        }
        console.error("Error creating mood:", error);
        throw new Error("Error creating mood. Please try again.");
    }
    revalidatePath("/");
    redirect("/");
};
