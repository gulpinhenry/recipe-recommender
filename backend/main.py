from fastapi import FastAPI
from pymongo import MongoClient

import engine as engine 

app = FastAPI()

# MongoDB setup (replace with your connection string)
client = MongoClient("mongodb://your_mongo_db_uri")
db = client.your_database_name

@app.get("/")
def read_root():
    pw = engine.get_creds()
    return {"Hello": "World", "PW": pw}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    item = db.your_collection_name.find_one({"item_id": item_id})
    return {"item_id": item_id, "item": item}
