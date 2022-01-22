import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/internal/operators/map";
import { take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth/auth.service";
import { exhaustMap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService){

        }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-project-51661-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe( );    
    }

    fetchRecipes() {
        return this.authService.user.pipe(
            take(1), 
            exhaustMap( user => {
                return this.http.get<Recipe[]>(
                    'https://ng-project-51661-default-rtdb.firebaseio.com/recipes.json',
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }),
            tap(recipes => this.recipeService.setRecipes(recipes)));
    }
}