import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grn'
})
export class GrnPipe implements PipeTransform {

  transform(value: number): string {
    const strNew: string[]  = value.toString().split(".");
    let digitsAfterPoint: string = '';
    if(strNew.length > 1) {digitsAfterPoint = '.'+strNew[1]};
    return strNew[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")+digitsAfterPoint+" GRN";
  }

}
