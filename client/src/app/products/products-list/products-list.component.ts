import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ProductService } from 'app/products/product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

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
    filters: any = {};
    displayedColumns = ['id', 'image', 'name', 'price', 'quantity'];

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
        this.setFilters();
        this.dataSource = new FilesDataSource(this._productService, this.sort, this.filters);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private setFilters(): any {
        this._route.queryParams.subscribe(res => {
            this.filters.name = res['name'] ? res['name'] : '';
        });
    }
}

export class FilesDataSource extends DataSource<any>
{
    public products: Product[] = [];

    /**
     * Constructor
     *
     * @param {ProductService} _productService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _productService: ProductService,
        private _matSort: MatSort,
        private filters,
    )
    {
        super();
        this.filters = filters;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._productService.getProducts(this.filters).pipe(map(data => this.products = data));
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
