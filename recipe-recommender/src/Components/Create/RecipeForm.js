import React, { useState } from "react";
import Category from "./Category.js";
import Ingredients from "./Ingredients";
import PictureUpload from "./PictureUpload.js";

const RecipeForm = ({ handleFormSubmit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [calories, setCalories] = useState(0);
  const [foodCategories, setFoodCategories] = useState([]);
  const [usedRecipes, setUsedRecipes] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("")

  const generateRecipe = async () => {
    setLoading(true); // Start loading
    const username = localStorage.getItem('username');
    const ingredientNames = ingredients.map(ingredient => ingredient.name);

    const requestBody = {
      description: description,
      ingredients: ingredientNames,
      username,
      used: []
    };

    try {
      const response = await fetch('/api/recipe/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.success && result.data) {
        const recipeData = JSON.parse(result.data);
        setTitle(recipeData.name);
        setDesc(recipeData.instructions);
        setIngredients(recipeData.ingredients.map(ing => ({ name: ing, isNew: true })));
        setInstructions(recipeData.instructions);
        setCalories(recipeData.calories);
        setFoodCategories(recipeData.foodCategories);
        setCaption("");
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setLoading(false); // End loading
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username'); // Assume username is stored in localStorage
    const ingredientNames = ingredients.map(ingredient => ingredient.name);

    const recipeBody = {
      username,
      name: title,
      ingredients: ingredientNames,
      instructions,
      calories,
      foodCategories
    };

    const postBody = {
      username,
      recipename: title,
      caption
    };

    try {
      // Create the recipe
      console.log('recipeBody:', recipeBody)
      const recipeResponse = await fetch('/api/recipe/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeBody)
      });

      if (!recipeResponse.ok) throw new Error('Failed to create recipe');

      // Create the post
      const postResponse = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
      });

      if (!postResponse.ok) throw new Error('Failed to create post');

      // Redirect to the home page and reload
      window.location.href = "/"; // Redirect to home page

    } catch (error) {
      console.error('Error creating recipe or post:', error);
    }
  };

  return (
    <>
      <div class="md:grid md:grid-cols-2 md:gap-6">
        <div className="md:col-span-1 p-4">
          <div class="mb-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Description
            </h1>
            <textarea
              id="Description"
              name="Description"
              rows={5}
              className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Feel free to provide basic description for your recipe"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* <div class="mb-6">
          <PictureUpload />
          </div> */}
          <Ingredients
            editMode={true}
            recipe={ingredients}
            setIngredients={setIngredients}
          />
          <button
            onClick={generateRecipe}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate Recipe"}
          </button>
        </div>
        <div className="p4">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">Recipe Name</h1>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                    placeholder="Generated recipe name will appear here"
                    value={title}
                    readOnly
                  />
                </div>
              <div>
          
          </div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Instructions
                  </h1>
                  <textarea
                    id="instructions"
                    name="instructions"
                    rows={5}
                    className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Generated instructions will appear here"
                    value={instructions}
                    readOnly
                  />
                </div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Calories
                  </h1>
                  <input
                    type="text"
                    name="calories"
                    id="calories"
                    className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                    placeholder="Calories will be shown here"
                    value={calories}
                    readOnly
                  />
                </div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Food Categories
                  </h1>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="foodCategories"
                      id="foodCategories"
                      className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                      placeholder="Applicable food categories will be listed here"
                      value={foodCategories.join(", ")} // Display categories as a comma-separated list
                      readOnly
                    />
                  </div>
                </div>
                <div class="mb-6">
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Caption
                  </h1>
                  <textarea
                    id="caption"
                    name="caption"
                    rows={3}
                    className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Add a caption for your recipe post"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>

              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecipeForm;
