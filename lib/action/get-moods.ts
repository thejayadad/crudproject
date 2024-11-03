'use server'

import Mood from "@/model/Mood";
import connectDB from "../db";

export const getMoods = async () => {
    try {
        await connectDB();
        const moods = await Mood.find({});
        return JSON.parse(JSON.stringify(moods)); // Ensure this returns an array of moods
    } catch (error) {
        console.log("Error retrieving moods: ", error);
        return []; // Return an empty array in case of error
    }
};
