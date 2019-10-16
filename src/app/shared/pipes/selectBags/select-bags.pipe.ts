import { Pipe, PipeTransform } from '@angular/core';
import { IBagSearchParams } from '../../interfaces/bagSearch-interface';
import { IBag } from '../../interfaces/bag-interface';

@Pipe({
  name: 'selectBags'
})
export class SelectBagsPipe implements PipeTransform {

  transform(bagsArr: IBag[], searchParams: IBagSearchParams): IBag[] {
    console.log('Bags: ', bagsArr);
    console.log('SearchParams: ',searchParams.price.max,searchParams.price.min);
    console.log('SearchParams: ', searchParams.brands[0].brand, searchParams.brands[0].isChoosed, searchParams.brands[1].brand, searchParams.brands[1].isChoosed);
    const arr = bagsArr.filter((item: IBag )=> (
      (item.price <= searchParams.price.max) && 
      (item.price >= searchParams.price.min) && 
      (searchParams.brands.filter(cur => ((item.brand === cur.brand) && cur.isChoosed)).length > 0)));
    console.log(arr.length);
    // 
    return arr;
  }
//   on(SearchBags, (state, action) => ({...state, bagsDB: state.bagsDB.filter(
//     (item: IBag) => ((item.price <= action.payload.price.max) 
//     && (item.price >= action.payload.price.min) 
//     && action.payload.brands.filter(cur => ((item.brand === cur.brand) && cur.isChoosed)).length > 0))
// }))
}
