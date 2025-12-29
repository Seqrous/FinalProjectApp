import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base.component';
import { MainComponent } from '../main/main.component';

const routes: Routes = [
    {
        path        : '',
        component   : BaseComponent,
        children    : [
            {
                path       : '',
                pathMatch  : 'full',
                redirectTo : 'main'
            },
            {
                path: 'main',
                component: MainComponent,
            },
            {
                path: 'products',
                loadChildren: () => import('app/products/products.module').then(m => m.ProductsModule)
            },
            {
                path: 'user',
                loadChildren: () => import('app/user/user.module').then(m => m.UserModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
