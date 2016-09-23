import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: '[app-recipe-item]',
  templateUrl: './recipe-item.component.html',
  styles: [
    `.active{background-color: #fbf8f8;}`]
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() recipeId: number;
}

