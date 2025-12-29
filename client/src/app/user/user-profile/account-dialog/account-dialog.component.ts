import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {

  accountForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<AccountDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _formBuilder: FormBuilder
    ) { }

  ngOnInit(): void { 
    this.buildForm();
  }

  /**
   * Create the form
   *
   * @returns {FormGroup}
   */
  buildForm(): void
  {
    this.accountForm = this._formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }
}
