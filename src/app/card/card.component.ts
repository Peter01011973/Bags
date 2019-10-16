import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BagsService } from '../shared/services/bags.service';
import { IPhoto } from '../shared/interfaces/photo-interface';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public currentBag = this.bagsService.currentBag;
  public currentPhoto: IPhoto;

  constructor(private bagsService: BagsService, private store: Store<AppState>) { }

  ngOnInit() {
    this.currentPhoto = this.currentBag.photo1;
  }

  public changePhoto(photo: IPhoto): void {
    this.currentPhoto = photo;
  }

}
