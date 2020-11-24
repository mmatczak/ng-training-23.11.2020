import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnDestroy {
  books: Book[];

  selectedBook: Book | null = null;

  private readonly subscription: Subscription;

  constructor(books: BookService) {
    this.subscription = books.getAll()
      .subscribe(allBooks => this.books = allBooks);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
