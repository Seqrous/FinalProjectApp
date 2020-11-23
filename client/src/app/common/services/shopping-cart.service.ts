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
   * 
   * @param product 
   */
  public addProduct(product: Product): void {
    this.products.push(product);
    this.productsSource.next(this.products);
  }

  public removeProduct(productId: number): void {
    this.products.forEach((element, index) => {
      if (element.id === productId) { this.products.splice(index, 1); }
    });
    this.productsSource.next(this.products);
  }
}
