import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ProductQuery } from '../models/product-query';

@Component({
    selector   : 'fuse-products-view',
    templateUrl: './products-view.component.html',
    styleUrls  : ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit
{
    queryParams = new ProductQuery();

    /**
     * Constructor
     * 
     * @param _fuseSidebarService 
     * @param _route 
     * @param _router
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._route.queryParams.subscribe(res => {
            this.queryParams = res as ProductQuery;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Append filter parameters to url and redirect
     * 
     * @param params 
     */
    refresh(params: ProductQuery): void {
        params.name = this.queryParams.name;
        this.queryParams = params;
        this._router.navigate(['/products'], { queryParams: this.queryParams });
    }

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
