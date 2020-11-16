import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ProductService } from 'app/products/product.service';
import { Product } from '../models/product';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ProductQuery } from '../models/product-query';

@Component({
    selector     : 'fuse-products-list',
    templateUrl  : './products-list.component.html',
    styleUrls    : ['./products-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductsListComponent implements OnInit
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'image', 'name', 'price', 'quantity'];
    queryParams: any;

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

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
            this.queryParams = res as ProductQuery;
        });

        this.loadProducts();

        this._router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd)
          ).subscribe(() => {
            this.loadProducts();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private loadProducts(): void {
        this.dataSource = new FilesDataSource(this._productService, this.sort, this.queryParams);
    }
}

export class FilesDataSource extends DataSource<any>
{
    public products: Product[] = [];

    /**
     * Constructor
     * 
     * @param _productService 
     * @param _matSort 
     * @param queryParams 
     */
    constructor(
        private _productService: ProductService,
        private _matSort: MatSort,
        private queryParams: ProductQuery,
    )
    {
        super();
        this.queryParams = queryParams;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._productService.getProducts(Object.assign(
            {},
            this.queryParams,
        )).pipe(map(data => this.products = data));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'quantity':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
