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

  conditionsList: any;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadData();
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      minPrice: [],
      maxPrice: [],
      conditions: this.formBuilder.array([])
    });
  }

  search(): void {
    this.onSearch.emit(this.form.value);
  }

  loadData(): void {
    this.conditionsList = [
      { name: 'New',  value: 'new' },
      { name: 'Used', value: 'used' },
    ];
  }

  onCheckboxChange(e): void {
    const conditions: FormArray = this.form.get('conditions') as FormArray;
  
    if (e.checked) {
      conditions.push(new FormControl(e.source.id));
    } else {
      let i = 0;
      conditions.controls.forEach((item: FormControl) => {
        if (item.value == e.source.id) {
          conditions.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
