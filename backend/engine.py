from dotenv import load_dotenv
import os
from openai import OpenAI
import asyncio

load_dotenv()

db_username = os.environ.get("DB_USERNAME")
db_password = os.environ.get("DB_PASSWORD")
api_password = os.environ.get("API_PASSWORD")


async def get_recipe(ingredients, dietary_preferences):
    print("get recipe")
    client = OpenAI()

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {"role": "system", "content": "You are a recipe recommender, creating healthy recipes with given ingredients"},
            {"role": "user", "content": f"I have the following ingredients: {', '.join(ingredients)}. I am looking for a recipe that is {dietary_preferences}. Can you suggest a recipe? Please output it in the following format: Ingredients: 100 g of Macaroni, 50 g of cheese, 20 ml of milk \n Recipe: boil macaroni, add cheese and milk, simmer \n Estimated Time: 20 min \n Total Calories: 500 "}
        ]
    )

    return completion.choices[0].message

def get_creds():
    return "hello"


if __name__ == "__main__":
    asyncio.run(get_creds())
