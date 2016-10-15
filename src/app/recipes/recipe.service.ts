import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import 'rxjs/Rx';


@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/12_powerhouse_vegetables_slideshow/intro_cream_of_crop.jpg', [
        new Ingredient('French Fries', 5),
        new Ingredient('Samosa', 5)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Samosa', 1)
    ])
  ];

  constructor(private http: Http) { }

  getRecipes(){
    return this.recipes
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipebook-a50e8.firebaseio.com/recipes.json', body, {headers: headers});
  }


  fetchData() {
    return this.http.get('https://recipebook-a50e8.firebaseio.com/recipes.json')
        .map((response: Response) => response.json())
        .subscribe(
            (data: Recipe[]) => {
              this.recipes = data;
              this.recipesChanged.emit(this.recipes);
            }
        );
  }

  showData() {
    return this.http.get('http://dev.readata.net/API/User/Login/m.farhankz@gmail.com/12345/')
        .map((response: Response) => response.json())
        .subscribe(
            (data: Response) => console.log(data)
        );
  }

}
