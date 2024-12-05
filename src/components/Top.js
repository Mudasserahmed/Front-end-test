import React from 'react'

const Top = () => {
    return (
        <div className="relative">
            <img 
                className="h-72 w-full object-fill  rounded-2xl opacity-30" 
                src="https://thumbs.dreamstime.com/b/selection-different-pizzas-black-background-ingredients-peperoni-vegetarian-seafood-pizza-selection-different-123061977.jpg" 
                alt="Image" 
            />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div>
                    <h1 className="text-3xl font-bold text-black">Optimize Your Meal</h1>
                    <p className="mt-2 text-black">Select Meal to add in a week. You will be able to edit, modify and change the meal weeks.</p>
                </div>
            </div>
        </div>
    )
}

export default Top
