from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
# from dotenv import load_dotenv, find_dotenv
import engine
import os
import json

from models import User, Rating, Recipe, Post
import crud
import seed


app = FastAPI()
# load_dotenv()

# MongoDB setup (replace with your connection string)
# client = MongoClient(os.environ.get("MONGO_DB"))
# db = client.Recipe_Recommender


@app.get("/")
def read_root():
    pw = engine.get_creds()
    return {"Hello": "World", "PW": pw}

@app.get("/seed")
def seed_data():
    seed.seed_data()
    return {"Success": "yay"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    item = db.your_collection_name.find_one({"item_id": item_id})
    return {"item_id": item_id, "item": item}

@app.get("/recipe") # TODO: update endpoint include ingredients and dietary preferences parameter, parsing stuff too, also make sure UI has a loading animation
async def get_recipe_endpoint():
    ingredients = ["tomatoes", "basil", "garlic"]
    dietary_preferences = "vegan"
    recipe = await engine.get_recipe(ingredients, dietary_preferences)
    return recipe

@app.post("/signup")
def signup(user_details: User):
    signup_details = user_details.dict()
    print(signup_details)
    try:
        return crud.create_user(signup_details)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
def login(login_request: User):
    try:
        login_details = login_request.dict()
        print(login_details)
        # Call the login_user function with the login details
        response = crud.login_user(login_details)
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
# todo: figure out how to parse data, validate model, push to DB
