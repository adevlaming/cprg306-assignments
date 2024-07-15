"use client"

import { useEffect, useState } from "react";

export default function MealIdeas({ingredient}) {
    const [meals, setMeals] = useState([]);

    async function fetchMealIdeas(ingredient){
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            if(!response.ok){
                console.log(response.status);
            }
            const data = await response.json();
            console.dir(data);
            return data.meals || [];
        } catch (error) {
            console.log(`Error: ${error.message}`);
            return [];
        }
    };

    async function loadMealIdeas(){
        if (ingredient) {
            const fetchedMeals = await fetchMealIdeas(ingredient);
            setMeals(fetchedMeals);
        }
    };

    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);


    return(
        <div className="mx-20, my-10 p-5 text-red-200">
            <h2 className="text-2xl pb-5">Meal Ideas for "{ingredient}"</h2>
            {meals.length === 0 ? (
                <p>No meal ideas found for "{ingredient}".</p>
            ) : (
            <ul>
            {meals.map(meal => (
                <li>  
                <img className="max-h-60 border-2 border-yellow-500" src={meal.strMealThumb} alt={meal.strMeal} />
                    <ul className="pb-5">
                        <li><b>Meal ID:</b> {meal.idMeal}</li>
                        <li><b>Name:</b> {meal.strMeal}</li>
                    </ul>
                </li>
            ))}
            </ul>
            )}
        </div>
    );

}

//bg-slate-800 border border-yellow-500