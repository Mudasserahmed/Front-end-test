import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Import FaTrash from react-icons

export const Card = ({ image, name, instructions, cuisine, rating, mealType, isSelected, onDelete }) => {
    return (
        <div className={`max-w-sm w-80 overflow-hidden rounded-lg bg-white shadow-lg flex flex-col justify-between min-h-[400px] relative ${isSelected ? 'border-2 border-black' : ''}`}>
            <span className="absolute top-4 right-4 bg-black text-white text-sm p-1 rounded-lg">{mealType}</span>
            <img className="h-40 w-full object-cover p-3 rounded-2xl" src={image} alt="Image" />
            <div className="p-6 flex-1">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">{name}</h2>
                <p className="text-gray-600 text-sm mb-4">{instructions}</p>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-800">Cuisine: {cuisine}</span>
                    <span className="text-sm font-semibold text-blue-500">Rating: {rating} ★★★★</span>
                </div>
            </div>

            
            {onDelete && (
                <button
                    className="absolute top-4 left-4 bg-red-500 text-white rounded-full p-2"
                    onClick={onDelete} 
                >
                    <FaTrash />
                </button>
            )}
        </div>
    );
};
