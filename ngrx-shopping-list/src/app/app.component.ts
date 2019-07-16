import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import {
  AddItemAction,
  DeleteItemAction,
  LoadShoppingAction,
} from './store/actions/shopping.actions';
import { AppState } from './store/models/app-state.model';
import { ShoppingItem } from './store/models/shopping-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  shoppingItems$: Observable<Array<ShoppingItem>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  newShoppingItem: ShoppingItem = { id: '', name: '' };

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.shoppingItems$ = this.store.select((store) => store.shopping.list);
    this.loading$ = this.store.select((store) => store.shopping.loading);
    this.error$ = this.store.select((store) => store.shopping.error);

    this.store.dispatch(new LoadShoppingAction());
  }

  addItem(): void {
    this.newShoppingItem.id = uuid();

    this.store.dispatch(new AddItemAction(this.newShoppingItem));

    this.newShoppingItem = { id: '', name: '' };
  }

  deleteItem(id: string): void {
    this.store.dispatch(new DeleteItemAction(id));
  }
}
