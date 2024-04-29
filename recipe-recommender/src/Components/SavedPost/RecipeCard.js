import React from 'react';

const RecipeCard = ({ recipes }) => {
  // Helper function to format instructions by removing numbers and adding bullet points
  const formatInstructions = (instructions) => {
    // Split instructions by detecting periods followed by spaces, or new lines
    return instructions.split(/(?<=\.)\s+|\n/).map((step, index) => {
      // Remove leading numbers and trim whitespace
      const cleanStep = step.replace(/^\d+\.\s*/, '').trim();
      if(cleanStep === '') return null; // Skip empty steps that may arise
      return <div key={index}>• {cleanStep}</div>;
    });
  };

  return (
    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
          <div className="p-5 flex flex-col flex-1 justify-start">
            <dl>
              <dt className="text-lg font-medium text-gray-700 truncate">{recipe.name}</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Ingredients: {recipe.ingredients.join(', ')}
              </dd>
              <dd className="mt-2 text-sm text-gray-500">
                Instructions:
                <div className="ml-2">{formatInstructions(recipe.instructions)}</div>
              </dd>
            </dl>
          </div>
          <div className="bg-gray-50 px-5 py-3 mt-auto text-sm font-medium text-teal-700">
            Calories: {recipe.calories}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeCard;
