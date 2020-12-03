import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
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

  public openDialog(type: string): void {

    if (type === 'address-dialog') {
      const dialogRef = this.addressDialog.open(AddressDialogComponent, {
        width: '360px',
        height: '500px',
        panelClass: 'address-dialog-class'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    else if (type === 'account-dialog') {
      const dialogRef = this.addressDialog.open(AccountDialogComponent, {
        width: '360px',
        height: '435px',
        panelClass: 'account-dialog-class'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
}
