import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];

  selectedBook: Book | null = null;

  constructor() {
    this.books = [
      {
        author: 'Marek Matczak',
        title: 'Angular for nerds'
      },
      {
        author: 'Douglas Crockford',
        title: 'JavaScript. The good parts'
      },
      {
        author: 'John Example',
        title: 'Angular for dummies'
      }
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }
}
