import { Injectable } from '@angular/core';
import { IBag } from '../interfaces/bag-interface';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class BagsService {

  public constructor(
    private http: HttpClient, 
    private _snackBar: MatSnackBar
  ) {}
  
  public getBags(params: Partial<PageEvent>): Observable<IBag[]> {
    // const httpParams: HttpParams = new HttpParams({
    //   fromObject: {
    //     _page: String(params.pageIndex),
    //     _limit: String(params.pageSize)
    //   }
    // });
    return this.http.get<IBag[]>(`${environment.api}/bagsDB`)
    .pipe(
      catchError(() => {
        this._snackBar.open('Server is unvalible now');
        console.log('error');
        return of([]);
      }) 
    )  
  }

}
