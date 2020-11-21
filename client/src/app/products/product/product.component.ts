import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductDetails } from '../models/product-details';
import { ProductService } from '../product.service';
import { ShoppingCartService } from 'app/common/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductDetails;
  productId: number;
  selected = '1';

  /**
   * Constructor
   * 
   * @param _location 
   */
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _location: Location,
    private _shoppingCart: ShoppingCartService,
  ) { }

  
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.loadProduct(this.productId);
  }

  
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  public back(): void {
    this._location.back();
  }

  /**
   * Add the product to the shopping cart
   */
  public addToCart(): void {
    let product = Object.assign({}, this.product) as any;
    product = new Product(product);
    this._shoppingCart.addProduct(product);
  }

  
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * 
   * @param id 
   */
  private loadProduct(id: number): void {
    this._productService.getProduct(id).subscribe(res => {
      this.product = res;
    });
  }
}
