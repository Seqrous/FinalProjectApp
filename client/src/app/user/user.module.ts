import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
  declarations: [
    UserComponent,
    UserCheckoutComponent,
  ]
})
export class UserModule { }
