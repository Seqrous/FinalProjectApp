import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path        : '',
        component   : UserComponent,
        children    : [
            {
                path: '',
                component: UserComponent,
            },
            {
                path: 'checkout',
                component: UserCheckoutComponent,
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
