import { Component, OnInit } from '@angular/core';
import { BagsService } from '../shared/services/bags.service';
import { IBag } from '../shared/interfaces/bag-interface';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getBagsArray, getBagsArrayLength } from '../redux/app.state';
import { PageEvent } from '@angular/material/paginator';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {
  public bags$: Observable<IBag[]>;
  public bagsLength$: Observable<number>;
  public pageParams: Partial<PageEvent> = {
    pageIndex: 1,
    pageSize: 3
  }

 
  constructor(
    public bagsService: BagsService, 
    private _router: Router,
    private store: Store<AppState>,
    private activatedRoute:ActivatedRoute
  ) 
  {}

  public ngOnInit() {
    this.bagsService.getBags(this.pageParams);
    this.bags$ = this.store.select<IBag[]>(getBagsArray);
    // Don't use
    this.bagsLength$ = this.store.select<number>(getBagsArrayLength);
    this.bagsLength$.subscribe(x => console.log(x));
    
    this.bagsService.changeSearchingParams$$
    .subscribe((params)=> {
      this.bagsService.searchingParams = params; 
    });
  }

  public selectBag(product: IBag): void {
    this._router.navigate(['bags',product.id]);
    this.bagsService.selectBag(product);
  }

  public changePage(event: PageEvent): void {
    this.pageParams={...event,pageIndex: event.pageIndex+1};
    this._router.navigate(['/bags'], { queryParams: this.pageParams });
    console.log('the pagination has been changed!');
    this.bagsService.getBags(this.pageParams);
  }
  // public fetBags(params?: Partial<PageEvent>): void {
  //   if (params) {}
  //   this.bags$ = this.activatedRoute.queryParamMap.pipe(
  //     switchMap((data: ParamMap) => {
  //       return params ?
  //         this.bagsService.getBags(params) :
  //         this.bagsService.getBags({
  //           pageIndex: Number(data.get('pageIndex')),
  //           pageSize: Number(data.get('pageSize')),
  //         });
  //     })
  //   );
  // }
}



