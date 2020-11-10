import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'fuse-card',
    templateUrl  : './card.component.html',
    styleUrls    : ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CardComponent implements OnInit
{
    @Input() title: string;
    card: any = {};

    constructor() {}

    ngOnInit(): void {
        this.card.title = this.title;
        this.card.imageUrl = `assets/images/main/${ this.card.title }.jpg`;
    }
}
