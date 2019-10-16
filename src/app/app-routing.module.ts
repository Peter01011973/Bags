import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOfProductsComponent } from './list-of-products/list-of-products.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CardComponent } from './card/card.component';


const routes: Routes = [
  {path:"", redirectTo: "/bags", pathMatch: "full"  },
  {path: "bags", component: ListOfProductsComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: 'bags/:id', component: CardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
