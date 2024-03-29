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
  manufacturerList: any;
  
  /**
   * Constructor
   * 
   * @param formBuilder 
   */
  constructor(private formBuilder: FormBuilder) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.loadData();
    this.createForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private createForm(): void {
    this.form = this.formBuilder.group({
      minPrice      : [],
      maxPrice      : [],
      conditions    : this.formBuilder.array([]),
      manufacturers : this.formBuilder.array([]),
    });
  }

  private loadData(): void {
    this.conditionsList = [
      { name: 'New',  value: 'new' },
      { name: 'Used', value: 'used' },
    ];

    this.manufacturerList = [
      { name: 'Manufacturer 1', value: 'manufacturer1'},
      { name: 'Manufacturer 2', value: 'manufacturer2'},
      { name: 'Manufacturer 3', value: 'manufacturer3'},
    ];
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Search
   */
  search(): void {
    this.onSearch.emit(this.form.value);
  }

  /**
   * Add/remove value of a filter when checked/unchecked
   */
  onCheckboxChange(e: any): void {
    const filterType = e.source.id as string;
    const filterName = filterType.split('-', 1)[0]; // conditions/manufacturers
    const filterValue = filterType.split('-', 2)[1]; // new/used

    const currentFilter: FormArray = this.form.get(filterName) as FormArray;
  
    if (e.checked) {
      currentFilter.push(new FormControl(filterValue));
    } else {
      let i = 0;
      currentFilter.controls.forEach((item: FormControl) => {
        if (item.value == filterValue) {
          currentFilter.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
