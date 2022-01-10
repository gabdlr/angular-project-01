import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'https://www.simplyrecipes.com/thmb/1lLEOxwEeSdA6pGOpkicwj8UHUM=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-b-1600-3f2cdd1b50654a5b83a2b67a9b94735a.jpg'),
    new Recipe('A test recipe', 'This is simply a test', 'https://www.simplyrecipes.com/thmb/1lLEOxwEeSdA6pGOpkicwj8UHUM=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-b-1600-3f2cdd1b50654a5b83a2b67a9b94735a.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
