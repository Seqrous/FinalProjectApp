import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CardComponent } from './card.component';

@NgModule({
    declarations: [
        CardComponent
    ],
    imports     : [
        MatButtonModule,
    ],
    exports: [
        CardComponent,
    ]
})
export class UICardModule
{
}
