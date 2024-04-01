import RecipeCard from "./RecipeCard";


const SavedRecipes = ({}) => {
    let savedRecipes = [{
        "picture": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
        "title": "Beef and Mustard Pie",
        "username": "Lauren",
        "desc": "My 1st Post, Have A Good Day Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsum laborum necessitatibus ex doloragnam ea?",
        "id":"123456789"
},
{
    "picture": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    "title": "Beef and Mustard Pie",
    "username": "Lauren",
    "desc": "My 1st Post, Have A Good Day Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsum laborum necessitatibus ex doloragnam ea?",
    "id":"123456789"
},
{
    "picture": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    "title": "Beef and Mustard Pie",
    "username": "Lauren",
    "desc": "My 1st Post, Have A Good Day Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsum laborum necessitatibus ex doloragnam ea?",
    "id":"123456789"
},
{
    "picture": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    "title": "Beef and Mustard Pie",
    "username": "Lauren",
    "desc": "My 1st Post, Have A Good Day Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsum laborum necessitatibus ex doloragnam ea?",
    "id":"123456789"
},
{
    "picture": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    "title": "Beef and Mustard Pie",
    "username": "Lauren",
    "desc": "My 1st Post, Have A Good Day Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsum laborum necessitatibus ex doloragnam ea?",
    "id":"123456789"
}]
  if (!savedRecipes)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          Can not find any recipes, sorry (:
        </p>
      </div>
    );


  return (
    <>
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
            <a href="/" aria-label="Item" className="mr-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-50">
                <svg
                  className="w-12 h-12 text-teal-600"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </a>
            <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
              <span className="inline-block mb-2">Saved Post</span>
              <div className="h-1 ml-auto duration-300 origin-left transform bg-teal-600 scale-x-30 group-hover:scale-x-100" />
            </h2>
          </div>
          <RecipeCard recipes={savedRecipes} quickview={false} />
        </div>
      </div>
    </>
  );
}

export default SavedRecipes