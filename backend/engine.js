require('dotenv').config();
const axios = require('axios');

async function getRecipe(ingredients, dietaryPreferences, allergies, existingRecipes = []) {
    console.log("get recipe");
    
    const promptMessage = `I have the following ingredients: ${ingredients.join(', ')}. I am looking for a recipe that is ${dietaryPreferences}. However, I am allergic to ${allergies}, so the recipe cannot have these ingredients. Can you suggest a recipe? Please output it in the following format: Ingredients: 100 g of Macaroni, 50 g of cheese, 20 ml of milk \n Recipe: boil macaroni, add cheese and milk, simmer \n Estimated Time: 20 min \n Total Calories: 500`;

    const data = {
        model: "gpt-3.5-turbo-1106",
        messages: [
            {"role": "system", "content": "You are a recipe recommender, creating healthy recipes with given ingredients"},
            {"role": "user", "content": promptMessage}
        ]
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.choices[0].message;
    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        return null;
    }
}

async function getCreds() {
    console.log("hello");
    // Your getCreds logic here, if needed.
}

(async () => {
    await getCreds();
    // Example usage of getRecipe function
    // You should replace 'your_ingredients', 'your_dietary_preferences', and 'your_allergies' with actual values
    const recipe = await getRecipe(['your_ingredients'], 'your_dietary_preferences', 'your_allergies');
    console.log(recipe);
})();
