import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Ingredient} from "../shared/ingredient";

@Component({
  selector: '[app-shopping-list]',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[] = [];
  selectedItem: Ingredient = null;
  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
    this.items = this.sls.getItems();
  }

  onSelectItem(item: Ingredient) {
    this.selectedItem = item;
  }

  onCleared() {
    this.selectedItem = null;
  }

}
