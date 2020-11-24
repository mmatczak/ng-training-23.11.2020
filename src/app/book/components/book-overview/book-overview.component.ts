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
        id: 0,
        author: 'Marek Matczak',
        title: 'Angular for nerds'
      },
      {
        id: 1,
        author: 'Douglas Crockford',
        title: 'JavaScript. The good parts'
      },
      {
        id: 2,
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

  updateBook(changedBook: Book): void {
    this.books = this.books.map(
      book => book.id === changedBook.id ? changedBook : book);
    this.selectedBook = changedBook;
  }
}
