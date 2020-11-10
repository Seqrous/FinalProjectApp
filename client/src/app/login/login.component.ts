import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@fuse/services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit, OnDestroy
{
    loginForm: FormGroup;
    model: any = {};

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthenticationService,
        private router: Router,
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            colorTheme: 'theme-blue-gray-dark',
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy(): void
    {
        this.resetConfig();
    }

    login(): void
    {
        this.model.email = this.email;
        this.model.password = this.password;

        this._authService.login(this.model).subscribe(() => {
            this.router.navigate(['/main']);
        }, err => {
            console.log(err);
        });
    }

    private get email(): string {
        return this.loginForm.value['email'];
    }

    private get password(): string {
        return this.loginForm.value['password'];
    }

    private resetConfig(): void {
        this._fuseConfigService.config = {
            colorTheme: 'theme-default',
        };
    }
}
