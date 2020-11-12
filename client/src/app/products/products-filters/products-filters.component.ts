import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'fuse-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.scss']
})
export class ProductsFiltersComponent implements OnInit {

  formFilters: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.formFilters = this.formBuilder.group({
      minPrice: [],
      maxPrice: [],
    });
  }

}
