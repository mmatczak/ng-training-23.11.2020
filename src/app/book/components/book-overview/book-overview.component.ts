import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnDestroy {
  readonly books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  private unsubscribe = new Subject();

  constructor(private readonly books: BookService) {
    this.books$ = books.getAll();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBook(changedBook: Book): void {
    this.books.update(changedBook)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(updatedBook => {
        this.selectedBook = updatedBook;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
