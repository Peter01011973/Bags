import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { BagsService } from '../shared/services/bags.service';
import { IBagSearchParams } from '../shared/interfaces/bagSearch-interface';
import { Store } from '@ngrx/store';
import { AppState, getBagsArray } from '../redux/app.state';
import { IBag } from '../shared/interfaces/bag-interface';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  public searchObject: IBagSearchParams;
  public value: number;
  public highValue: number;
  public options: Options;   
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder, private bagsService: BagsService, private store: Store<AppState>) {}

  public submit() {
    this.searchObject = {
      price: {
        min: this.value,
        max: this.highValue
      },
      brands: this.searchObject.brands
        .map((curr, index) => { return { 
          brand: curr.brand, 
          isChoosed: this.searchForm.value.listOfBrands[index] 
        }}
      )
    };
    this.bagsService.changeSearchingParams$$.next(this.searchObject);

    // this.bagsService.searchingInBags(this.searchObject);
  }

  public ngOnInit() {
        this.initSearch();
    }
   
    public initSearch() {
      this.value = this.bagsService.searchingParams.price.min;
      this.highValue= this.bagsService.searchingParams.price.max;
      this.options= {floor: this.bagsService.searchingParams.price.min, ceil: this.bagsService.searchingParams.price.max};
      this.searchObject = this.bagsService.searchingParams;

      const formSearch = this.searchObject.brands.map(control => new FormControl(true));  
      this.searchForm = this.fb.group({
        listOfBrands: new FormArray(formSearch)
      });      
    }

    public resetSearchingParams() {
      this.bagsService.setSearchingParams(); 
      this.initSearch();
    }
  }
  
