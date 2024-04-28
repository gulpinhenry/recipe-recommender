import React, { useState, useEffect } from 'react';
import RecipeCard from "./RecipeCard";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const username = localStorage.getItem('username'); // Retrieve the username from local storage
        const response = await fetch(`/api/user/recipes/${username}`); // Adjusted URL for the API request
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        setSavedRecipes(data.data); // Assuming the API returns the array in `data.data`
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch recipes', error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!savedRecipes || savedRecipes.length === 0) {
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          Can not find any recipes, sorry (:
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
          <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
            <span className="inline-block mb-2">Saved Recipes</span>
            <div className="h-1 ml-auto duration-300 origin-left transform bg-teal-600 scale-x-30 group-hover:scale-x-100" />
          </h2>
        </div>
        <RecipeCard recipes={savedRecipes} quickview={false} />
      </div>
    </div>
  );
}

export default SavedRecipes;
