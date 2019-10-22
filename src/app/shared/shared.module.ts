import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

const shared = [
  MatCardModule,
  MatButtonModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  MatToolbarModule,
  Ng5SliderModule,
  FormsModule,
  BrowserModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatListModule,
  MatTableModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    shared
  ],
  exports: [
    shared
  ]
})
export class SharedModule { }
