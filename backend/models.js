class User {
    constructor({ username = null, email, password, tastePreferences = [], dietAllergy = [] }) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.tastePreferences = tastePreferences;
        this.dietAllergy = dietAllergy;
    }
}

class Rating {
    constructor({ ratingID, user, recipe, score }) {
        this.ratingID = ratingID;
        this.user = user instanceof User ? user : new User(user);
        this.recipe = recipe; // This will be a reference to a Recipe instance
        this.score = score;
    }
}

class Recipe {
    constructor({ recipeID, name, ingredients, instructions, calories = null, foodCategories = null, ratings = [] }) {
        this.recipeID = recipeID;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.calories = calories;
        this.foodCategories = foodCategories;
        this.ratings = ratings.map(rating => new Rating(rating));
    }
}

class Post {
    constructor({ postID, name, ingredients, instructions, calories = null, foodCategories = null, caption, user, ratingCount, ratingSum }) {
        this.postID = postID;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.calories = calories;
        this.foodCategories = foodCategories;
        this.caption = caption;
        this.user = new User(user);
        this.ratingCount = ratingCount;
        this.ratingSum = ratingSum;
    }
}

// Usage example:
const user = new User({ email: 'test@example.com', password: 'password123' });
const recipe = new Recipe({
    recipeID: '1',
    name: 'Chocolate Cake',
    ingredients: ['Flour', 'Sugar', 'Cocoa Powder'],
    instructions: 'Mix ingredients and bake.',
});

console.log(user, recipe);
