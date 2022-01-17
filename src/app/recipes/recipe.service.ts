import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe', 
        'This is simply a test', 
        'https://www.simplyrecipes.com/thmb/1lLEOxwEeSdA6pGOpkicwj8UHUM=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-b-1600-3f2cdd1b50654a5b83a2b67a9b94735a.jpg',
        [
            new Ingredient('Meet', 1),
            new Ingredient('Buns', 2)
        ]),
        new Recipe('A test recipe 2',
         'This is simply a test 2', 
         'https://www.simplyrecipes.com/thmb/1lLEOxwEeSdA6pGOpkicwj8UHUM=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-b-1600-3f2cdd1b50654a5b83a2b67a9b94735a.jpg',
         [
             new Ingredient('Meet', 1),
             new Ingredient('French Fries', 20)
         ])
    ];

    constructor(private slService: ShoppingListService) {
    
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, updatedRecipe: Recipe) {
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}