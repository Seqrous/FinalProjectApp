import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { 
    path        : '',
    loadChildren: () => import('./base/base.module').then(m => m.BaseModule)
  },
  {
    path        : 'auth/login',
    component   : LoginComponent,
  },
  {
    path        : 'auth/register',
    component   : RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
