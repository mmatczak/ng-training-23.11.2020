import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ba-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  readonly searchForm: FormGroup;

  @Input()
  set query(query: string) {
    if (query != null) {
      this.searchForm.setValue({query});
    }
  }

  @Output()
  queryChange = new EventEmitter<string>();

  constructor() {
    this.searchForm = new FormGroup({
      query: new FormControl()
    });
  }

  notifyOnQueryChange(): void {
    this.queryChange.emit(this.searchForm.get('query')?.value);
  }
}
