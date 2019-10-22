import { Pipe, PipeTransform } from '@angular/core';
import { IBag } from '../interfaces/bag-interface';
import { PageEvent } from '@angular/material/paginator';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(arr: IBag[], pageParams:Partial<PageEvent>): IBag[] {
    return arr.slice((pageParams.pageIndex-1)*pageParams.pageSize,pageParams.pageIndex*pageParams.pageSize);
  }

}
