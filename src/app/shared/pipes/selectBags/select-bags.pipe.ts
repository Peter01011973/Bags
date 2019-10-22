import { Pipe, PipeTransform } from '@angular/core';
import { IBagSearchParams } from '../../interfaces/bagSearch-interface';
import { IBag } from '../../interfaces/bag-interface';

@Pipe({
  name: 'selectBags'
})
export class SelectBagsPipe implements PipeTransform {

  transform(bagsArr: IBag[], searchParams: IBagSearchParams): IBag[] {
    console.log('pipe works', searchParams.price.max, searchParams.price.min);

    const arr = bagsArr.filter((item: IBag )=> (
      (item.price <= searchParams.price.max) && 
      (item.price >= searchParams.price.min) && 
      (searchParams.brands.filter(cur => ((item.brand === cur.brand) && cur.isChoosed)).length > 0)));
 
    return arr;
  }

}
