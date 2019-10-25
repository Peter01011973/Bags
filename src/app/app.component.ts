import { Component, OnInit } from '@angular/core';
import { BagsService } from './shared/services/bags.service';
import { IBag } from './shared/interfaces/bag-interface';
import { bagsDB } from './bagsDB';
// import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // public listOfBags: IBag[] = bagsDB;
  // public list: Observable<IBag>;

  public constructor(private http: HttpClient) {}

  public ngOnInit() {
    // const blob = new Blob([JSON.stringify(this.listOfBags)], {type : 'application/json'});
    // for (let i=0; i<this.listOfBags.length; i++) {
    //   let item = new Blob([JSON.stringify(this.listOfBags[i])], {type : 'application/json'});
      // this.http
      // .put<IBag[]>('https://test-project-45b30.firebaseio.com/listOfBags.json',blob)
      // .subscribe(response => console.log(response));
    // }
  
    // saveAs(blob, 'bags.json');
      // this.http
      // .get<any>('https://test-project-45b30.firebaseio.com/bags.json')
      // .subscribe(response => console.log(response));
  }

}
