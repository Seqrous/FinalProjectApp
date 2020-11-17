import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { fuseAnimations } from '@fuse/animations';

import { ProductService } from 'app/products/product.service';
import { Product, ProductsPage } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductQuery } from '../models/product-query';

@Component({
    selector     : 'fuse-products-list',
    templateUrl  : './products-list.component.html',
    styleUrls    : ['./products-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductsListComponent implements OnInit, AfterViewInit
{
    dataSource = new MatTableDataSource<Product>();
    displayedColumns = ['id', 'image', 'name', 'price', 'quantity'];
    
    productsPage: ProductsPage = new ProductsPage();
    searchParams: ProductQuery = new ProductQuery();

    /**
     * Constructor
     * 
     * @param _productService 
     * @param _route 
     */
    constructor(
        private _productService: ProductService,
        private _route: ActivatedRoute,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._route.params.subscribe(res => {
            this.searchParams = res as ProductQuery;
        });
    }

    ngAfterViewInit(): void {
        this.loadProducts();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private loadProducts(): void {
        this._productService.getProducts(Object.assign(
            {},
            this.searchParams,
        )).subscribe(res => {
            this.productsPage = res;
            this.dataSource.data = this.productsPage.products;
        });
    }
}
