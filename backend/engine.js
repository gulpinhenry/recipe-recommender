require('dotenv').config();
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// TODO: create crud to get existing recipes
async function getRecipe(ingredients, dietaryPreferences, allergies, existingRecipes = []) {
    const allergyText = allergies.length > 0 ? allergies.join(', ') : 'none';
    const promptMessage = `I have the following ingredients: ${ingredients.join(', ')}. I am looking for a recipe that is ${dietaryPreferences}. However, I am allergic to ${allergyText}, so the recipe cannot have these ingredients. Can you suggest a recipe? Please output it in the following format: Ingredients: 100 g of Macaroni, 50 g of cheese, 20 ml of milk \n Recipe: boil macaroni, add cheese and milk, simmer \n Estimated Time: 20 min \n Total Calories: 500`;

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are a recipe recommender, creating healthy recipes with given ingredients."},
                {role: "user", content: promptMessage}
            ],
        });

        console.log(completion.data.choices[0].message.text);
        return completion.data.choices[0].message.text;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return null;
    }
}

module.exports = { getRecipe };