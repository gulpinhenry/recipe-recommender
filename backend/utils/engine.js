const OpenAI = require('openai');

const openai = new OpenAI();

async function test_engine() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

async function get_recipe(ingredients, tastePreferences, allergies, existingRecipes = []) {
    const allergyText = allergies != null && allergies.length > 0 ? allergies.join(', ') : 'none';
    const promptMessage = `I have the following ingredients: ${ingredients.join(', ')}. I am looking for a recipe that is ${tastePreferences}.
     However, I am allergic to ${allergyText}, so the recipe cannot have these ingredients. Can you suggest a recipe? Please output it in the 
     following JSON format: name: String, ingredients: [String], instructions: String, calories: Number, foodCategories: [String].`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are a recipe recommender, creating healthy recipes with given ingredients."},
                {role: "user", content: promptMessage}
            ],
        });

        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return null;
    }
}

module.exports = { test_engine , get_recipe};