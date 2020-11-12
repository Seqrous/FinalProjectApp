import { Component } from '@angular/core';

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
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    refresh(params: ProductQuery): void {
        console.log(params);
        this.queryParams = params;
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
