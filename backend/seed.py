from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import os

# MongoDB setup
load_dotenv()

# MongoDB setup (replace with your connection string)
client = MongoClient(os.environ.get("MONGO_DB"))
db = client.Recipe_Recommender

# Seed data for users
users = [
    {
        "_id": ObjectId("507f191e810c19729de860ea"),  # Sample Object ID; replace with actual ID or omit to auto-generate
        "username": "user1",
        "email": "user1@example.com",
        "password": "hashed_password1",  # Store hashed passwords only
        # Add other fields from your User model
    },
    {
        "_id": ObjectId("507f191e810c19729de860eb"),
        "username": "user2",
        "email": "user2@example.com",
        "password": "hashed_password2",
        # Add other fields from your User model
    },
    # Add as many users as you need
]
def create_mdb_col():
    col = ["users", "recipes", "posts", "comments", "ratings"]
    for i in col:
        try:
            db.create_collection(i)
        except Exception as e:
            continue
# Function to seed data
def seed_data():
    # Clear existing data to prevent duplicates
    create_mdb_col()
    db.users.delete_many({})  # Be careful with this line; it deletes all documents in the users collection
    # Insert new data
    db.users.insert_many(users)
    print("HERE", db.list_collection_names())
    print(f"Seeded {len(users)} users.")

if __name__ == "__main__":
    seed_data()
