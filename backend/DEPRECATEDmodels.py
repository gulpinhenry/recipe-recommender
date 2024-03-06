from typing import List, Optional
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

class User(BaseModel):
    username: Optional[str] = None
    email: EmailStr
    password: str
    tastePreferences: Optional[List[str]] = []
    dietAllergy: Optional[List[str]] = []


class Rating(BaseModel):
    ratingID: str
    user: User
    recipe: 'Recipe'  
    score: int


class Recipe(BaseModel):
    recipeID: str
    name: str
    ingredients: List[str] 
    instructions: str
    calories: Optional[int] = None
    foodCategories: Optional[str] = None 
    ratings: List[Rating]


class Post(BaseModel):
    postID: str
    name: str
    ingredients: List[str] 
    instructions: str
    calories: Optional[int] = None
    foodCategories: Optional[str] = None
    caption: str
    user: User
    ratingCount: int
    ratingSum: int


# Declare models that reference each other below all model definitions to resolve forward references.
User.update_forward_refs()
Rating.update_forward_refs()
Recipe.update_forward_refs()
Post.update_forward_refs()
