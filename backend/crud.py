from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import models
import bcrypt
import os

client = MongoClient(os.environ.get("MONGO_DB_TEST"))
db = client.Recipe_Recommender

def create_user(user_data: dict) -> dict:
    if not user_data['username']:
        return {"error:", "No username provided"}
    if len(user_data['password']) < 5:
        return {"error", "Password must be at least 5 characters"}

    hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
    user_data['password'] = hashed_password.decode('utf-8')
    
    user = models.User(**user_data)
    users_collection = db['users']
    
    user_dict = user.dict(by_alias=True, exclude_none=True)
    
    if user_data.get('username'):
        existing_user = users_collection.find_one({"$or": [{"email": user_data['email']}, {"username": user_data['username']}]})
    else:
        existing_user = users_collection.find_one({"email": user_data['email']})

    if existing_user:
        # Determine which field caused the conflict
        if existing_user['email'] == user_data['email']:
            return {"error": "A user with this email already exists."}
        else:
            return {"error": "A user with this username already exists."}

    try:
        user = models.User(**user_data)
        user_dict = user.dict(by_alias=True, exclude_none=True)

        result = users_collection.insert_one(user_dict)
        return {"_id": str(result.inserted_id)}
    except DuplicateKeyError:
        return {"error": "A user with this username or email already exists."}


# USES EMAIL TO LOGIN
def login_user(login_data: dict) -> dict:
    user = db['users'].find_one({"email": login_data['email']})
    
    if user:
        stored_hash = user['password'].encode()
        if bcrypt.checkpw(login_data['password'].encode('utf-8'), stored_hash):
            return {"status": "success", "message": "Login successful", "_id": str(user['_id'])}
        else:
            return {"status": "error", "message": "Invalid username or password"}
    else:
        return {"status": "error", "message": "User not found"}




def create_recipe(recipe_data: dict) -> dict:
    # Implement the logic to create a recipe
    pass

def get_recipe_by_id(recipe_id: str) -> dict:
    # Implement the logic to get a recipe by ID
    pass

# ... implement other CRUD operations for Recipe ...

# ... implement CRUD operations for other entities ...
