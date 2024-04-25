import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

const Ingredients = ({ editMode, recipe, setIngredients }) => {
  const textInput = useRef();
  const [inputValue, setInputValue] = useState("");

  // Handle adding a new ingredient
  const handleClick = () => {
    const value = textInput.current.value.trim();
    if (value && !recipe.some(ingredient => ingredient.name === value)) {
      setIngredients(current => [...current, { name: value, isNew: false }]);
      setInputValue("");
    } else if (value) {
      alert("Item already exists");
    }
  };

  // Handle removing an ingredient
  const handleXClick = (ingredientName) => {
    setIngredients(current => current.filter(ingredient => ingredient.name !== ingredientName));
  };

  return (
    <div>
      <div>
        <h1 className="text-lg leading-6 font-medium text-gray-900">Ingredients</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add the necessary ingredients for your recipe.
        </p>
      </div>
      <div>
        <main>
          <section aria-labelledby="filter-heading">
            <div className="bg-gray-50">
              <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Ingredients
                  <span className="sr-only">, active</span>
                </h3>
                <div className="-m-1 flex flex-wrap items-center">
                  {recipe.map((ingredient) => (
                    <span
                      key={ingredient.name}
                      className={`m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium ${ingredient.isNew ? 'bg-green-100' : 'bg-white'} text-gray-900`}
                    >
                      <span>{ingredient.name}</span>
                      <button
                        type="button"
                        className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                        onClick={() => handleXClick(ingredient.name)}
                      >
                        <svg
                          className="h-2 w-2"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 8 8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            d="M1 1l6 6m0-6L1 7"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section
            className="max-w-2xl mx-auto pt-4 pb-4 px-4 sm:pt-4 sm:pb-8 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              <div className="space-y-1">
                <label
                  htmlFor="add-ingredients"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Ingredients
                </label>
                <div className="flex">
                  <div className="flex-grow">
                    <input
                      type="text"
                      name="add-ingredients"
                      id="add-ingredients"
                      className="block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-lg border border-gray-300 rounded-md"
                      placeholder="Enter an ingredient"
                      aria-describedby="add-ingredients"
                      ref={textInput}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <span className="ml-3">
                    <button
                      type="button"
                      className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={handleClick}
                    >
                      <PlusIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Add</span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Ingredients;
