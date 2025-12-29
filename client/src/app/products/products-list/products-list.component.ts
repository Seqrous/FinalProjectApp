import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { fuseAnimations } from '@fuse/animations';

import { ProductService } from 'app/products/product.service';
import { Product, ProductsPage } from '../models/product';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductQuery } from '../models/product-query';
import { MatPaginator } from '@angular/material/paginator';

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

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    /**
     * Constructor
     * 
     * @param _productService 
     * @param _route 
     * @param _router
     */
    constructor(
        private _productService: ProductService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._route.queryParams.subscribe(res => {
            this.searchParams = res as ProductQuery;
        });

        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.refresh();
            }
        });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.loadProducts();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    refresh(): void {
        this.loadProducts();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private loadProducts(): void {
        this._productService.getProducts(Object.assign(
            {},
            this.searchParams,
            this.paginationParams(),
        )).subscribe(res => {
            this.productsPage = res;
            this.dataSource.data = this.productsPage.products;
        });
    }

    private paginationParams(): any {
        return {
            pageSize: this.paginator.pageSize,
            pageNumber: this.paginator.pageIndex ? this.paginator.pageIndex + 1 : 1,
        };
    }
}
