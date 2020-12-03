import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  addressForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<AddressDialogComponent>,
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
    this.addressForm = this._formBuilder.group({
      name: [''],
      streetAddress: [''],
      country: [''],
      city: [''],
      zip: [''],
    });
  }
}
