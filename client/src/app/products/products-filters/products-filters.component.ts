import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'fuse-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.scss']
})
export class ProductsFiltersComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      minPrice: [],
      maxPrice: [],
      condition: new FormArray([
        new FormControl(true),
        new FormControl(false)
      ]),
      manufacturer: new FormArray([
        new FormControl(true),
        new FormControl(false)
      ]),
    });
  }

  search(): void {
    this.onSearch.emit(this.form.value);
  }

}
