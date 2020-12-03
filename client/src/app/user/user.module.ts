import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AddressDialogComponent } from './user-profile/address-dialog/address-dialog.component';
import { UserRoutingModule } from './user-routing.module';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,

    ReactiveFormsModule,

    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  declarations: [
    UserComponent,
    UserCheckoutComponent,
    UserProfileComponent,
    AddressDialogComponent,
  ]
})
export class UserModule { }
