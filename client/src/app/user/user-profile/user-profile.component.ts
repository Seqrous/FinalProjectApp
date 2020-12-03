import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public addressDialog: MatDialog,
  ) { }

  ngOnInit(): void {}

  public openDialog(): void {
    const dialogRef = this.addressDialog.open(AddressDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
