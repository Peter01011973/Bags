import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BagsService } from '../shared/services/bags.service';
import { IPhoto } from '../shared/interfaces/photo-interface';
import { Store, select } from '@ngrx/store';
import { AppState, getCart } from '../redux/app.state';
import { IBag } from '../shared/interfaces/bag-interface';
import { AddProductToCart } from '../redux/bags.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICart } from '../shared/interfaces/cart-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public currentBag = this.bagsService.currentBag;
  public currentPhoto: IPhoto;
  // public cartCount$: Observable<number>;

  constructor(private bagsService: BagsService, private store: Store<AppState>) { }

  ngOnInit() {
    this.currentPhoto = this.currentBag.photo1;
    // this.cartCount$ = this.store.pipe(
    //   select(getCart),
    //   map((data: ICart[]) => 
    //     data[data.findIndex((item: ICart) => item.id === this.currentBag.id)].count
    //   )
    // )
  }

  public changePhoto(photo: IPhoto): void {
    this.currentPhoto = photo;
  }

  public addToCart(bag: IBag): void {
    this.store.dispatch(AddProductToCart(bag));
  }

}
