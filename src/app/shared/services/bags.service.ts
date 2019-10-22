import { Injectable, OnDestroy } from '@angular/core';
import { bagsDB } from 'src/app/bagsDB';
import { IBag } from '../interfaces/bag-interface';
import { IBagSearchParams } from '../interfaces/bagSearch-interface';
import { IBrand } from '../interfaces/brand-interface';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { LoadBags } from 'src/app/redux/bags.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class BagsService implements OnDestroy {
  public changeSearchingParams$$ = new Subject<IBagSearchParams>(); 
  // public bagsLength$$ = new Subject<number>(); 
  public currentBag: IBag;
  public listOfBags: IBag[] = bagsDB;
  public currentListOfBags: IBag[] = this.listOfBags;
  public searchingParams: IBagSearchParams;
  public subscriptionGetBags: Subscription;
  
  public constructor(
    private http: HttpClient, 
    private _snackBar: MatSnackBar, 
    private store: Store<AppState>) 
  {
    // this.getBags();
    this.currentBag = this.listOfBags[0];
    this.searchingParams = {
      price: {
        min: this.getMinPriceOfProduct(this.currentListOfBags), 
        max: this.getMaxPriceOfProduct(this.currentListOfBags)}, 
      brands: this.getBrandsList(this.currentListOfBags)
    };
  }

  // public getFavHotels(params: Partial<PageEvent>): void {

  //   const httpParams: HttpParams = new HttpParams({
  //     fromObject: {
  //       _page: String(params.pageIndex),
  //       _limit: String(params.pageSize)
  //     }
  //   });
  //   this.subGetFavHotels = this.http.get<Hotel[]>(`${environment.api}/favoriteHotels`)
  //   .subscribe(hots => this.lengthFan$$.next(hots.length));

  //   this.http.get<Hotel[]>(`${environment.api}/favoriteHotels/`,{params: httpParams})
  //   .pipe(
  //     catchError(() => {
  //       this._snackBar.open('Server is unvalible now');
  //       console.log('error');
  //       return of([]);
  //     })
  //   ).subscribe(FavHotels => {console.log('Fan length: ',FavHotels.length);
  //     this.store.dispatch(LoadFavHotels(FavHotels));
  //   });   
  // }

  public getBags(params: Partial<PageEvent>): void {
    const httpParams: HttpParams = new HttpParams({
      fromObject: {
        _page: String(params.pageIndex),
        _limit: String(params.pageSize)
      }
    });

        // this.subscriptionGetBags = this.http.get<IBag[]>(`${environment.api}/bagsDB`,{params: httpParams})
        this.subscriptionGetBags = this.http.get<IBag[]>(`${environment.api}/bagsDB`)
    .pipe(
      catchError(() => {
        this._snackBar.open('Server is unvalible now');
        console.log('error');
        return of([]);
      }) 
    ).subscribe(bags => this.store.dispatch(LoadBags(bags)));    
  }

  public selectBag(bag: IBag): void {
    this.currentBag = bag;
  }

  public setSearchingParams(): void {
    this.searchingParams = {
      price: {
        min: this.getMinPriceOfProduct(this.listOfBags), 
        max: this.getMaxPriceOfProduct(this.listOfBags)}, 
      brands: this.getBrandsList(this.listOfBags)
    };
    this.currentListOfBags = this.listOfBags;
  }
  
  public getMinPriceOfProduct(a: IBag[]): number {
    let min = Infinity;
    a.map(cur => (cur.price < min) ? min = cur.price : min);
    return min;
  }

  public getMaxPriceOfProduct(a: IBag[]): number {
    let max = -Infinity;
    a.map(cur => (cur.price > max) ? max = cur.price : max);
    return max;
  }

  public getBrandsList(a: IBag[]): IBrand[] {
    let list: IBrand[] = [];
    a.map(cur => (list.filter(item => item.brand === cur.brand).length === 0)?list=[...list,{brand: cur.brand, isChoosed: true}]:list);
    return list;
  }

  // public searchingInBags(searchingP: IBagSearchParams) {
  //   this.currentListOfBags = this.listOfBags.filter(
  //     item => ((item.price <= searchingP.price.max) 
  //     && (item.price >= searchingP.price.min) 
  //     && searchingP.brands.filter(cur => ((item.brand === cur.brand) && cur.isChoosed)).length > 0));
  // }

  public ngOnDestroy() {
    this.subscriptionGetBags.unsubscribe();
  }
}
