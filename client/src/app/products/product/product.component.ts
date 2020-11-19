import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: any = {};

  /**
   * Constructor
   * 
   * @param _location 
   */
  constructor(
    private _location: Location,
  ) { }

  /**
   * On init
   */
  ngOnInit(): void {
  }

  back(): void {
    this._location.back();
  }

}
