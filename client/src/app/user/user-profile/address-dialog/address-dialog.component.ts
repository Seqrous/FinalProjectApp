import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<AddressDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }

}
