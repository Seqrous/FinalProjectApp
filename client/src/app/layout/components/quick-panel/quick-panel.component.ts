import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Return a list of all products in the shopping cart
     */
    private  getProducts(): void {
        this._shoppingCart.cartProducts$.subscribe(products => {
            this.products = products;
        });
    }
}
