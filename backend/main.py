from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()

# MongoDB setup (replace with your connection string)
client = MongoClient("mongodb://your_mongo_db_uri")
db = client.your_database_name

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    item = db.your_collection_name.find_one({"item_id": item_id})
    return {"item_id": item_id, "item": item}
