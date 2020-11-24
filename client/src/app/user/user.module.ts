import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,

    ReactiveFormsModule,

    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    UserComponent,
    UserCheckoutComponent,
  ]
})
export class UserModule { }
