import { Injectable } from '@angular/core';
import { Product } from 'app/products/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products: Product[] = [];

constructor() { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * 
   * @param product 
   */
  public addProduct(product: Product): void {
    this.products.push(product);
    console.log(this.products);
  }
}
