import { Component, OnInit } from '@angular/core';
import { BagsService } from '../shared/services/bags.service';
import { IBag } from '../shared/interfaces/bag-interface';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getBagsArray, getGetSearchingParams } from '../redux/app.state';
import { PageEvent } from '@angular/material/paginator';
import { ChangeCurrentProduct, LoadBags } from '../redux/bags.actions';
import { IBagSearchParams } from '../shared/interfaces/bagSearch-interface';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {
  public bags$: Observable<IBag[]>;
  public searchingParams$: Observable<IBagSearchParams>;
  public pageParams: Partial<PageEvent> = {
    pageIndex: 1,
    pageSize: 5
  }

 
  constructor(
    public bagsService: BagsService, 
    private _router: Router,
    private store: Store<AppState>,
    private activatedRoute:ActivatedRoute
  ) 
  {}

  public ngOnInit() {
    this.bagsService.getBags(this.pageParams).subscribe((bags) =>{console.log('Getting');
     this.store.dispatch(LoadBags(bags))});
    this.bags$ = this.store.select<IBag[]>(getBagsArray);
    this.searchingParams$ = this.store.select<IBagSearchParams>(getGetSearchingParams);
  }

  public selectBag(product: IBag): void {
    this._router.navigate(['bags',product.id]);
    this.store.dispatch(ChangeCurrentProduct(product));
  }

  public changePage(event: PageEvent): void {
    this.pageParams={...event,pageIndex: event.pageIndex+1};
    this._router.navigate(['/bags'], { queryParams: this.pageParams });
    // this.bagsService.getBags(this.pageParams);
  }
}



