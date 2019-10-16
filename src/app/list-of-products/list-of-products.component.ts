import { Component, OnInit } from '@angular/core';
import { BagsService } from '../shared/services/bags.service';
import { IBag } from '../shared/interfaces/bag-interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getBagsArray } from '../redux/app.state';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {
  public bags$: Observable<IBag[]>;

 
  constructor(
    public bagsService: BagsService, 
    private _router: Router,
    private store: Store<AppState>
  ) 
  {
    this.bagsService.getBags();
    this.bags$ = this.store.select<IBag[]>(getBagsArray);

  }

  public ngOnInit() {}

  public selectBag(product: IBag): void {
    this._router.navigate(['bags',product.id]);
    this.bagsService.selectBag(product);
  }
}

