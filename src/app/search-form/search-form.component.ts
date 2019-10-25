import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { IBagSearchParams } from '../shared/interfaces/bagSearch-interface';
import { Store } from '@ngrx/store';
import { AppState, getGetSearchingParams } from '../redux/app.state';
import { ChangeSearchingParams } from '../redux/bags.actions';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  public searchObject$: Observable<IBagSearchParams>;
  public searchObject: IBagSearchParams;
  public initParams: IBagSearchParams;
  public value: number;
  public highValue: number;
  public options: Options;   
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  public ngOnInit(): void {
    const sub: Subscription = this.store.select<IBagSearchParams>(getGetSearchingParams)
      .subscribe((params: IBagSearchParams) => {
        this.options = { floor: params.price.min, ceil: params.price.max };
        this.initParams = params;
      });
    sub.unsubscribe();

    this.searchObject$ = this.store.select<IBagSearchParams>(getGetSearchingParams);
    this.searchObject$
      .subscribe((params: IBagSearchParams) => {
        this.searchObject = params;
        this.value = params.price.min;
        this.highValue = params.price.max;
        const formSearch = this.searchObject.brands.map((cur,index) => new FormControl(this.searchObject.brands[index].isChoosed));
        this.searchForm = this.fb.group({
          listOfBrands: new FormArray(formSearch)
        });
      });
  }

  public submit(): void {
    this.searchObject = {
      price: {
        min: this.value,
        max: this.highValue
      },
      brands: this.searchObject.brands
        .map((curr, index) => ({ 
          brand: curr.brand, 
          isChoosed: this.searchForm.value.listOfBrands[index] 
        })
      )
    };
    this.store.dispatch(ChangeSearchingParams(this.searchObject));
  }

  public resetSearchingParams(): void {
    this.store.dispatch(ChangeSearchingParams(this.initParams));
  }
}
