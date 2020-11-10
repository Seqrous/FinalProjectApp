import { NgModule } from '@angular/core';
import { BaseRoutingModule } from './base-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { BaseComponent } from './base.component';
import { ProductsModule } from 'app/products/products.module';

@NgModule({
    declarations: [
        BaseComponent
    ],
    imports     : [
        BaseRoutingModule,

        TranslateModule,

        FuseSharedModule,
        
        ProductsModule,
    ],
    exports     : [
        BaseComponent
    ]
})

export class BaseModule
{
}
