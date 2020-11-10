import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'base',
    templateUrl: './base.component.html',
    styleUrls  : ['./base.component.scss']
})

/**
 * Base component used for displaying all views
 */
export class BaseComponent
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService, private _fuseConfigService: FuseConfigService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                style: 'vertical-layout-1',
                navbar: {
                    hidden: false,
                    position: 'left',
                    folded: 'true',
                },
                toolbar: {
                    hidden: false,
                    position: 'above'
                },
                footer: {
                    hidden: true,
                },
            }
        };
        
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }
}
