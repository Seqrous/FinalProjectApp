import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ShoppingCartService } from 'app/common/services/shopping-cart.service';
import { Product } from 'app/products/models/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserCheckoutComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  products: Product[];
  checked = true;

  @ViewChild('stepper') stepper: MatVerticalStepper;

  /**
   * Constructor
   * 
   * @param _formBuilder 
   * @param _shoppingCartService 
   * @param _location
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _shoppingCartService: ShoppingCartService,
    private _location: Location,
    ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.buildForms();
    this.loadProducts();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Verify form step
   * Toggle true if all fields have been filled correctly
   */
  public verifyStep(event: any): void {
    const currentStepIndex = this.stepper.steps.toArray().indexOf(this.stepper.selected);
    if (event.srcElement.innerText === 'Next' && currentStepIndex === 0) {
      this.stepper.selected.completed = this.firstFormGroup.valid;
    }
    else if (event.srcElement.innerText === 'Next' && currentStepIndex === 1) {
      this.stepper.selected.completed = this.secondFormGroup.valid;
    }
  }

  /**
   * Calculate total price of products
   */
  public getTotal(): number {
    return this.products.reduce((a, b) => +a + (+b.price * b.quantity), 0);
  }

  /**
   * Navigate back
   */
  public back(): void {
    this._location.back();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Subscribe to the shopping cart's products
   */
  private loadProducts(): void {
    this._shoppingCartService.cartProducts$.subscribe((products: Product[]) => {
      this.products = products;
    }, error => {
      console.log(error);
    });
  }

  private buildForms(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.pattern('[a-zA-Z]*'), Validators.required]],
      lastName: ['', [Validators.pattern('[a-zA-Z]*'), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      company: [''],
      city: ['', Validators.required],
      zip: ['', [Validators.pattern('^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$'), Validators.required]],
      streetAddress: ['', Validators.required],
      country: ['', [Validators.pattern('[a-zA-Z]*'), Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['', [Validators.pattern(`^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)`), Validators.required]],
      creditCardNumber: ['', [Validators.pattern('[0-9]{16}'), Validators.required]],
      verificationNumber: ['', [Validators.pattern('[0-9]{3}'), Validators.required]],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required]
    });
  }
}
