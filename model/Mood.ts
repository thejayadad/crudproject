import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Mood document
interface IMood extends Document {
    note: string;
    mood: string;
    createdAt: Date;
}

// Create the schema for the Mood model
const MoodSchema: Schema = new Schema({
    note: { type: String, required: true },
    mood: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Check if the model already exists
const Mood = mongoose.models.Mood || mongoose.model<IMood>('Mood', MoodSchema);

export default Mood;
