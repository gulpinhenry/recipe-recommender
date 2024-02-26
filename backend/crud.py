from pymongo import MongoClient
import models
import bcrypt
client = MongoClient(os.environ.get("MONGO_DB"))
db = client.Recipe_Recommender

def create_user(user_data: dict) -> dict:
    # Hash the password
    hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
    user_data['password'] = hashed_password
    
    # Create a User instance
    user = models.User(**user_data)
    
    users_collection = db['users']
    
    # Convert Pydantic model to dictionary and exclude '_id' if it's automatically generated
    user_dict = user.dict(by_alias=True, exclude_none=True)
    
    try:
        # Attempt to insert the user into the MongoDB collection
        result = users_collection.insert_one(user_dict)
        return {"_id": str(result.inserted_id)}
    except DuplicateKeyError:
        # Handle the duplicate key error
        return {"error": "A user with this username or email already exists."}

def login_user(login_data: dict) -> dict: 
    users_collection = db['users']  # Use your collection name
    
    # Query the database for the user by their unique identifier (e.g., username or email)
    user = users_collection.find_one({"email": login_data['email']})  # Adjust the key as necessary
    
    if user:
        # The user's stored hashed password (ensure it's retrieved as bytes if stored as a binary in MongoDB)
        stored_hash = user['password']
        
        # Verify the provided password against the stored hash
        if bcrypt.checkpw(login_data['password'].encode('utf-8'), stored_hash):
            # Password matches
            return {"status": "success", "message": "Login successful", "_id": str(user['_id'])}
        else:
            # Password does not match
            return {"status": "error", "message": "Invalid username or password"}
    else:
        # User not found
        return {"status": "error", "message": "User not found"}
# ... implement other CRUD operations for User ...

def create_recipe(recipe_data: dict) -> dict:
    # Implement the logic to create a recipe
    pass

def get_recipe_by_id(recipe_id: str) -> dict:
    # Implement the logic to get a recipe by ID
    pass

# ... implement other CRUD operations for Recipe ...

# ... implement CRUD operations for other entities ...
