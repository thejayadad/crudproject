'use client';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import SideDrawer from './side-drawer';
import { MoodForm } from './mood-form';

interface UpdateBtnProps {
    mood: { _id: string; note: string; mood: string }; // Define the structure of the mood object
}

const UpdateBtn: React.FC<UpdateBtnProps> = ({ mood }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <div>
            <button onClick={toggleDrawer}>
                <FiEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
            </button>
            <SideDrawer isOpen={isDrawerOpen} onClose={closeDrawer}>
                <MoodForm mood={mood} isEdit={true} /> {/* Pass the mood and edit flag */}
            </SideDrawer>
        </div>
    );
};

export default UpdateBtn;
