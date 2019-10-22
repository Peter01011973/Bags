import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getCart } from 'src/app/redux/app.state';
import { Observable } from 'rxjs';
import { IBag } from 'src/app/shared/interfaces/bag-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cart$: Observable<IBag[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.cart$ = this.store.select(getCart);
  }

}
