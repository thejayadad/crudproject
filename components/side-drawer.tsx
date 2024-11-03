'use client'
import React from 'react';

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode; // Adding children prop
    mood?: { _id: string; note: string; mood: string }; // Optional mood prop for pre-filling

}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, children, mood }) => {
    return (
        <>, 
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={onClose}
                ></div>
            )}
            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl transition-transform transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } z-50`}
            >
                <button onClick={onClose} className="p-4 text-black">
                    Close
                </button>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">Vibe Check</h2>
                    {children} {/* Render the children prop here */}
                </div>
            </div>
        </>
    );
};

export default SideDrawer;
