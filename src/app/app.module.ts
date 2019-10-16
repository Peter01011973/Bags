import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CardComponent } from './card/card.component';
import { GrnPipe } from './shared/pipes/grn/grn.pipe';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ListOfProductsComponent } from './list-of-products/list-of-products.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectBagsPipe } from './shared/pipes/selectBags/select-bags.pipe';
import { HeaderComponent } from './pages/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { bagsReducer } from './redux/bags.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GrnPipe,
    SelectBagsPipe,
    ListOfProductsComponent,
    SearchFormComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxImageZoomModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({bags: bagsReducer}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
