import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductsViewComponent,
        data: { roles: ['operator'] },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
