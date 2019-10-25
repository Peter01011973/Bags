import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddProductToCart } from 'src/app/redux/bags.actions';
import { IBag } from 'src/app/shared/interfaces/bag-interface';
import { AppState, getCurrentProduct, getCart } from 'src/app/redux/app.state';
import { IPhoto } from 'src/app/shared/interfaces/photo-interface';
import { ICart } from 'src/app/shared/interfaces/cart-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public currentBag$: Observable<IBag>;
  public currentPhoto$: Observable<IPhoto>;
  public canBookProduct$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    let currentBag: IBag;
    this.currentBag$ = this.store.select<IBag>(getCurrentProduct);
    this.currentPhoto$ = this.currentBag$.pipe(map((data: IBag ) => data.photo1));
    const sub: Subscription = this.currentBag$.subscribe(data => currentBag = data);
    this.canBookProduct$ = of(true);
    this.canBookProduct$ = this.store.select(getCart).pipe(
      map((data: ICart[]) => (currentBag.quantity)?
        ((data)?
          ((data.findIndex((item: ICart) => item.id === currentBag.id)!==-1)?
            ((currentBag.quantity > data[data.findIndex((item: ICart) => item.id === currentBag.id)].count)?(true):(false))
            :(true)
          )
          :(true)
        )
        :(false)
      )
    );

    sub.unsubscribe();
  }

  public changePhoto(photo: IPhoto): void {
    this.currentPhoto$=of(photo);
  }

  public addToCart(bag: IBag): void {
    this.store.dispatch(AddProductToCart(bag));
  }

}
