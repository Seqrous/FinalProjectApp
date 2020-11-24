import { Injectable } from '@angular/core';
import { Product } from 'app/products/models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private productsSource = new BehaviorSubject<Product[]>([]);
  cartProducts$ = this.productsSource.asObservable();

  products: Product[] = [];

  constructor() { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add product to the collection
   * 
   * @param product 
   */
  public addProduct(product: Product): void {
    if (!this.productExists(product.id)) {
      this.products.push(product);
    } else {
      this.productUpdate(product);
    }
    this.productsSource.next(this.products);
  }

  /**
   * Remove a product from the collection
   * 
   * @param productId 
   */
  public removeProduct(productId: number): void {
    this.products.some((product, index) => {
      if (product.id === productId) { this.products.splice(index, 1); }
    });
    this.productsSource.next(this.products);
  }

  /**
   * Check if product exists in the collection
   * 
   * @param productId 
   */
  private productExists(productId: number): boolean {
    if (this.products.length === 0) { return false; }
    for (const product of this.products) {
      if (product.id === productId) {
        return true;
      }
    }
  }

  /**
   * Increase the quantity of the given product by chosen amount
   * 
   * @param product 
   */
  private productUpdate(product: Product): void {
    for (const prod of this.products) {
      if (prod.id === product.id) {
        prod.quantity += +product.quantity;
        return;
      }
    }
  }
}
