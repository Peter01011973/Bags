import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOfProductsComponent } from './list-of-products/list-of-products.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { CardComponent } from './list-of-products/product-details/card.component';


const routes: Routes = [
  {path:"", redirectTo: "/bags", pathMatch: "full"  },
  {path: "bags", component: ListOfProductsComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: 'bags/:id', component: CardComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
