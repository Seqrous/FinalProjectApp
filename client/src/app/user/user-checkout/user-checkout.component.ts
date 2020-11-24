import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingCartService } from 'app/common/services/shopping-cart.service';
import { Product } from 'app/products/models/product';

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.scss']
})
export class UserCheckoutComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  products: Product[];

  constructor(
    private _formBuilder: FormBuilder,
    private _shoppingCartService: ShoppingCartService,
    ) {}

  ngOnInit(): void {
    this.buildForms();
    this.loadProducts();
  }

  private loadProducts(): void {
    this._shoppingCartService.cartProducts$.subscribe((products: Product[]) => {
      this.products = products;
    }, error => {
      console.log(error);
    });
  }

  private buildForms(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
