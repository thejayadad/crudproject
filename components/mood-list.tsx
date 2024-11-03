import React from 'react';
import { getMoods } from '@/lib/action/get-moods';
import UpdateBtn from './update-btn';
import DeleteButton from './delete-btn'; // Import the DeleteButton

const moodEmojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    indifferent: '😐',
    scared: '😱',
};

const MoodList = async () => {
    const moods = await getMoods();

    return (
        <div>
            {moods?.map((mood: { _id: any; mood: any; note: any; }) => {
                return (
                    <div key={mood._id} className="flex justify-between items-center w-full bg-white border rounded p-4 mb-4 transition-transform duration-200 hover:shadow-lg hover:bg-gray-100">
                        <div className="flex items-center">
                            <span className="mr-2 text-2xl">{moodEmojis[mood.mood] || '😶'}</span> {/* Display emoji */}
                            <span>{mood.note}</span>
                        </div>
                        <div className="flex space-x-2">
                            <UpdateBtn mood={mood} /> {/* Pass the plain object to UpdateBtn */}
                            <DeleteButton id={mood._id} /> {/* Use DeleteButton here */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MoodList;
