import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ProductQuery } from '../models/product-query';

@Component({
    selector   : 'fuse-products-view',
    templateUrl: './products-view.component.html',
    styleUrls  : ['./products-view.component.scss']
})
export class ProductsViewComponent 
{
    queryParams = new ProductQuery();

    /**
     * Constructor
     * 
     * @param _fuseSidebarService 
     * @param _router 
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
    )
    {
        this._router.navigate(['/products']);
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
