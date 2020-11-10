import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { UrlInterceptor } from './common/interceptors/url.interceptor';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { BaseModule } from 'app/base/base.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UIModule } from './main/ui/ui.module';
import { MatTabsModule } from '@angular/material/tabs';

import { MainComponent } from './main/main.component';

@NgModule({
    declarations: [			
        AppComponent,
        MainComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatTabsModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        BaseModule,
        UIModule,

        // Auth modules
        LoginModule,
        RegisterModule,
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        [
            { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ],
    ]
})
export class AppModule
{
}
