import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Book} from '../../../model/book';

@Component({
  selector: 'ba-book-results',
  templateUrl: './book-results.component.html',
  styleUrls: ['./book-results.component.scss']
})
export class BookResultsComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('of')
  books: Book[];

  @Output()
  bookClick = new EventEmitter<Book>();

  notifyOnBookClick(book: Book): void {
    this.bookClick.emit(book);
  }
}
