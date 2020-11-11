import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsFiltersComponent } from './products-filters/products-filters.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule, FuseSidebarModule } from '@fuse/components';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,

    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,

    FuseSidebarModule,
    FuseSharedModule,
    FuseDemoModule,
  ],
  declarations: [
    ProductsComponent,
    ProductsViewComponent,
    ProductsListComponent,
    ProductsFiltersComponent,
  ]
})
export class ProductsModule { }
