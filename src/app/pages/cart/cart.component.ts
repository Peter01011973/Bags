import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, getCart } from 'src/app/redux/app.state';
import { Observable } from 'rxjs';
import { IBag } from 'src/app/shared/interfaces/bag-interface';
import { ICart } from 'src/app/shared/interfaces/cart-interface';
import { map } from 'rxjs/operators';
import { DeleteProductFromCart, AddProductToCart } from 'src/app/redux/bags.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['item', 'icon','price','count','cost','increase','decrease'];
  public cart$: Observable<ICart[]>;
  public totalCost$: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.cart$ = this.store.select(getCart);
    this.totalCost$ = this.store.pipe(
      select(getCart),
      map((data: ICart[]) => 
        data.reduce((acc: number, item: ICart) => acc+item.price*item.count,0)
      )
    )
  }

  public delete(data: ICart): void {
    this.store.dispatch(DeleteProductFromCart(data));
  }

  public increase(data: ICart): void {
    this.store.dispatch(AddProductToCart(data));  
  }

}
