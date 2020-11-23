import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductDetails } from '../models/product-details';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

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

  back(): void {
    this._location.back();
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
      this.product = res;;
    });
  }
}
