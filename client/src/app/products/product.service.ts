import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsPage } from './models/product';
import { map } from 'rxjs/internal/operators/map';
import { mapToHttpParams } from 'app/common/utils/map-to-http-params';
import { ProductQuery } from './models/product-query';
import { ProductDetails } from './models/product-details';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }

  getProducts(query: ProductQuery): Observable<ProductsPage> {
    const httpParams = mapToHttpParams(query);
    return this.http.get<ProductsPage>(`/products`, { params: httpParams }).pipe(map(data => new ProductsPage(data)));
  }

  getProduct(id: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`/products/${id}`).pipe(map(data => new ProductDetails(data)));
  }
}
