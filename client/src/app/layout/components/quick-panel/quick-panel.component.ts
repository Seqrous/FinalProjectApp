import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ShoppingCartService } from 'app/common/services/shopping-cart.service';
import { Product } from 'app/products/models/product';

@Component({
    selector     : 'quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit
{
    date: Date;
    events: any[];
    notes: any[];
    settings: any;
    products: Product[];
    selected = '1';

    /**
     * Constructor
     * 
     * @param _shoppingCart 
     */
    constructor(
        private _shoppingCart: ShoppingCartService,
        private _fuseSidebarService: FuseSidebarService,
    )
    {
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud : false,
            retro : true
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.getProducts();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar close
     *
     * @param key
     */
    toggleSidebarClose(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Remove a product from the shopping cart
     * 
     * @param productId 
     */
    removeProduct(productId: number): void {
        this._shoppingCart.removeProduct(productId);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Return a list of all products in the shopping cart
     */
    private getProducts(): void {
        this._shoppingCart.cartProducts$.subscribe(products => {
            this.products = products;
        });
    }
}
