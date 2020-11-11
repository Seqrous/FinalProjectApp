import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { map } from 'rxjs/internal/operators/map';
import { mapToHttpParams } from 'app/common/utils/map-to-http-params';
import { ProductQuery } from './models/product-query';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }

  getProducts(query: ProductQuery): Observable<Product[]> {
    const httpParams = mapToHttpParams(query);
    return this.http.get<Product[]>(`/products`, { params: httpParams }).pipe(map(data => data as Product[]));
  }
}
